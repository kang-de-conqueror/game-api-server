const Game = require("../models/Game");

class GameRepository {
  async createGame(gameData) {
    return await Game.create(gameData);
  }

  async updateGame(game, gameData) {
    return await game.update(gameData);
  }

  async findGameById(id) {
    return await Game.findByPk(id);
  }

  async findAllGames() {
    return await Game.findAll({ order: [["id", "DESC"]] });
  }

  async deleteGame(id) {
    return await Game.destroy({ where: { id } });
  }
}

module.exports = new GameRepository();
