import { getRepository } from "typeorm";

import counterRoutes from "./counter.routes";
import queueRoutes from "./queue.routes";
import serviceRoutes from "./service.routes";
import userRoutes from "./user.routes";

import {
  CounterController,
  QueueController,
  ServiceController,
  UserController,
} from "../controllers";
import {
  CounterResolver,
  UserResolver,
  QueueResolver,
  ServiceResolver,
} from "../resolvers";
import { Counter, User, Service, Queue } from "../models";

export { counterRoutes, queueRoutes, serviceRoutes, userRoutes };

export function setupRoutes() {
  const counterRepository = getRepository(Counter);
  const queueRepository = getRepository(Queue);
  const serviceRepository = getRepository(Service);
  const userRepository = getRepository(User);

  const counterResolver = new CounterResolver(counterRepository);
  const queueResolver = new QueueResolver(queueRepository);
  const serviceResolver = new ServiceResolver(serviceRepository);
  const userResolver = new UserResolver(userRepository);

  CounterController.setResolver(counterResolver, userResolver);
  QueueController.setResolver(queueResolver, serviceResolver);
  ServiceController.setResolver(serviceResolver, queueResolver);
  UserController.setResolver(userResolver);
}
