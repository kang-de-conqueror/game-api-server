const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRepository = require("../repositories/UserRepository");

class AuthService {
  generateToken(params) {
    return jwt.sign({ params }, process.env.SECRET, { expiresIn: "2880m" });
  }

  async authenticateUser(email, password) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Unauthorized");
    }

    user.password = undefined;
    const token = this.generateToken(user.id);
    return { user, token };
  }
}

module.exports = new AuthService();
