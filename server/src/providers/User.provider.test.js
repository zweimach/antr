import { createConnection } from "typeorm";

import { Counter, User } from "../models";
import UserProvider from "./User.provider";

describe("UserProvider", () => {
  let connection;
  let userRepository;
  let userProvider;

  beforeAll(async () => {
    connection = await createConnection({
      type: "sqljs",
      entities: [Counter, User],
      logging: false,
      dropSchema: true,
      synchronize: true,
    });

    userRepository = connection.getRepository(User);

    userProvider = new UserProvider(userRepository);
  });

  beforeEach(async () => {
    await userRepository.save(
      userRepository.create({
        id: 1234,
        fullname: "John",
        username: "john",
        password: "1234",
      })
    );
  });

  it("inserts entities", async () => {
    const newUser = await userProvider.addUser({
      id: 0,
      fullname: "Hayes",
      username: "hayes",
      password: "1234",
    });
    const expected = new User({
      id: 0,
      fullname: "Hayes",
      username: "hayes",
      password: "1234",
    });

    expect(newUser).toStrictEqual(expected);
  });

  it("retrieves entities", async () => {
    const targetUser = await userProvider.getUser(1234);
    const expected = new User({
      id: 1234,
      fullname: "John",
      username: "john",
      password: "1234",
    });

    expect(targetUser).not.toBeUndefined();
    expect(targetUser).toStrictEqual(expected);
  });

  it("updates entities", async () => {
    const targetUser = await userProvider.updateUser(1234, {
      fullname: "John Wick",
      username: "john12",
      password: "1234john",
    });
    const expected = new User({
      id: 1234,
      fullname: "John Wick",
      username: "john12",
      password: "1234john",
    });

    expect(targetUser).toStrictEqual(expected);
  });

  it("deletes entities", async () => {
    const targetUser = await userProvider.deleteUser(1234);
    const expected = new User({
      id: 1234,
      fullname: "John",
      username: "john",
      password: "1234",
    });
    const deletedUser = await userRepository.findOne(1234);

    expect(targetUser).toStrictEqual(expected);
    expect(deletedUser).toBeUndefined();
  });

  afterAll(async () => {
    await connection.close();
  });
});
