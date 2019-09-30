import express from "express";
import bodyParser from "body-parser";
import supertest from "supertest";
import { createConnection, Repository } from "typeorm";

import UserController from "./User.controller";
import { UserResolver } from "../resolvers";
import { Counter, User } from "../models";
import { ApiStatus, withResponse } from "../utils";

describe("UserController", () => {
  let counterRepository: Repository<Counter>;
  let userRepository: Repository<User>;
  let server: express.Application;
  const route = "/user";

  beforeAll(async () => {
    const connection = await createConnection({
      type: "sqljs",
      entities: [Counter, User],
      logging: false,
      dropSchema: true,
      synchronize: true
    });

    counterRepository = connection.getRepository(Counter);
    userRepository = connection.getRepository(User);

    const userResolver = new UserResolver(userRepository);

    UserController.setResolver(userResolver);

    server = express();
    const router = express.Router();
    router.get(route, UserController.getAllUsers);
    router.get(`${route}/:id`, UserController.getUser);
    router.post(route, UserController.addUser);
    router.put(route, UserController.updateUser);
    router.delete(`${route}/:id`, UserController.deleteUser);
    server.use(bodyParser.json());
    server.use(router);
  });

  beforeEach(async () => {
    await userRepository.save([
      new User({
        id: 0,
        fullname: "John Doe",
        username: "john",
        password: "johndoe"
      }),
      new User({
        id: 1,
        fullname: "Jane Doe",
        username: "jane",
        password: "janedoe"
      })
    ]);
    await counterRepository.save(new Counter({ id: 0, name: "Counter" }));
  });

  describe("getAllUsers", () => {
    it("returns all resources", async () => {
      const response = await supertest(server).get(route);
      const expected = withResponse(ApiStatus.Ok, [
        new User({
          id: 0,
          fullname: "John Doe",
          username: "john",
          password: "johndoe"
        }),
        new User({
          id: 1,
          fullname: "Jane Doe",
          username: "jane",
          password: "janedoe"
        })
      ]);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns empty list of resource", async () => {
      await userRepository.clear();

      const response = await supertest(server).get(route);
      const expected = withResponse(ApiStatus.Ok, []);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });
  });

  describe("getUser", () => {
    it("returns one resource", async () => {
      const response = await supertest(server).get(`${route}/1`);
      const expected = withResponse(
        ApiStatus.Ok,
        new User({
          id: 1,
          fullname: "Jane Doe",
          username: "jane",
          password: "janedoe"
        })
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

  describe("addUser", () => {
    it("returns added resource", async () => {
      const newUser = new User({
        id: 2,
        fullname: "Bill",
        username: "bill",
        password: "bill"
      });
      const response = await supertest(server)
        .post(route)
        .send(newUser);
      const expected = withResponse(ApiStatus.Ok, newUser);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns error message", async () => {
      const newUser = {
        id: "two",
        fullname: "Bill",
        username: "bill",
        password: "bill"
      };
      const response = await supertest(server)
        .post(route)
        .send(newUser);
      const expected = withResponse(ApiStatus.BadRequest);

      expect(response.status).toBe(ApiStatus.BadRequest);
      expect(response.body).toEqual(expected);
    });
  });

  describe("updateUser", () => {
    it("returns updated resource", async () => {
      const updatedUser = new User({
        id: 0,
        fullname: "Updated",
        username: "johndoe",
        password: "1234"
      });
      const response = await supertest(server)
        .put(route)
        .send(updatedUser);
      const expected = withResponse(ApiStatus.Ok, updatedUser);

      expect(response.status).toBe(ApiStatus.Ok);
      expect(response.body).toEqual(expected);
    });

    it("returns error message", async () => {
      let updatedUser: object = {
        id: "one",
        fullname: "Updated",
        password: "",
        username: ""
      };
      let response = await supertest(server)
        .put(route)
        .send(updatedUser);
      let expected = withResponse(ApiStatus.BadRequest);

      expect(response.status).toBe(ApiStatus.BadRequest);
      expect(response.body).toEqual(expected);

      updatedUser = { ...updatedUser, id: 1000 };
      response = await supertest(server)
        .put(route)
        .send(updatedUser);
      expected = withResponse(ApiStatus.NotFound);

      expect(response.status).toBe(ApiStatus.NotFound);
      expect(response.body).toEqual(expected);
    });
  });

  describe("deleteUser", () => {
    it("returns deleted resource", async () => {
      const deletedUser = {
        id: 0,
        fullname: "John Doe",
        username: "john",
        password: "johndoe"
      };
      const response = await supertest(server).delete(`${route}/0`);
      const expected = withResponse(ApiStatus.Ok, deletedUser);

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
