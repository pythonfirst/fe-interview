const path = require('path');
const fs = require('fs');
const headerUtils = require('../utils/headers');

module.exports = (message, env) => {
  // 如果response.status 不是0，直接返回message
  if (message.response.status !== 0) {
    return message;
  }

  // 判断path是否合法, 不合法则返回403
  if (message.request.path.indexOf('.') === 0) {
    message.response.status = 403;
    return message
  }

  headerUtils.setHeader(message.response.headers, 'Access-Control-Allow-Origin', 'http://ab.com');
  headerUtils.setHeader(message.response.headers, 'Access-Control-Allow-Credentials', 'true');

  return message
}