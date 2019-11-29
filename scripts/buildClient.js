import webpack from "webpack";

import createConfig from "./createClientConfig";

const compiler = webpack(createConfig(false));

compiler.run(() => {});
