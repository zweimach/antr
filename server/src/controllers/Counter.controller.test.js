import express from "express";
import bodyParser from "body-parser";
import supertest from "supertest";
import { createConnection } from "typeorm";

import CounterController from "./Counter.controller";
import { CounterProvider, UserProvider } from "../providers";
import { Counter, User } from "../models";
import { ApiStatus, withResponse } from "../utils";

describe("CounterController", () => {
  let counterRepository;
  let userRepository;
  let server;
  const route = "/counter";

  beforeAll(async () => {
    const connection = await createConnection({
      type: "sqljs",
      entities: [Counter, User],
      logging: false,
      dropSchema: true,
      synchronize: true,
    });

    counterRepository = connection.getRepository(Counter);
    userRepository = connection.getRepository(User);

    const counterProvider = new CounterProvider(counterRepository);
    const userProvider = new UserProvider(userRepository);

    CounterController.setProvider(counterProvider, userProvider);

    server = express();
    const router = express.Router();
    router.get(route, CounterController.getAllCounters);
    router.get(`${route}/:id`, CounterController.getCounter);
    router.post(route, CounterController.addCounter);
    router.put(route, CounterController.updateCounter);
    router.delete(`${route}/:id`, CounterController.deleteCounter);
    server.use(bodyParser.json());
    server.use(router);
  });

  beforeEach(async () => {
    await counterRepository.save([
      new Counter({ id: 0, name: "Counter" }),
      new Counter({ id: 1, name: "Counter" }),
    ]);
    await userRepository.save(
      new User({
        id: 12,
        fullname: "John Doe",
        username: "jdo",
        password: "1234",
      })
    );
  });

  describe("getAllCounters", () => {
    it("returns all resources", async () => {
      const response = await supertest(server).get(route);
      const expected = withResponse(ApiStatus.Ok, [
        new Counter({ id: 0, name: "Counter" }),
        new Counter({ id: 1, name: "Counter" }),
      ]);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns empty list of resource", async () => {
      await counterRepository.clear();

      const response = await supertest(server).get(route);
      const expected = withResponse(ApiStatus.Ok, []);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });
  });

  describe("getCounter", () => {
    it("returns one resource", async () => {
      const response = await supertest(server).get(`${route}/0`);
      const expected = withResponse(
        ApiStatus.Ok,
        new Counter({ id: 0, name: "Counter" })
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

  describe("addCounter", () => {
    it("returns added resource", async () => {
      const newCounter = new Counter({ id: 2, name: "Counter" });
      const response = await supertest(server)
        .post(route)
        .send(newCounter);
      const expected = withResponse(ApiStatus.Ok, newCounter);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns error message", async () => {
      const newCounter = { id: "one", name: "Counter" };
      const response = await supertest(server)
        .post(route)
        .send(newCounter);
      const expected = withResponse(ApiStatus.BadRequest);

      expect(response.status).toBe(ApiStatus.BadRequest);
      expect(response.body).toEqual(expected);
    });
  });

  describe("updateCounter", () => {
    it("returns updated resource", async () => {
      const updatedCounter = new Counter({ id: 0, name: "Updated" });
      const response = await supertest(server)
        .put(route)
        .send(updatedCounter);
      const expected = withResponse(ApiStatus.Ok, updatedCounter);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns resource with updated relations", async () => {
      const updatedCounter = { id: 0, name: "Updated", user: 12 };
      const response = await supertest(server)
        .put(route)
        .send(updatedCounter);
      const expected = withResponse(ApiStatus.Ok, {
        ...updatedCounter,
        user: {
          id: 12,
          fullname: "John Doe",
          username: "jdo",
          password: "1234",
        },
      });

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns error message", async () => {
      let updatedCounter = { id: "one", name: "Updated" };
      let response = await supertest(server)
        .put(route)
        .send(updatedCounter);
      let expected = withResponse(ApiStatus.BadRequest);

      expect(response.status).toBe(ApiStatus.BadRequest);
      expect(response.body).toEqual(expected);

      updatedCounter = { id: 1000, name: "Updated" };
      response = await supertest(server)
        .put(route)
        .send(updatedCounter);
      expected = withResponse(ApiStatus.NotFound);

      expect(response.status).toBe(ApiStatus.NotFound);
      expect(response.body).toEqual(expected);
    });
  });

  describe("deleteCounter", () => {
    it("returns deleted resource", async () => {
      const deletedCounter = { id: 0, name: "Counter" };
      const response = await supertest(server).delete(`${route}/0`);
      const expected = withResponse(ApiStatus.Ok, deletedCounter);

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
