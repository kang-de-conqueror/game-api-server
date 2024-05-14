const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/UserRepository");

class UserService {
  async createUser(name, email, password) {
    const userData = { name, email, password };
    return await userRepository.createUser(userData);
  }

  async getUser(email) {
    return await userRepository.getUserByEmail(email);
  }
}

module.exports = new UserService();
