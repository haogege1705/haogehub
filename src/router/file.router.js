const Router = require('koa-router');
const { avatarHandle, pictureHandle, pictureResize, foodPictureHandle } = require('../middleware/file.middleware');
const {
  saveAvatarInfo,
  saveFileInfo,
  saveFoodImg
} = require('../controller/file.controller');


const {
  verifyAuth
} = require('../middleware/auth.middleware');

const fileRouter = new Router({ prefix: '/upload' });


fileRouter.post('/avatar', verifyAuth, avatarHandle, saveAvatarInfo);

fileRouter.post('/picture', verifyAuth, pictureHandle, pictureResize, saveFileInfo );

fileRouter.post('/food/img', verifyAuth, foodPictureHandle, saveFoodImg);

module.exports = fileRouter;