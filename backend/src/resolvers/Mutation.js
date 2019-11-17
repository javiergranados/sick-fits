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
};

module.exports = Mutations;
