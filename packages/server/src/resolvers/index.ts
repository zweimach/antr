import { IResolvers } from "graphql-tools";

import counterResolver from "./counterResolver";
import queueResolver from "./queueResolver";
import serviceResolver from "./serviceResolver";
import userResolver from "./userResolver";

const resolvers: IResolvers[] = [
  counterResolver,
  queueResolver,
  serviceResolver,
  userResolver
];

export default resolvers;
