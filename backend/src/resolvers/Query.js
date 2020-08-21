const { forwardTo } = require('prisma-binding');
const { hasPermissions } = require('../utils');

const Query = {
  // async items(parent, args, ctx) {
  //   const items = ctx.db.query.items();
  //   return items;
  // },
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),

  me(parent, args, ctx, info) {
    // check if there is a current user id
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },

  users(parent, args, ctx, info) {
    // Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }

    // Check if the user has the permissions to query all the users
    hasPermissions(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    // If they dos, query all the users
    return ctx.db.query.users({}, info);
  },

  async order(parent, args, ctx, info) {
    // 1. Make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }

    // 2. Query the current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id },
      },
      info
    );

    // 3. Check if they have the permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');
    if (!ownsOrder || !hasPermissionToSeeOrder) {
      throw new Error('You cant see this buddd');
    }

    // 4. Return the order
    return order;
  },
};

module.exports = Query;
