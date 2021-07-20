const path = require('path');
const fs = require('fs');
const headerUtils = require('../utils/headers');

module.exports = (message, env) => {
  // console.log('message', JSON.stringify(message));

  // 如果response.status 不是0，直接返回message
  if (message.response.status !== 0) {
    return message;
  }

  // 如果request method不是Options，直接返回message
  if (message.request.method !== 'OPTIONS') {
    return message;
  }

  // 判断path是否合法, 不合法则返回403
  if (message.request.path.indexOf('.') === 0) {
    message.response.status = 403;
    return message
  }

  // 判断path是否已经存在；如果不存在返回404
  const requestPath = path.resolve(env.root + message.request.path);
  const pathStat = fs.statSync(requestPath);
  if (!fs.existsSync(requestPath) || !pathStat.isFile()) {
    message.response.status = 200;
    headerUtils.setHeader(message.response.headers, 'Access-Control-Allow-Methods', 'GET,POST');
    return messages
  }
  message.response.status = 200;
  headerUtils.setHeader(message.response.headers, 'Access-Control-Allow-Methods', 'GET,PUT,DELETE');
}