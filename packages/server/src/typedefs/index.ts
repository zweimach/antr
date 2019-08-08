import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

const typedefs: DocumentNode = gql`
  scalar Date

  type Counter {
    id: ID!
    name: String!
    user: User!
  }

  type Queue {
    id: ID!
    number: Int!
    isDone: Boolean!
    timestamp: Date!
    service: Service!
  }

  type Service {
    id: ID!
    type: String!
    name: String!
    queues: [Queue]!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    fullname: String!
    counter: Counter!
  }

  type Query {
    getCounter(name: String!): Counter
    getAllCounters: [Counter]

    getQueue(number: Int!): Queue
    getAllQueues: [Queue]

    getService(type: String!): Service
    getAllServices: [Service]

    getUser(username: String!): User
    getAllUsers: [User]
  }

  type Mutation {
    addCounter(id: ID!, name: String!): Counter
    updateCounter(id: ID!, name: String): Counter
    deleteCounter(id: ID!): Counter

    addQueue(id: ID!, number: Int!, isDone: Boolean!, timestamp: Date!): Queue
    updateQueue(id: ID!, number: Int, isDone: Boolean, timestamp: Date): Queue
    deleteQueue(id: ID!): Queue

    addService(id: ID!, type: String!, name: String!): Service
    updateService(id: ID!, type: String, name: String): Service
    deleteService(id: ID!): Service

    addUser(
      id: ID!
      username: String!
      password: String!
      fullname: String!
    ): User
    updateUser(
      id: ID!
      username: String
      password: String
      fullname: String
    ): User
    deleteUser(id: ID!): User
  }
`;

export default typedefs;
