import { createConnection } from "typeorm";

import { Queue, Service } from "../models";
import QueueProvider from "./Queue.provider";

describe("QueueProvider", () => {
  let connection;
  let queueRepository;
  let serviceRepository;
  let queueProvider;
  let timestamp;

  beforeAll(async () => {
    connection = await createConnection({
      type: "sqljs",
      entities: [Queue, Service],
      logging: false,
      dropSchema: true,
      synchronize: true,
    });

    queueRepository = connection.getRepository(Queue);
    serviceRepository = connection.getRepository(Service);

    queueProvider = new QueueProvider(queueRepository);
  });

  beforeEach(async () => {
    await queueRepository.save(
      queueRepository.create({
        id: 1234,
        number: 1234,
        isDone: false,
      })
    );
    timestamp = (await queueRepository.findOneOrFail(1234)).timestamp;
  });

  afterEach(async () => {
    await queueRepository.clear();
    await serviceRepository.clear();
  });

  it("inserts entities", async () => {
    const newQueue = await queueProvider.addQueue({
      id: 0,
      number: 0,
      isDone: false,
    });
    const expected = new Queue({
      id: 0,
      number: 0,
      isDone: false,
      timestamp,
    });

    expect(newQueue).toStrictEqual(expected);
  });

  it("inserts entities with relations", async () => {
    const newService = new Service({
      id: 7,
      name: "Cleaning",
      type: "A",
    });
    await serviceRepository.save(newService);

    const newQueue = await queueProvider.addQueue({
      id: 0,
      number: 0,
      isDone: false,
      service: newService,
    });
    const expected = new Queue({
      id: 0,
      number: 0,
      isDone: false,
      timestamp,
      service: newService,
    });

    expect(newQueue).toStrictEqual(expected);
  });

  it("retrieves entities", async () => {
    const targetQueue = await queueProvider.getQueue(1234);
    const expected = new Queue({
      id: 1234,
      number: 1234,
      isDone: false,
      timestamp,
    });

    expect(targetQueue).not.toBeUndefined();
    expect(targetQueue).toStrictEqual(expected);
  });

  it("updates entities", async () => {
    const targetQueue = await queueProvider.updateQueue(1234, {
      number: 1234,
      isDone: true,
    });
    const expected = new Queue({
      id: 1234,
      number: 1234,
      isDone: true,
      timestamp,
    });

    expect(targetQueue).toStrictEqual(expected);
  });

  it("updates entities with relations", async () => {
    const newService = new Service({
      id: 7,
      name: "Cleaning",
      type: "A",
    });
    await serviceRepository.save(newService);

    const targetQueue = await queueProvider.updateQueue(1234, {
      number: 1234,
      isDone: true,
      service: newService,
    });
    const expected = new Queue({
      id: 1234,
      number: 1234,
      isDone: true,
      timestamp,
      service: newService,
    });

    expect(targetQueue).toStrictEqual(expected);
  });

  it("deletes entities", async () => {
    const targetQueue = await queueProvider.deleteQueue(1234);
    const expected = new Queue({
      id: 1234,
      number: 1234,
      isDone: false,
      timestamp,
    });
    const deletedQueue = await queueRepository.findOne(1234);

    expect(targetQueue).toStrictEqual(expected);
    expect(deletedQueue).toBeUndefined();
  });

  it("has column of type Date", () => {
    expect(timestamp instanceof Date).toBeTruthy();
    expect(typeof timestamp === "object").toBeTruthy();
    expect(typeof timestamp === "string").toBeFalsy();
  });

  afterAll(async () => {
    await connection.close();
  });
});
