import webpack from "webpack";

import createConfig from "./config/createConfig";

const compiler = webpack(createConfig(false));

compiler.run(() => {});
