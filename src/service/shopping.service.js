const connection = require('../app/database');

class ShoppingService {
  async getShoppingList(userName) {
    const statement = `SELECT 
      shopping.id, 
      shopping.foodId,
      shopping.count, 
      shopping.comments,
      shopping.comfirm,
      shopping.createAt, 
      shopping.updateAt, 
      JSON_OBJECT('foodId', food.id, 'name', food.name, 'price', food.price, 'description', food.description) foodInfo,
      (SELECT JSON_ARRAYAGG(CONCAT('http://121.41.115.226:8000/food/images/', foodimg.filename)) FROM foodimg WHERE shopping.foodId = foodimg.food_id) image
      FROM shopping LEFT JOIN food ON shopping.foodId = food.id WHERE shopping.comfirm = 0 AND shopping.count != 0 And shopping.userName = ?;`
    const [result] = await connection.execute(statement, [userName]);
    return result;
  }

  async addShopping(foodId, count, comments, comfirm, userName) {
    const statement = `INSERT INTO shopping (foodId, count, comments, comfirm, userName) VALUES(?, ?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [foodId, count, comments, comfirm, userName]);
    return result;
  }

  async changeFoodCount(id, count) {
    const statement = `UPDATE shopping SET count = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [count, id]);
    return result;
  }

  async deleteShoppingGood(id) {
    const statement = `DELETE FROM \`shopping\` WHERE id = ?;`
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async getOrderList(userName) {
    let statement;
    if (userName) {
      statement = `SELECT 
      shopping.id, 
      shopping.foodId,
      shopping.count, 
      shopping.comments,
      shopping.comfirm,
      shopping.createAt, 
      shopping.updateAt, 
      JSON_OBJECT('foodId', food.id, 'name', food.name, 'price', food.price, 'description', food.description) foodInfo,
      (SELECT JSON_ARRAYAGG(CONCAT('http://121.41.115.226:8000/food/images/', foodimg.filename)) FROM foodimg WHERE shopping.foodId = foodimg.food_id) image
      FROM shopping LEFT JOIN food ON shopping.foodId = food.id WHERE shopping.comfirm >= 1 AND shopping.userName = ? ORDER BY comfirm ASC;`
      const [result] = await connection.execute(statement, [userName]);
      return result;
    }
    else {
      statement = `SELECT 
      shopping.id, 
      shopping.foodId,
      shopping.count, 
      shopping.comments,
      shopping.comfirm,
      shopping.createAt, 
      shopping.updateAt, 
      JSON_OBJECT('foodId', food.id, 'name', food.name, 'price', food.price, 'description', food.description) foodInfo,
      (SELECT JSON_ARRAYAGG(CONCAT('http://121.41.115.226:8000/food/images/', foodimg.filename)) FROM foodimg WHERE shopping.foodId = foodimg.food_id) image
      FROM shopping LEFT JOIN food ON shopping.foodId = food.id WHERE shopping.comfirm >= 1 ORDER BY comfirm ASC;`
      const [result] = await connection.execute(statement);
      return result;
    }
  }

  async confirmOrder(userName) {
    const statement1 = `SELECT shopping.foodId, shopping.count FROM shopping WHERE comfirm = 0 AND count > 0 AND userName = ?;`
    const [results] = await connection.execute(statement1, [userName]);
    results.forEach(async item => {
      let state = `UPDATE food SET salecount = salecount + ? WHERE id = ?;`
      await connection.execute(state, [item.count, item.foodId]);
    })
    const statement = `UPDATE shopping SET comfirm = 1 WHERE comfirm = 0 AND userName = ?;`;
    const [result] = await connection.execute(statement, [userName]);
    return result;
  }

  async finishProduction(id) {
    const statement = `UPDATE shopping SET comfirm = 2 WHERE id = ?;`;
    if (id.length) {
      id.forEach(async item => {
        await connection.execute(statement, [item]);
      })
      return '制作完毕';
    }
  }

}

module.exports = new ShoppingService();