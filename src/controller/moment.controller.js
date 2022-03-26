const momentService = require('../service/moment.service');
const fileService = require('../service/file.service');
const fs = require('fs');
const { PICTURE_PATH } = require('../constants/file-path');


class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }

  async detail(ctx, next) {
    const momentId = ctx.params.momentId;
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }

  async list(ctx, next) {
    const {offset, size} = ctx.query;
    const result = await momentService.getMomentList(offset, size);
    ctx.body = result;
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await momentService.updateMoment(momentId, content);
    ctx.body = result;
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.removeMoment(momentId);
    ctx.body = result;
  }

  async addLabel(ctx, next) {
    const { momentId } = ctx.params;
    const { labels } =  ctx;
    for (let label of labels) {
      const isExist = await momentService.hasLabel(momentId, label.id);
      if(!isExist) {
        await momentService.addLabel(momentId, label.id);
      }
    }
    ctx.body = 'ok';
  }

  async getMomentPicture(ctx, next) {
    let { filename } = ctx.params;
    const { type } = ctx.query;
    const types = ['small', 'middle', 'large'];
    const fileInfo = await fileService.getFileInfo(filename);
    if (types.some(item => item === type)) {
      filename = filename + '-' + type;
    }
    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}


module.exports = new MomentController();