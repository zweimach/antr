import { createConnection, Connection, Repository } from "typeorm";

import { Counter, User } from "../models";
import CounterResolver from "./Counter.resolver";

describe("CounterResolver", () => {
  let connection: Connection;
  let counterRepository: Repository<Counter>;
  let counterResolver: CounterResolver;

  beforeAll(async () => {
    connection = await createConnection({
      type: "sqljs",
      entities: [Counter, User],
      logging: false,
      dropSchema: true,
      synchronize: true
    });

    counterRepository = connection.getRepository(Counter);

    counterResolver = new CounterResolver(counterRepository);
  });

  beforeEach(async () => {
    await counterRepository.save(
      counterRepository.create({ id: 1234, name: "Counter 1234" })
    );
  });

  it("inserts entities", async () => {
    const newCounter = await counterResolver.addCounter({
      id: 0,
      name: "Counter 0"
    });
    const expected = new Counter({ id: 0, name: "Counter 0" });

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
      name: "Counter 2"
    });
    const expected = new Counter({ id: 1234, name: "Counter 2" });

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
