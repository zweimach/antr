import { Counter, User } from "../models";

const counterResolver = {
  Counter: {
    async user({ id }: Counter) {
      return await User.findOne({
        where: {
          counter: {
            id
          }
        }
      });
    }
  },
  Mutation: {
    async addCounter(_: null, args: Counter) {
      const newCounter = Counter.create(args);
      await newCounter.save();
      return newCounter;
    },
    async updateCounter(_: null, { id, name, user }: Counter) {
      Counter.update(id, {
        name,
        user
      });
      return await Counter.findOne({ id });
    },
    async deleteCounter(_: null, { id }: Counter) {
      const deletedCounter = await Counter.findOne({ id });
      if (deletedCounter) {
        Counter.delete(deletedCounter);
      }
      return deletedCounter;
    }
  },
  Query: {
    async getCounter(_: null, { name }: Counter) {
      return await Counter.findOne({ name });
    },
    async getAllCounters() {
      return await Counter.find();
    }
  }
};

export default counterResolver;
