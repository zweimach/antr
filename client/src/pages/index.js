import loadable from "@loadable/component";

const Dashboard = loadable(() => import("./Dashboard"));
const HelpCenter = loadable(() => import("./HelpCenter"));
const NotFound = loadable(() => import("./NotFound"));
const WaitList = loadable(() => import("./WaitList"));

export { Dashboard, HelpCenter, NotFound, WaitList };
