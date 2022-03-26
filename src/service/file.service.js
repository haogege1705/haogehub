const connection = require('../app/database');

class FileService {
  async createAvatar( mimetype, filename, size, id ) {
    const statement = `INSERT INTO avatar (mimetype, filename, size, user_id) VALUES (?, ?, ?, ?);`
    const [result] = await connection.execute(statement,[mimetype, filename, size, id]);
    return result;
  }

  async getAvatarById(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }

  async createPicture(mimetype, filename, size, id, momentId) {
    const statement = `INSERT INTO file (mimetype, filename, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [mimetype, filename, size, id, momentId]);
    return result[0];
  }

  async createFoodPicture(mimetype, filename, size, id, foodId) {
    const statement = `INSERT INTO foodimg (mimetype, filename, size, food_id, user_id) VALUES (?, ?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [mimetype, filename, size, foodId, id]);
    return result[0];
  }

  async getFileInfo(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }

  async getFoodImgInfo(filename) {
    const statement = `SELECT * FROM foodimg WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }

}

module.exports = new FileService();