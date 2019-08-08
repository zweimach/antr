import { User, Counter } from "../models";

const userResolver = {
  User: {
    async counter({ id }: User) {
      return await Counter.findOne({
        where: {
          user: {
            id
          }
        }
      });
    }
  },
  Mutation: {
    async addUser(_: null, args: User) {
      const newUser = User.create(args);
      await newUser.save();
      return newUser;
    },
    async updateUser(_: null, { id, username, password, fullname }: User) {
      User.update(id, {
        username,
        password,
        fullname
      });
      return await User.findOne({ id });
    },
    async deleteUser(_: null, { id }: User) {
      const deletedUser = await User.findOne({ id });
      if (deletedUser) {
        User.delete(deletedUser);
      }
      return deletedUser;
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
