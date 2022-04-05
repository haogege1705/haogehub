const Router = require('koa-router');

const {
  addShopInfo,
  changeShopInfo,
  getInfo
} = require('../controller/shopInfo.controller');

const shopRouter = new Router({prefix: '/shop'});

shopRouter.post('/addShopInfo', addShopInfo);

shopRouter.post('/changeShopInfo', changeShopInfo);

shopRouter.get('/getInfo', getInfo);

module.exports = shopRouter;