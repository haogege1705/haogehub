const shopInfoService = require('../service/shopInfo.service');


class ShopInfoController {
  async addShopInfo(ctx, next) {
    const {shopname, publicInfo} = ctx.request.body;
    const result = await shopInfoService.addShopInfo(shopname, publicInfo);
    ctx.body = result;
  }

  async changeShopInfo(ctx, next) {
    const {shopname, publicInfo} = ctx.request.body;
    const result = await shopInfoService.changeShopInfo(shopname, publicInfo);
    ctx.body = result;
  }
  async getInfo(ctx, next) {
    const result = await shopInfoService.getInfo();
    ctx.body = result;
  }
}

module.exports = new ShopInfoController();