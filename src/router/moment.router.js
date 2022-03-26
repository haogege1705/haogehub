const Router = require('koa-router');
const momentRouter = new Router({prefix: '/moment'});
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');

const verifyLabelExists = require('../middleware/label.middleware');

const { create, detail, list, update, remove, addLabel, getMomentPicture } = require('../controller/moment.controller')

momentRouter.post('/', verifyAuth, create);

momentRouter.get('/', list);

momentRouter.get('/:momentId', detail);

momentRouter.patch('/:momentId',verifyAuth, verifyPermission, update);

momentRouter.delete('/:momentId',verifyAuth, verifyPermission, remove);

momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabel);
//获取动态配图
momentRouter.get('/images/:filename', getMomentPicture);

module.exports = momentRouter;