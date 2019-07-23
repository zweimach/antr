import { UserAccount } from "../models";

const userAccountResolver = {
  Mutation: {
    async addUserAccount(_: null, args: UserAccount) {
      const newUserAccount = UserAccount.create(args);
      await newUserAccount.save();
      return newUserAccount;
    }
  },
  Query: {
    async getUserAccount(_: null, { id }: UserAccount) {
      return await UserAccount.findOne({ id });
    },
    async getAllUserAccounts() {
      return await UserAccount.find();
    }
  }
};

export default userAccountResolver;
