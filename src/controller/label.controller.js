const service = require('../service/label.service');


class LabelController {
  async create(ctx, next) {
    const { label } = ctx.request.body;
    const result = await service.create(label);
    ctx.body = result;
  }

  async list(ctx, next) {
    const {offset, size} = ctx.query;
    const result = await service.list(offset, size);
    ctx.body = result;
  }
}

module.exports = new LabelController();
