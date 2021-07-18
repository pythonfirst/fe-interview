const makeResponse = require('./makeResponse');
const RequestParser = require('./RequestParser');
const postPlugin = require('./plugins/postPlugin');
const path = require('path');
const getPlugin = require('./plugins/getPlugin');
const putPlugin = require('./plugins/putPlugin');
const deletePlugin = require('./plugins/deletePlugin');

module.exports = connection => {
  // stream 处理器
  const parser = new RequestParser();
  const env = {
    root: path.resolve('./www'),
  }
  console.log('env', env.root)
  // TODO: 开调试模式，windows上和直接跑不同
  // 是否有数据；如果有数据读取数据解析
  connection.on('data', (buffer) => {
    parser.append(buffer);
  })

  parser.on('finish', (message) => {

    // 设置root目录
    
    // plugin
    message = postPlugin(message, env);
    message = getPlugin(message, env);
    message = putPlugin(message, env);
    message = deletePlugin(message, env);
    response = makeResponse(message)
    connection.end(response);
  })
}