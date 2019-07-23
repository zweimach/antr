import "reflect-metadata";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import Server from "./Server";

dotenv.config();

const port = parseInt(process.env.SERVER_PORT as string);
const middleware = [
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false })
];

const server = new Server(...middleware);

server.start(port);
