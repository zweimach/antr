import { IResolvers } from "graphql-tools";

import userResolver from "./userResolver";

const resolvers: IResolvers[] = [userResolver];

export default resolvers;
