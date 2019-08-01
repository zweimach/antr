import { User } from "../models";

const userResolver = {
  Mutation: {
    async addUser(_: null, args: User) {
      const newUser = User.create(args);
      await newUser.save();
      return newUser;
    }
  },
  Query: {
    async getUser(_: null, { id }: User) {
      return await User.findOne({ id });
    },
    async getAllUsers() {
      return await User.find();
    }
  }
};

export default userResolver;
