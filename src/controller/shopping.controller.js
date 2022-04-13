const shoppingService = require('../service/shopping.service');

class ShoppingController {
  async list(ctx, next) {
    const {userName} = ctx.request.body;
    const result = await shoppingService.getShoppingList(userName);
    ctx.body = result;
  }

  async addShopping(ctx, next) {
    const {foodId, count, comments, comfirm, userName} = ctx.request.body;
    const result = await shoppingService.addShopping(foodId, count, comments, comfirm, userName);
    ctx.body = result;
  }

  async changeFoodCount(ctx, next) {
    const {id, count} = ctx.request.body;
    const result = await shoppingService.changeFoodCount(id, count);
    ctx.body = result;
  }

  async deleteShoppingGood(ctx, next) {
    const {id} = ctx.request.body;
    const result = await shoppingService.deleteShoppingGood(id);
    ctx.body = result;
  }

  async getOrderList(ctx, next) {
    const {userName} = ctx.request.body;
    const result = await shoppingService.getOrderList(userName);
    ctx.body = result;
  }

  async confirmOrder(ctx, next) {
    const {userName} = ctx.request.body;
    const result = await shoppingService.confirmOrder(userName);
    ctx.body = result;
  }

  async finishProduction(ctx, next) {
    const {id} = ctx.request.body;
    const result = await shoppingService.finishProduction(id);
    ctx.body = result;
  }

}


module.exports = new ShoppingController();
