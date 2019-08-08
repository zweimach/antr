import { GraphQLScalarType, Kind } from "graphql";

import { Queue, Service } from "../models";

const queueResolver = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value: string | number | Date) {
      return new Date(value);
    },
    serialize(value: Date) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    }
  }),
  Queue: {
    async service({ id }: Queue) {
      return await Service.findOne({
        where: {
          queues: {
            id
          }
        }
      });
    }
  },
  Mutation: {
    async addQueue(_: null, args: Queue) {
      const newQueue = Queue.create(args);
      await newQueue.save();
      return newQueue;
    },
    async updateQueue(
      _: null,
      { id, number, isDone, timestamp, service }: Queue
    ) {
      Queue.update(id, {
        number,
        isDone,
        timestamp,
        service
      });
      return await Queue.findOne({ id });
    },
    async deleteQueue(_: null, { id }: Queue) {
      const deletedQueue = await Queue.findOne({ id });
      if (deletedQueue) {
        Queue.delete(deletedQueue);
      }
      return deletedQueue;
    }
  },
  Query: {
    async getQueue(_: null, { number }: Queue) {
      return await Queue.findOne({ number });
    },
    async getAllQueues() {
      return await Queue.find();
    }
  }
};

export default queueResolver;
