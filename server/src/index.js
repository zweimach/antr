import "reflect-metadata";
import dotenv from "dotenv";

import Server from "./Server";

dotenv.config();

const port = parseInt(process.env.SERVER_PORT);

const server = new Server();

server.start(port);
