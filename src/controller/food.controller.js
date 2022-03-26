const foodService = require('../service/food.service');
const fileService = require('../service/file.service');
const fs = require('fs');
const { FOOD_PICTURE_PATH } = require('../constants/file-path');


class FoodController {
  async createFoodInfo(ctx, next) {
    const {name, price, description, categoryId} = ctx.request.body;
    const result = await foodService.createFoodInfo(name, price, description, categoryId);
    ctx.body = result;
  }

  async list(ctx, next) {
    const result = await foodService.getFoodList();
    ctx.body = result;
  }

  async foodSearch(ctx, next) {
    const {keyValue} = ctx.request.body;
    const result = await foodService.foodSearch(keyValue);
    ctx.body = result;
  }

  async getFoodPicture(ctx, next) {
    let { filename } = ctx.params;
    const fileInfo = await fileService.getFoodImgInfo(filename);
    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${FOOD_PICTURE_PATH}/${filename}`);
  }

  async updateFoodInfo(ctx, next) {
    const { id, name, price, description, categoryId} = ctx.request.body;
    const result = await foodService.updateFoodInfo(id, name, price, description, categoryId);
    ctx.body = result;
  }

  async deleteFood(ctx, next) {
    const { id } = ctx.request.body;
    const result = await foodService.deleteFood(id);
    ctx.body = result;
  }

  async getFoodCategory(ctx, next) {
    const result = await foodService.getFoodCategory();
    ctx.body = result;
  }

  async createFoodCategory(ctx, next) {
    const { name } = ctx.request.body;
    const result = await foodService.createFoodCategory(name);
    ctx.body = result;
  }

  async updateFoodCategory(ctx, next) {
    const { id, name } = ctx.request.body;
    const result = await foodService.updateFoodCategory(id, name);
    ctx.body = result;
  }

  async deleteFoodCategory(ctx, next) {
    const { id } = ctx.request.body;
    const result = await foodService.deleteFoodCategory(id);
    ctx.body = result;
  }

}

module.exports = new FoodController();