const Router = require('koa-router');

const {
  list,
  addShopping,
  changeFoodCount,
  deleteShoppingGood,
  getOrderList,
  confirmOrder,
  finishProduction
} = require('../controller/shopping.controller');

const {
  verifyAuth,
} = require('../middleware/auth.middleware');

const shoppingRouter = new Router({prefix: '/shopping'});

shoppingRouter.get('/list', list);

shoppingRouter.post('/addShopping', addShopping);

shoppingRouter.post('/changeFoodCount', changeFoodCount);

shoppingRouter.post('/deleteShoppingGood', deleteShoppingGood);

shoppingRouter.post('/getOrderList', getOrderList);

shoppingRouter.post('/confirmOrder', confirmOrder);

shoppingRouter.post('/finishProduction', finishProduction);

module.exports = shoppingRouter;