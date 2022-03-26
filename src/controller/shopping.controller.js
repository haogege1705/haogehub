const shoppingService = require('../service/shopping.service');

class ShoppingController {
  async list(ctx, next) {
    const result = await shoppingService.getShoppingList();
    ctx.body = result;
  }

  async addShopping(ctx, next) {
    const {foodId, count, comments, comfirm} = ctx.request.body;
    const result = await shoppingService.addShopping(foodId, count, comments, comfirm);
    ctx.body = result;
  }

  async changeFoodCount(ctx, next) {
    const {id, count, comments} = ctx.request.body;
    const result = await shoppingService.changeFoodCount(id, count, comments);
    ctx.body = result;
  }

  async deleteShoppingGood(ctx, next) {
    const {id} = ctx.request.body;
    const result = await shoppingService.deleteShoppingGood(id);
    ctx.body = result;
  }

  async getOrderList(ctx, next) {
    const result = await shoppingService.getOrderList();
    ctx.body = result;
  }

  async confirmOrder(ctx, next) {
    const result = await shoppingService.confirmOrder();
    ctx.body = result;
  }

  async finishProduction(ctx, next) {
    const {id} = ctx.request.body;
    const result = await shoppingService.finishProduction(id);
    ctx.body = result;
  }

}


module.exports = new ShoppingController();
