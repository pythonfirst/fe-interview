const makeResponse = require('./makeResponse');
const RequestParser = require('./RequestParser');
const postPlugin = require('./plugins/postPlugin');
const path = require('path');
const getPlugin = require('./plugins/getPlugin');

module.exports = connection => {
  // stream 处理器
  const parser = new RequestParser();
  const env = {
    root: path.resolve('./www'),
  }
  // 是否有数据；如果有数据读取数据解析
  connection.on('data', (buffer) => {
    parser.append(buffer);
  })

  parser.on('finish', (message) => {

    // 设置root目录
    
    // plugin 0
    message = postPlugin(message, env);
    message = getPlugin(message, env);
    // ...
    // make response
    // message.response.body = Buffer.from('{"hello": "world"}', "ascii");
    response = makeResponse(message)
    connection.end(response);
  })
}