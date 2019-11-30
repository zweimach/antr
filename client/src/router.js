import { createRouter } from "router5";
import browserPlugin from "router5-plugin-browser";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "HelpCenter",
    path: "/helpcenter",
  },
  {
    name: "WaitList",
    path: "/waitlist",
  },
];

const routerOptions = {
  allowNotFound: true,
  autoCleanUp: true,
  defaultRoute: undefined,
  defaultParams: undefined,
  queryParams: {
    arrayFormat: "brackets",
    nullFormat: "default",
    booleanFormat: "empty-true",
  },
  queryParamsMode: "default",
  trailingSlashMode: "never",
  strictTrailingSlash: false,
  caseSensitive: false,
};

const router = createRouter(routes, routerOptions);

router.usePlugin(
  browserPlugin({
    useHash: false,
  })
);

router.start();

export default router;
