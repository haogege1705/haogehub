const connection = require('../app/database');

class shopInfoService {
  async addShopInfo(shopname, publicInfo) {
    const statement = `INSERT INTO shop_info (shopname, pubiic) VALUES(?, ?);`;
    const [result] = await connection.execute(statement, [shopname, publicInfo]);
    return result;
  }

  async changeShopInfo(shopname, publicInfo) {
    const statement = `UPDATE shop_info SET shopname = ?, pubiic = ? WHERE id = 1;`
    const [result] = await connection.execute(statement, [shopname, publicInfo]);
    return result;
  }

  async getInfo() {
    const statement = `SELECT * FROM shop_info`;
    const [result] = await connection.execute(statement);
    return result;
  }
}

module.exports = new shopInfoService();