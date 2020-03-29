const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const item = await ctx.db.mutation.createItem({
      data: {
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
    // 1 - find the item
    // const item = await ctx.db.query.item({ where }, info);
    // 2 - Check if they own that item, or have the permissions
    // TODO
    // 3 - Delete it
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
};

module.exports = Mutations;
