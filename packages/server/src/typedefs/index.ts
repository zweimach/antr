import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

const typedefs: DocumentNode = gql`
  type UserAccount {
    id: ID!
    username: String!
    password: String!
    fullname: String!
  }

  type Query {
    getUserAccount(username: String!): UserAccount
    getAllUserAccounts: [UserAccount]
  }

  type Mutation {
    addUserAccount(
      id: ID!
      username: String!
      password: String!
      fullname: String!
    ): [UserAccount]
  }
`;

export default typedefs;
