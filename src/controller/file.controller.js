const fileService = require('../service/file.service');
const userService = require('../service/user.service');
const { APP_HOST, APP_PORT } = require('../app/config');


class FileController {
  async saveAvatarInfo(ctx, next) {
    //获取图像相关的信息
    const {id} = ctx.user;
    const { mimetype, filename, size } = ctx.req.file;
    const result = await fileService.createAvatar( mimetype, filename, size, id );
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarUrlById(avatarUrl, id);
    ctx.body = result;
  }


  async saveFileInfo(ctx, next) {
    const { id } = ctx.user;
    const { momentId } = ctx.query;
    const files = ctx.req.files;
    for (let file of files) {
      const { mimetype, filename, size } = file;
      await fileService.createPicture( mimetype, filename, size, id, momentId );
    }
    ctx.body = '上传成功~';
  }

  async saveFoodImg(ctx, next) {
    const { id } = ctx.user;
    const {foodId} = ctx.query;
    const files = ctx.req.files;
    for (let file of files) {
      const { mimetype, filename, size } = file;
      await fileService.createFoodPicture( mimetype, filename, size, id, foodId );
    }
    ctx.body = '上传成功~';
  }

}

module.exports = new FileController();