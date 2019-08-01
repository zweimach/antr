import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

const typedefs: DocumentNode = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    fullname: String!
  }

  type Query {
    getUser(username: String!): User
    getAllUsers: [User]
  }

  type Mutation {
    addUser(
      id: ID!
      username: String!
      password: String!
      fullname: String!
    ): [User]
  }
`;

export default typedefs;
