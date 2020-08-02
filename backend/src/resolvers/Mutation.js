const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../../mail');
const { hasPermissions } = require('../utils');

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }

    const item = await ctx.db.mutation.createItem({
      data: {
        // this is how to create a relationship between the Item and the User
        user: {
          connect: {
            id: ctx.request.userId,
          },
        },
        ...args,
      },
      info,
    });
    return item;
  },

  updateItem(parent, args, ctx, info) {
    // take a copy of the data and remove the id
    const data = { ...args };
    delete data.id;

    return ctx.db.mutation.updateItem(
      {
        data,
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{id title user {id}}`);

    // 2. Check if they own that item, or have the permissions
    const ownsItems = item.user.id === ctx.request.userId;
    const hasDeletePermissions = ctx.request.user.permissions.some(p => ['ADMIN', 'ITEMDELETE'.includes(p)]);
    if (!ownsItems || !hasDeletePermissions) {
      throw new Error("You don't have permission to do that!");
    }

    // 3. Delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    // create the data with the hash as password
    const data = { ...args };
    data.email = args.email.toLowerCase();
    data.password = await bcrypt.hash(args.password, 10);
    data.permissions = {
      set: ['USER'],
    };

    // create the user in the database
    const user = await ctx.db.mutation.createUser({
      data,
      info,
    });

    // create the JTW token for the user
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });

    // finally we return the user to the browser
    return user;
  },

  async signin(parent, args, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.db.query.user(
      {
        where: { email: args.email.toLowerCase() },
      },
      info
    );
    if (!user) {
      throw new Error(`No such user found for the email ${args.emai}`);
    }

    // 2. check if their password is correct
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }

    // 3. Generate the JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });

    // 5. Return the user
    return user;
  },

  signout(parent, args, ctx) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  },

  async requestReset(parent, args, ctx) {
    // 1. Check if this is a real user
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No such user found for the email ${args.emai}`);
    }

    // 2. Set a reset token and expirty on that user
    const randomBytesPromiseified = promisify(randomBytes);
    const resetToken = (await randomBytesPromiseified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry },
    });

    // 3. Email them that reset token
    await transport.sendMail({
      from: process.env.MAIL_FROM,
      to: user.email,
      subject: 'Your Password Reset Token',
      html: makeANiceEmail(
        `Your Password Reset Token is here!
        \n\n
        <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`
      ),
    });

    // 4. Return the message
    return { message: 'Thanks!' };
  },

  async resetPassword(parent, args, ctx) {
    // 1. Check if the passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error("Your passwords don't match!");
    }

    // 2. Check if its a legit reset token

    // 3. Check if its expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000,
      },
    });
    if (!user) {
      throw new Error('This token is either invalid or expired!');
    }

    // 4. Hash their new password
    const password = await bcrypt.hash(args.password, 10);

    // 5. Save the new passowrd to the user and remove old resetToken fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    // 6. Generate JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);

    // 7. Set the JWT cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });

    // 8. Return the new user
    return updatedUser;
  },

  async updatePermissions(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged!');
    }

    // 2. Query the current user
    const currentUser = await ctx.db.query.user({ where: { id: ctx.request.userId } });

    // 3. Check if they have permissions to do it
    hasPermissions(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    // 4. Update the permissions
    await ctx.db.mutation.updateUser(
      {
        where: { id: args.userId },
        data: {
          permissions: {
            set: args.permissions,
          },
        },
      },
      info
    );

    return currentUser;
  },
};

module.exports = Mutations;
