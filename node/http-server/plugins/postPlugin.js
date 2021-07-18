const path = require('path');
const fs = require('fs');

module.exports = (message, env) => {
  // 如果request method不是post，直接返回message
  if (message.request.method !== 'POST') {
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

  // 判断path是否已经存在；如果已经存在返回403
  const requestPath = path.resolve(env.root + message.request.path)
  if (fs.existsSync(requestPath)) {
    message.response.status = 403;
    return message 
  }

  // 写入文件返回message
  fs.mkdirSync(path.dirname(requestPath), { recursive: true})
  fs.writeFileSync(requestPath, message.request.body) // 先创建目录
  message.response.status = 201;
  return message
}