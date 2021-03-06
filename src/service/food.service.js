const connection = require('../app/database');

class FoodService {
  async createFoodInfo(name, price, description, categoryId) {
    const statement = `INSERT INTO food (name, price, description, categoryId) VALUES(?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [name, price, description, categoryId]);
    return result;
  }

  async getFoodList() {
    const statement = `SELECT 
      food.id, 
      food.name,
      food.price, 
      food.description,
      food.salecount,
      food.createAt, 
      food.updateAt, 
      JSON_OBJECT('category_id', foodcategory.id, 'category_name', foodcategory.name) category,
      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/food/images/', foodimg.filename)) FROM foodimg WHERE food.id = foodimg.food_id) image
      FROM food LEFT JOIN foodcategory ON food.categoryId = foodcategory.id ORDER BY categoryId DESC;`
    const [result] = await connection.execute(statement);
    return result;
  }

  async foodSearch(keyValue) {
    keyValue = '%' + keyValue + '%';
    const statement = `SELECT
      food.id, 
      food.name,
      food.price, 
      food.description,
      food.salecount,
      food.createAt, 
      food.updateAt,
      JSON_OBJECT('category_id', foodcategory.id, 'category_name', foodcategory.name) category,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/food/images/', foodimg.filename)) FROM foodimg WHERE food.id = foodimg.food_id) image
    FROM \`food\` LEFT JOIN foodcategory ON food.categoryId = foodcategory.id WHERE food.name LIKE ? ;`;
    const [result] = await connection.execute(statement, [keyValue]);
    return result;
  }

  async updateFoodInfo(id, name, price, description, categoryId) {
    const statement = `UPDATE food SET \`name\` = ?, price = ?, description = ?, categoryId = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [name, price, description, categoryId, id]);
    return result;
  }

  async deleteFood(id) {
    const statement = `DELETE FROM \`food\` WHERE id = ?;`
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async getFoodCategory() {
    const statement = `SELECT * FROM foodcategory`;
    const [result] = await connection.execute(statement);
    return result;
  }

  async createFoodCategory(name) {
    const statement = `INSERT INTO foodcategory (name) VALUES(?);`
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  async updateFoodCategory(id, name) {
    const statement = `UPDATE foodcategory SET \`name\` = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [name, id]);
    return result;
  }

  async foodSearchByCategoryId(categoryId) {
    const statement = `SELECT * FROM food WHERE categoryId = ?`;
    const [result] = await connection.execute(statement, [categoryId]);
    return result;
  }

  async deleteFoodCategory(id) {
    const statement = `DELETE FROM \`foodcategory\` WHERE id = ?;`
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async getFoodImage(foodId) {
    const statement = `SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/food/images/', foodimg.filename)) images FROM foodimg WHERE food_id = ?`
    const [[result]] = await connection.execute(statement, [foodId]);
    return result?.images;
  }

  async deleteFoodImage(filename) {
    const statement = `DELETE FROM foodimg WHERE filename = ?;`
    const [result] = await connection.execute(statement, [filename]);
    return result;
  }

}


module.exports = new FoodService();