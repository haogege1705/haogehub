const Router = require('koa-router');

const { list,
  createFoodInfo,
  getFoodPicture,
  updateFoodInfo,
  deleteFood,
  getFoodCategory,
  createFoodCategory,
  updateFoodCategory,
  deleteFoodCategory,
  foodSearchByCategoryId,
  foodSearch,
  getFoodImage,
  deleteFoodImage
} = require('../controller/food.controller');

const {
  verifyAuth,
} = require('../middleware/auth.middleware');

const foodRouter = new Router({prefix: '/food'});

foodRouter.get('/list', list);

// foodRouter.post('/createFoodInfo', verifyAuth, createFoodInfo);
foodRouter.post('/createFoodInfo', createFoodInfo);

foodRouter.get('/images/:filename', getFoodPicture);

foodRouter.post('/updateFoodInfo', updateFoodInfo);

foodRouter.post('/deleteFood', deleteFood);

foodRouter.post('/createFoodCategory', createFoodCategory);

foodRouter.get('/getFoodCategory', getFoodCategory);

foodRouter.post('/updateFoodCategory', updateFoodCategory);

foodRouter.post('/deleteFoodCategory', deleteFoodCategory);

foodRouter.post('/foodSearchByCategoryId', foodSearchByCategoryId);

foodRouter.post('/foodSearch', foodSearch);

foodRouter.post('/getFoodImage', getFoodImage);

foodRouter.post('/deleteFoodImage', deleteFoodImage);

module.exports = foodRouter;