export default class UserResolver {
  constructor(repository) {
    this.repository = repository;
  }

  async addUser(user) {
    const newUser = this.repository.create(user);
    return await this.repository.save(newUser);
  }

  async updateUser(id, { fullname, username, password }) {
    const updatedUser = await this.repository.findOne({ id });
    if (updatedUser) {
      await this.repository.update(id, { username, password, fullname });
    }
    return await this.repository.findOne(id);
  }

  async deleteUser(id) {
    const deletedUser = await this.repository.findOne({ id });
    if (deletedUser) {
      await this.repository.delete(deletedUser);
    }
    return deletedUser;
  }

  async getUser(id) {
    return await this.repository.findOne({ id });
  }

  async getAllUsers() {
    return await this.repository.find();
  }
}
