import { resolve, join } from "path";

export const rootDirectory = resolve(__dirname, "..");

export const clientDirectory = join(rootDirectory, "client");

export const serverDirectory = join(rootDirectory, "server");

export const buildDirectory = join(rootDirectory, "build");
