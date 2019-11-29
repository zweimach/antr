import { resolve, join } from "path";

export const rootDir = resolve(__dirname, "..");

export const clientDir = join(rootDir, "client");

export const serverDir = join(rootDir, "server");

export const buildDir = join(rootDir, "build");
