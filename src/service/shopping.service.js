const connection = require('../app/database');

class ShoppingService {
  async getShoppingList() {
    const statement = `SELECT 
      shopping.id, 
      shopping.foodId,
      shopping.count, 
      shopping.comments,
      shopping.comfirm,
      shopping.createAt, 
      shopping.updateAt, 
      JSON_OBJECT('foodId', food.id, 'name', food.name, 'price', food.price, 'description', food.description) foodInfo
      FROM shopping LEFT JOIN food ON shopping.foodId = food.id WHERE shopping.comfirm = 0;`
    const [result] = await connection.execute(statement);
    return result;
  }

  async addShopping(foodId, count, comments, comfirm) {
    const statement = `INSERT INTO shopping (foodId, count, comments, comfirm) VALUES(?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [foodId, count, comments, comfirm]);
    return result;
  }

  async changeFoodCount(id, count, comments) {
    const statement = `UPDATE shopping SET count = ?, comments = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [count, comments, id]);
    return result;
  }

  async deleteShoppingGood(id) {
    const statement = `DELETE FROM \`shopping\` WHERE id = ?;`
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async getOrderList() {
    const statement = `SELECT 
      shopping.id, 
      shopping.foodId,
      shopping.count, 
      shopping.comments,
      shopping.comfirm,
      shopping.createAt, 
      shopping.updateAt, 
      JSON_OBJECT('foodId', food.id, 'name', food.name, 'price', food.price, 'description', food.description) foodInfo
      FROM shopping LEFT JOIN food ON shopping.foodId = food.id WHERE shopping.comfirm >= 1;`
    const [result] = await connection.execute(statement);
    return result;
  }

  async confirmOrder() {
    const statement = `UPDATE shopping SET comfirm = 1 WHERE comfirm = 0;`;
    const [result] = await connection.execute(statement);
    return result;
  }

  async finishProduction(id) {
    const statement = `UPDATE shopping SET comfirm = 2 WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

}

module.exports = new ShoppingService();