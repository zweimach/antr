import express from "express";
import bodyParser from "body-parser";
import supertest from "supertest";
import { createConnection } from "typeorm";

import ServiceController from "./Service.controller";
import { ServiceResolver, QueueResolver } from "../resolvers";
import { Service, Queue } from "../models";
import { ApiStatus, withResponse } from "../utils";

describe("ServiceController", () => {
  let serviceRepository;
  let queueRepository;
  let server;
  const route = "/service";

  beforeAll(async () => {
    const connection = await createConnection({
      type: "sqljs",
      entities: [Service, Queue],
      logging: false,
      dropSchema: true,
      synchronize: true
    });

    serviceRepository = connection.getRepository(Service);
    queueRepository = connection.getRepository(Queue);

    const serviceResolver = new ServiceResolver(serviceRepository);
    const queueResolver = new QueueResolver(queueRepository);

    ServiceController.setResolver(serviceResolver, queueResolver);

    server = express();
    const router = express.Router();
    router.get(route, ServiceController.getAllServices);
    router.get(`${route}/:id`, ServiceController.getService);
    router.post(route, ServiceController.addService);
    router.put(route, ServiceController.updateService);
    router.delete(`${route}/:id`, ServiceController.deleteService);
    server.use(bodyParser.json());
    server.use(router);
  });

  beforeEach(async () => {
    await serviceRepository.save([
      new Service({ id: 0, name: "Service", type: "A" }),
      new Service({ id: 1, name: "Service", type: "B" })
    ]);
    await queueRepository.save(new Queue({ id: 0, isDone: false, number: 1 }));
  });

  afterEach(async () => {
    await queueRepository.clear();
    await serviceRepository.clear();
  });

  describe("getAllServices", () => {
    it("returns all resources", async () => {
      const response = await supertest(server).get(route);
      const expected = withResponse(ApiStatus.Ok, [
        new Service({ id: 0, name: "Service", type: "A" }),
        new Service({ id: 1, name: "Service", type: "B" })
      ]);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns empty list of resource", async () => {
      await serviceRepository.clear();

      const response = await supertest(server).get(route);
      const expected = withResponse(ApiStatus.Ok, []);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });
  });

  describe("getService", () => {
    it("returns one resource", async () => {
      const response = await supertest(server).get(`${route}/0`);
      const expected = withResponse(
        ApiStatus.Ok,
        new Service({ id: 0, name: "Service", type: "A" })
      );

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

  describe("addService", () => {
    it("returns added resource", async () => {
      const newService = new Service({
        id: 2,
        name: "Service",
        type: "F",
        queues: []
      });
      const response = await supertest(server)
        .post(route)
        .send(newService);
      const expected = withResponse(ApiStatus.Ok, newService);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns error message", async () => {
      const newService = { id: "one", name: "Service" };
      const response = await supertest(server)
        .post(route)
        .send(newService);
      const expected = withResponse(ApiStatus.BadRequest);

      expect(response.status).toBe(ApiStatus.BadRequest);
      expect(response.body).toEqual(expected);
    });
  });

  describe("updateService", () => {
    it("returns updated resource", async () => {
      const updatedService = new Service({
        id: 0,
        name: "Updated",
        type: "Z",
        queues: []
      });
      const response = await supertest(server)
        .put(route)
        .send(updatedService);
      const expected = withResponse(ApiStatus.Ok, updatedService);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns resource with updated relations", async () => {
      const updatedService = { id: 0, name: "Serv", type: "Z", queues: [0] };
      const response = await supertest(server)
        .put(route)
        .send(updatedService);
      const expected = withResponse(ApiStatus.Ok, {
        ...updatedService,
        queues: [{ id: 0, isDone: false, number: 1 }]
      });

      response.body.data.queues.forEach(queue => delete queue.timestamp);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns error message", async () => {
      let updatedService = { id: "one", name: "Updated" };
      let response = await supertest(server)
        .put(route)
        .send(updatedService);
      let expected = withResponse(ApiStatus.BadRequest);

      expect(response.status).toBe(ApiStatus.BadRequest);
      expect(response.body).toEqual(expected);

      updatedService = { id: 100, name: "Updated", type: "M" };
      response = await supertest(server)
        .put(route)
        .send(updatedService);
      expected = withResponse(ApiStatus.NotFound);

      expect(response.status).toBe(ApiStatus.NotFound);
      expect(response.body).toEqual(expected);
    });
  });

  describe("deleteService", () => {
    it("returns deleted resource", async () => {
      const deletedService = { id: 0, name: "Service", type: "A" };
      const response = await supertest(server).delete(`${route}/0`);
      const expected = withResponse(ApiStatus.Ok, deletedService);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns error message", async () => {
      let response = await supertest(server).delete(`${route}/one`);
      let expected = withResponse(ApiStatus.BadRequest);

      expect(response.status).toBe(ApiStatus.BadRequest);
      expect(response.body).toEqual(expected);

      response = await supertest(server).delete(`${route}/255`);
      expected = withResponse(ApiStatus.NotFound);

      expect(response.status).toBe(ApiStatus.NotFound);
      expect(response.body).toEqual(expected);
    });
  });
});
