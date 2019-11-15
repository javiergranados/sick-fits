const Query = {
  dogs(parent, args, ctx, info) {
    console.log(info);

    global.dogs = global.dogs || [];
    return global.dogs;
  },
};

module.exports = Query;
