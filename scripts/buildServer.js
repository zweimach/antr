import webpack from "webpack";

import createConfig from "./createServerConfig";

const compiler = webpack(createConfig(false));

compiler.run(() => {});
