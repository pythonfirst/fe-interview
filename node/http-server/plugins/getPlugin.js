const path = require('path');
const fs = require('fs');

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
    return message;
  }

  // 判断path是否已经存在；如果已经存在返回403
  const requestPath = path.resolve(env.root + message.request.path);
  // 如果路径存在
  if (fs.existsSync(requestPath)) {
    const pathStat = fs.statSync(requestPath);
    // 判断是否为目录
    if (pathStat.isDirectory()) {
      // directory list files
      const files = fs.readdirSync(requestPath);  // 读取目录文件
      let contentHtml = `<html><head><meta charset="utf-8"/><title>${message.request.path}</title></head><body><h2>${message.request.path}</h2><table>`
      contentHtml += files.map(item => {
        const itemPath = path.resolve(requestPath, item);
        itemStat = fs.statSync(itemPath);
        let size = "-";
        if (itemStat.isFile()) {
          size = itemStat.size;
        }
        return `<tr><td>${item}</td><td>${itemStat.mtime}</td><td>${size}</td></tr>`
      }).join('');
      contentHtml += `</table></body></html>`
      message.response.body = Buffer.from(contentHtml, 'utf-8');
      message.response.status = 200;
      return message;
    } else if (pathStat.isFile()) { // 非目录
      // read content
      message.response.body = fs.readFileSync(requestPath);
      message.response.status = 200;
      return message
    } else {
      message.response.status = 404;
    }
    return message;
  } else {  // 路径不存在
    message.response.status = 404;
    return message;
  }
}