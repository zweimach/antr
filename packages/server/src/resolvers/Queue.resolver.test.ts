import { createConnection, Connection, Repository } from "typeorm";

import { Queue, Service } from "../models";
import QueueResolver from "./Queue.resolver";

describe("QueueResolver", () => {
  let connection: Connection;
  let queueRepository: Repository<Queue>;
  let queueResolver: QueueResolver;
  let timestamp: Date;

  beforeAll(async () => {
    connection = await createConnection({
      type: "sqljs",
      entities: [Queue, Service],
      logging: false,
      dropSchema: true,
      synchronize: true
    });

    queueRepository = connection.getRepository(Queue);

    queueResolver = new QueueResolver(queueRepository);
  });

  beforeEach(async () => {
    await queueRepository.save(
      queueRepository.create({
        id: 1234,
        number: 1234,
        isDone: false
      })
    );
    timestamp = (await queueRepository.findOneOrFail(1234)).timestamp;
  });

  it("inserts entities", async () => {
    const newQueue = await queueResolver.addQueue({
      id: 0,
      number: 0,
      isDone: false
    });
    const expected = new Queue({
      id: 0,
      number: 0,
      isDone: false,
      timestamp
    });

    expect(newQueue).toStrictEqual(expected);
  });

  it("retrieves entities", async () => {
    const targetQueue = await queueResolver.getQueue(1234);
    const expected = new Queue({
      id: 1234,
      number: 1234,
      isDone: false,
      timestamp
    });

    expect(targetQueue).not.toBeUndefined();
    expect(targetQueue).toStrictEqual(expected);
  });

  it("updates entities", async () => {
    const targetQueue = await queueResolver.updateQueue(1234, {
      number: 1234,
      isDone: true
    });
    const expected = new Queue({
      id: 1234,
      number: 1234,
      isDone: true,
      timestamp
    });

    expect(targetQueue).toStrictEqual(expected);
  });

  it("deletes entities", async () => {
    const targetQueue = await queueResolver.deleteQueue(1234);
    const expected = new Queue({
      id: 1234,
      number: 1234,
      isDone: false,
      timestamp
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
