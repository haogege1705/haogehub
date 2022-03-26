const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const useRouter = require('../router');


const errorHandle = require('./error-handle');

const app = new Koa();

app.useRouter = useRouter;

app.use(bodyParser());

app.useRouter();

app.on('error', errorHandle)

module.exports = app;
