import { createRouter } from "router5";
import { Route, Options } from "router5/types";
import browserPlugin from "router5-plugin-browser";

const routes: Route[] = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Dashboard",
    path: "/dashboard"
  },
  {
    name: "HelpCenter",
    path: "/helpcenter"
  },
  {
    name: "WaitList",
    path: "/waitlist"
  }
];

const routerOptions: Partial<Options> = {
  allowNotFound: true,
  autoCleanUp: true,
  defaultRoute: undefined,
  defaultParams: undefined,
  queryParams: {
    arrayFormat: "brackets",
    nullFormat: "default",
    booleanFormat: "empty-true"
  },
  queryParamsMode: "default",
  trailingSlashMode: "never",
  strictTrailingSlash: false,
  caseSensitive: false
};

const router = createRouter(routes, routerOptions);

router.usePlugin(
  browserPlugin({
    useHash: true
  })
);

router.start();

export default router;
