const errorType = require('../constants/error-type');

const errorHandle = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = '账号秘密不能为空~';
      break;
    case errorType.USER_ALREADY_EXISTS:
      status = 409;
      message = '账号名字已存在~';
      break;
    case errorType.USER_DOES_NOT_EXISTS:
      status = 400;
      message = '账号名字不存在~';
      break;
    case errorType.PASSWORD_IS_INCORRECT:
      status = 400;
      message = '密码错误~';
      break;
    case errorType.UNAUTHORIZATION:
      status = 401;
      message = 'token已失效~';
      break;
    case errorType.UNPERMISSION:
      status = 401;
      message = '没有权限修改';
      break;
    default:
      status = 404;
      message = 'NOT FOUND';
      break;
  }

  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandle;