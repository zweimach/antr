import express from "express";
import bodyParser from "body-parser";
import supertest from "supertest";
import { createConnection } from "typeorm";

import QueueController from "./Queue.controller";
import { QueueProvider, ServiceProvider } from "../providers";
import { Queue, Service } from "../models";
import { ApiStatus, withResponse } from "../utils";

describe("QueueController", () => {
  let queueRepository;
  let serviceRepository;
  let server;
  const route = "/queue";

  beforeAll(async () => {
    const connection = await createConnection({
      type: "sqljs",
      entities: [Queue, Service],
      logging: false,
      dropSchema: true,
      synchronize: true,
    });

    queueRepository = connection.getRepository(Queue);
    serviceRepository = connection.getRepository(Service);

    const queueProvider = new QueueProvider(queueRepository);
    const serviceProvider = new ServiceProvider(serviceRepository);

    QueueController.setProvider(queueProvider, serviceProvider);

    server = express();
    const router = express.Router();
    router.get(route, QueueController.getAllQueues);
    router.get(`${route}/:id`, QueueController.getQueue);
    router.post(route, QueueController.addQueue);
    router.put(route, QueueController.updateQueue);
    router.delete(`${route}/:id`, QueueController.deleteQueue);
    server.use(bodyParser.json());
    server.use(router);
  });

  beforeEach(async () => {
    await queueRepository.save([
      new Queue({ id: 0, isDone: false, number: 1 }),
      new Queue({ id: 1, isDone: false, number: 2 }),
    ]);
    await serviceRepository.save(
      new Service({ id: 7, name: "Cleaning", type: "A" })
    );
  });

  afterEach(async () => {
    await queueRepository.clear();
    await serviceRepository.clear();
  });

  describe("getAllQueues", () => {
    it("returns all resources", async () => {
      const response = await supertest(server).get(route);
      const expected = withResponse(ApiStatus.Ok, [
        new Queue({ id: 0, isDone: false, number: 1 }),
        new Queue({ id: 1, isDone: false, number: 2 }),
      ]);

      response.body.data.forEach(queue => delete queue.timestamp);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns empty list of resource", async () => {
      await queueRepository.clear();

      const response = await supertest(server).get(route);
      const expected = withResponse(ApiStatus.Ok, []);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });
  });

  describe("getQueue", () => {
    it("returns one resource", async () => {
      const response = await supertest(server).get(`${route}/0`);
      const expected = withResponse(
        ApiStatus.Ok,
        new Queue({ id: 0, isDone: false, number: 1 })
      );

      delete response.body.data.timestamp;

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns error message", async () => {
      const response = await supertest(server).get(`${route}/100`);
      const expected = withResponse(ApiStatus.NotFound);

      expect(response.status).toBe(ApiStatus.NotFound);
      expect(response.body).toEqual(expected);
    });
  });

  describe("addQueue", () => {
    it("returns added resource", async () => {
      const newQueue = new Queue({ id: 2, isDone: false, number: 3 });
      const response = await supertest(server)
        .post(route)
        .send(newQueue);
      const expected = withResponse(ApiStatus.Ok, newQueue);

      delete response.body.data.timestamp;

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns error message", async () => {
      const newQueue = { id: "three", isDone: false, number: 3 };
      const response = await supertest(server)
        .post(route)
        .send(newQueue);
      const expected = withResponse(ApiStatus.BadRequest);

      expect(response.status).toBe(ApiStatus.BadRequest);
      expect(response.body).toEqual(expected);
    });
  });

  describe("updateQueue", () => {
    it("returns updated resource", async () => {
      const updatedQueue = new Queue({ id: 0, isDone: true, number: 3 });
      const response = await supertest(server)
        .put(route)
        .send(updatedQueue);
      const expected = withResponse(ApiStatus.Ok, updatedQueue);

      delete response.body.data.timestamp;

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns resource with updated relations", async () => {
      const updatedQueue = { id: 0, isDone: true, number: 3, service: 7 };
      const response = await supertest(server)
        .put(route)
        .send(updatedQueue);
      const expected = withResponse(ApiStatus.Ok, {
        ...updatedQueue,
        service: await serviceRepository.findOneOrFail(7),
      });

      delete response.body.data.timestamp;

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns error message", async () => {
      let updatedQueue = {
        id: "ten",
        isDone: true,
        number: 3,
        service: 7,
      };
      let response = await supertest(server)
        .put(route)
        .send(updatedQueue);
      let expected = withResponse(ApiStatus.BadRequest);

      expect(response.status).toBe(ApiStatus.BadRequest);
      expect(response.body).toEqual(expected);

      updatedQueue = { id: 10, isDone: true, number: 3, service: 7 };
      response = await supertest(server)
        .put(route)
        .send(updatedQueue);
      expected = withResponse(ApiStatus.NotFound);

      expect(response.status).toBe(ApiStatus.NotFound);
      expect(response.body).toEqual(expected);
    });
  });

  describe("deleteQueue", () => {
    it("returns deleted resource", async () => {
      const deletedQueue = new Queue({ id: 0, isDone: false, number: 1 });
      const response = await supertest(server).delete(`${route}/0`);
      const expected = withResponse(ApiStatus.Ok, deletedQueue);

      delete response.body.data.timestamp;

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns error message", async () => {
      let response = await supertest(server).delete(`${route}/one`);
      let expected = withResponse(ApiStatus.BadRequest);

      expect(response.status).toBe(ApiStatus.BadRequest);
      expect(response.body).toEqual(expected);

      response = await supertest(server).delete(`${route}/5`);
      expected = withResponse(ApiStatus.NotFound);

      expect(response.status).toBe(ApiStatus.NotFound);
      expect(response.body).toEqual(expected);
    });
  });
});
