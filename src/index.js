const app = require('./app');
const config = require('./app/config');
const staticAssets = require('koa-static');

require('./app/database');

app.use(staticAssets('./dist'));

app.listen(config.APP_PORT, () => {
  console.log('koa服务器启动成功');
})