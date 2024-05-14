const gameRepository = require("../repositories/GameRepository");

class GameService {
  async createGame(gameData) {
    return await gameRepository.createGame(gameData);
  }

  async updateGame(id, gameData) {
    const game = await gameRepository.findGameById(id);
    if (!game) {
      throw new Error("Resource not found");
    }
    return await gameRepository.updateGame(game, gameData);
  }

  async getGameById(id) {
    const game = await gameRepository.findGameById(id);
    if (!game) {
      throw new Error("Resource not found");
    }
    return game;
  }

  async getAllGames() {
    return await gameRepository.findAllGames();
  }

  async deleteGame(id) {
    return await gameRepository.deleteGame(id);
  }
}

module.exports = new GameService();
