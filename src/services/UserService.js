const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/UserRepository");

class UserService {
  async createUser(name, email, password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userData = { name, email, password: hashedPassword };

    return await userRepository.createUser(userData);
  }

  async getUser(email) {
    return await userRepository.getUserByEmail(email);
  }
}

module.exports = new UserService();
