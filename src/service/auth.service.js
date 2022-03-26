const connection = require('../app/database');

class AuthService {
  async checkResource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [id, userId]);
    if(result.length) {
      return true;
    }
    return false;
  }
}

module.exports = new AuthService();