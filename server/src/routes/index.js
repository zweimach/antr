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
  CounterProvider,
  UserProvider,
  QueueProvider,
  ServiceProvider,
} from "../providers";
import { Counter, User, Service, Queue } from "../models";

export { counterRoutes, queueRoutes, serviceRoutes, userRoutes };

export function setupRoutes() {
  const counterRepository = getRepository(Counter);
  const queueRepository = getRepository(Queue);
  const serviceRepository = getRepository(Service);
  const userRepository = getRepository(User);

  const counterProvider = new CounterProvider(counterRepository);
  const queueProvider = new QueueProvider(queueRepository);
  const serviceProvider = new ServiceProvider(serviceRepository);
  const userProvider = new UserProvider(userRepository);

  CounterController.setProvider(counterProvider, userProvider);
  QueueController.setProvider(queueProvider, serviceProvider);
  ServiceController.setProvider(serviceProvider, queueProvider);
  UserController.setProvider(userProvider);
}
