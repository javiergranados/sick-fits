const Mutations = {
  createDog(parent, args, ctx, info) {
    console.log(info);

    global.dogs = global.dogs || [];
    global.dogs.push(args);
    return args;
  },
};

module.exports = Mutations;
