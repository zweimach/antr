import { createConnection } from "typeorm";

import { Queue, Service } from "../models";
import ServiceProvider from "./Service.provider";

describe("ServiceProvider", () => {
  let connection;
  let serviceRepository;
  let queueRepository;
  let serviceProvider;

  beforeAll(async () => {
    connection = await createConnection({
      type: "sqljs",
      entities: [Queue, Service],
      logging: false,
      dropSchema: true,
      synchronize: true,
    });

    serviceRepository = connection.getRepository(Service);
    queueRepository = connection.getRepository(Queue);

    serviceProvider = new ServiceProvider(serviceRepository);
  });

  beforeEach(async () => {
    await serviceRepository.save(
      serviceRepository.create({
        id: 1234,
        name: "Service A",
        type: "A",
      })
    );
    await queueRepository.save(new Queue({ id: 0, isDone: false, number: 12 }));
  });

  afterEach(async () => {
    await queueRepository.clear();
    await serviceRepository.clear();
  });

  it("inserts entities", async () => {
    const newService = await serviceProvider.addService({
      id: 0,
      name: "Service Z",
      type: "Z",
    });
    const expected = new Service({
      id: 0,
      name: "Service Z",
      type: "Z",
    });

    expect(newService).toStrictEqual(expected);
  });

  it("inserts entities with relations", async () => {
    const newQueue = new Queue({
      number: 1234,
      isDone: true,
      id: 1,
    });
    queueRepository.save(newQueue);

    const targetService = await serviceProvider.addService({
      id: 0,
      name: "Cleaning",
      type: "C",
      queues: [newQueue],
    });
    const expected = new Service({
      id: 0,
      name: "Cleaning",
      type: "C",
      queues: [newQueue],
    });

    expect(targetService).toStrictEqual(expected);
  });

  it("retrieves entities", async () => {
    const targetService = await serviceProvider.getService(1234);
    const expected = new Service({
      id: 1234,
      name: "Service A",
      type: "A",
    });

    expect(targetService).not.toBeUndefined();
    expect(targetService).toStrictEqual(expected);
  });

  it("updates entities", async () => {
    const targetService = await serviceProvider.updateService(1234, {
      name: "Service A",
      type: "B",
    });
    const expected = new Service({
      id: 1234,
      name: "Service A",
      type: "B",
    });

    expect(targetService).toStrictEqual(expected);
  });

  it("updates entities with relations", async () => {
    const newQueue = new Queue({
      number: 1234,
      isDone: true,
      id: 1,
    });
    queueRepository.save(newQueue);

    const targetService = await serviceProvider.updateService(1234, {
      name: "Cleaning",
      type: "A",
      queues: [newQueue],
    });
    const expected = new Service({
      id: 1234,
      name: "Cleaning",
      type: "A",
      queues: [newQueue],
    });

    expect(targetService).toStrictEqual(expected);
  });

  it("deletes entities", async () => {
    const targetService = await serviceProvider.deleteService(1234);
    const expected = new Service({
      id: 1234,
      name: "Service A",
      type: "A",
    });
    const deletedService = await serviceRepository.findOne(1234);

    expect(targetService).toStrictEqual(expected);
    expect(deletedService).toBeUndefined();
  });

  afterAll(async () => {
    await connection.close();
  });
});
