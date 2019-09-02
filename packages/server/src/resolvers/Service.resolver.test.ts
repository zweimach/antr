import { createConnection, Connection, Repository } from "typeorm";

import { Queue, Service } from "../models";
import ServiceResolver from "./Service.resolver";

describe("ServiceResolver", () => {
  let connection: Connection;
  let serviceRepository: Repository<Service>;
  let serviceResolver: ServiceResolver;

  beforeAll(async () => {
    connection = await createConnection({
      type: "sqljs",
      entities: [Queue, Service],
      logging: false,
      dropSchema: true,
      synchronize: true
    });

    serviceRepository = connection.getRepository(Service);

    serviceResolver = new ServiceResolver(serviceRepository);
  });

  beforeEach(async () => {
    await serviceRepository.save(
      serviceRepository.create({
        id: 1234,
        name: "Service A",
        type: "A"
      })
    );
  });

  it("inserts entities", async () => {
    const newService = await serviceResolver.addService({
      id: 0,
      name: "Service Z",
      type: "Z"
    });
    const expected = new Service({
      id: 0,
      name: "Service Z",
      type: "Z"
    });

    expect(newService).toStrictEqual(expected);
  });

  it("retrieves entities", async () => {
    const targetService = await serviceResolver.getService("Service A");
    const expected = new Service({
      id: 1234,
      name: "Service A",
      type: "A"
    });

    expect(targetService).not.toBeUndefined();
    expect(targetService).toStrictEqual(expected);
  });

  it("updates entities", async () => {
    const targetService = await serviceResolver.updateService(1234, {
      name: "Service A",
      type: "B"
    });
    const expected = new Service({
      id: 1234,
      name: "Service A",
      type: "B"
    });

    expect(targetService).toStrictEqual(expected);
  });

  it("deletes entities", async () => {
    const targetService = await serviceResolver.deleteService(1234);
    const expected = new Service({
      id: 1234,
      name: "Service A",
      type: "A"
    });
    const deletedService = await serviceRepository.findOne(1234);

    expect(targetService).toStrictEqual(expected);
    expect(deletedService).toBeUndefined();
  });

  afterAll(async () => {
    await connection.close();
  });
});
