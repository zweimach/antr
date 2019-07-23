import { IResolvers } from "graphql-tools";

import userAccountResolver from "./userAccountResolver";

const resolvers: IResolvers[] = [userAccountResolver];

export default resolvers;
