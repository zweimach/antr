import { createConnection } from "typeorm";

import { Counter, User } from "../models";
import CounterResolver from "./Counter.resolver";

describe("CounterResolver", () => {
  let connection;
  let counterRepository;
  let userRepository;
  let counterResolver;

  beforeAll(async () => {
    connection = await createConnection({
      type: "sqljs",
      entities: [Counter, User],
      logging: false,
      dropSchema: true,
      synchronize: true,
    });

    counterRepository = connection.getRepository(Counter);
    userRepository = connection.getRepository(User);

    counterResolver = new CounterResolver(counterRepository);
  });

  beforeEach(async () => {
    const user = new User({
      fullname: "Dan Abramov",
      username: "gaearon",
      password: "reactjs",
    });
    await userRepository.save(user);
    const counter = new Counter({ id: 1234, name: "Counter 1234", user });
    await counterRepository.save(counter);
  });

  afterEach(async () => {
    await counterRepository.clear();
    await userRepository.clear();
  });

  it("inserts entities", async () => {
    const newCounter = await counterResolver.addCounter({
      id: 0,
      name: "Counter 0",
    });
    const expected = new Counter({ id: 0, name: "Counter 0" });

    expect(newCounter).toStrictEqual(expected);
  });

  it("inserts entities with relations", async () => {
    const newUser = new User({
      id: 0,
      fullname: "John Doe",
      username: "jdo",
      password: "1234",
    });
    await userRepository.save(newUser);

    const newCounter = await counterResolver.addCounter({
      id: 0,
      name: "Counter 0",
      user: newUser,
    });
    const expected = new Counter({ id: 0, name: "Counter 0", user: newUser });

    expect(newCounter).toStrictEqual(expected);
  });

  it("retrieves entities", async () => {
    const targetCounter = await counterResolver.getCounter(1234);
    const expected = new Counter({ id: 1234, name: "Counter 1234" });

    expect(targetCounter).not.toBeUndefined();
    expect(targetCounter).toStrictEqual(expected);
  });

  it("updates entities", async () => {
    const targetCounter = await counterResolver.updateCounter(1234, {
      name: "Counter 2",
    });
    const expected = new Counter({ id: 1234, name: "Counter 2" });

    expect(targetCounter).toStrictEqual(expected);
  });

  it("updates entities with relations", async () => {
    const newUser = new User({
      fullname: "John Doe",
      username: "jdo",
      password: "1234",
    });
    await userRepository.save(newUser);

    const targetCounter = await counterResolver.updateCounter(1234, {
      name: "Counter 2",
      user: newUser,
    });
    const expected = new Counter({
      id: 1234,
      name: "Counter 2",
      user: newUser,
    });

    expect(targetCounter).toStrictEqual(expected);
  });

  it("deletes entities", async () => {
    const targetCounter = await counterResolver.deleteCounter(1234);
    const expected = new Counter({ id: 1234, name: "Counter 1234" });
    const deletedCounter = await counterRepository.findOne(1234);

    expect(targetCounter).toStrictEqual(expected);
    expect(deletedCounter).toBeUndefined();
  });

  afterAll(async () => {
    await connection.close();
  });
});
