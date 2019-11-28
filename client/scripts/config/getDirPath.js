import { resolve, join } from "path";

export const rootDir = resolve(__dirname, "..", "..", "..");

export const packagesDir = join(rootDir, "client");

export const scriptsDir = join(packagesDir, "scripts");

export const buildDir = join(rootDir, "build");
