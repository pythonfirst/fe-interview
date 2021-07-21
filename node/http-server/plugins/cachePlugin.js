const path = require('path');
const fs = require('fs');
const headerUtils = require('../utils/headers');

function setCacheHeader(statis, message) {
  const Etag = statis.mtimeMs.toString(16)+pathStat.size.toString(16);
  headerUtils.setHeader(message.response.headers, 'Cache-Control', 'max-age=3600');
  headerUtils.setHeader(message.response.headers, 'Etag',Etag ); // TODO: 如何取到Etag
  headerUtils.setHeader(message.response.headers, 'Last-Modified', pathStat.mtime);
}

module.exports = (message, env) => {
  // 如果request method不是post，直接返回message
  if (message.request.method !== 'GET') {
    return message;
  }

  // 如果response.status 不是0，直接返回message
  if (message.response.status !== 0) {
    return message;
  }

  // 判断path是否合法, 不合法则返回403
  if (message.request.path.indexOf('.') === 0) {
    message.response.status = 403;
    return message
  }

  // 判断path是否已经存在；如果不存在返回404
  const requestPath = path.resolve(env.root + message.request.path)
  if (!fs.existsSync(requestPath)) {
    message.response.status = 404;
    return message 
  }

  // 判断是否为文件
  const pathStat = fs.statSync(requestPath);
  if (!pathStat.isFile()) {  // 不是文件直接返回message, 交给getPlugin处理
    return message
  }

  // if-Non-Match
  const ifNonMatchValue = headerUtils.readHeaer(message.request.headers, 'If-None-Match');
  const Etag =  pathStat.mtimeMs.toString(16)+pathStat.size.toString(16);
   // if-Non-Match
   // 没有Etag
  if (!ifNonMatchValue) {
    setCacheHeader(pathStat, message);
    return message
  }

  // 比较摘要是否一致
  // 不一致，直接返回message交给get处理
  if (ifNonMatchValue !== Etag) {
    setCacheHeader(pathStat, message);
    return message
  }

  // 一致进行处理返回304;
  message.response.status = 304;
  return message;
}