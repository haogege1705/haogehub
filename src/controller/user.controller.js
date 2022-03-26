const { AVATAR_PATH } = require('../constants/file-path');

const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const fs = require('fs');

class UserController {
  async create(ctx, next) {
    //获取用户请求参数
    const user = ctx.request.body;
    //查询数据库
    const result = await userService.create(user);
    //返回数据
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;
    const avatarInfo = await fileService.getAvatarById(userId);
    ctx.response.set('content-type', avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`); //这样会直接下载文件，而不是头像，所以前面加了content type
  }
}

module.exports = new UserController();