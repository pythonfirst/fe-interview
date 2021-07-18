const path = require('path');
const fs = require('fs');

module.exports = (message, env) => {
  // 如果request method不是post，直接返回message
  if (message.request.method !== 'DELETE') {
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
  if (pathStat.isFile()) { // 是文件则删除文件
    // 删除文件
    fs.unlinkSync(requestPath);
    message.response.status = 200;
    return message
  } else { // 不是文件返回403
    message.response.status = 403;
    return message;
  }
}