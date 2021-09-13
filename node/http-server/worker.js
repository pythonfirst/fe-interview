const makeResponse = require('./makeResponse');
const RequestParser = require('./RequestParser');
const path = require('path');
const postPlugin = require('./plugins/postPlugin');
const getPlugin = require('./plugins/getPlugin');
const putPlugin = require('./plugins/putPlugin');
const deletePlugin = require('./plugins/deletePlugin');
const AUTHPlugin = require('./plugins/AUTHPlugin');
const CORSPlugin = require('./plugins/CORSPlugin');
const optionsPlugin = require('./plugins/optionsPlugin');
const cachePlugin = require('./plugins/cachePlugin');

module.exports = connection => {
  // stream 处理器
  const parser = new RequestParser();
  const env = {
    root: path.resolve('./www'),
    session: path.resolve('./session'),
  }
  // TODO: 开调试模式，windows上和直接跑不通
  // 是否有数据；如果有数据读取数据解析
  connection.on('data', (buffer) => {
    parser.append(buffer);
  })

  parser.on('finish', (message) => {

    // 设置root目录
    
    // plugin
    message = CORSPlugin(message, env);
    mesage = optionsPlugin(message, env);
    message = AUTHPlugin(message, env);
    message = postPlugin(message, env);
    message = cachePlugin(message, env);
    message = getPlugin(message, env);
    message = putPlugin(message, env);
    message = deletePlugin(message, env);
    response = makeResponse(message)
    connection.end(response);
  })
}