const RequestParser = require('./RequestParser');

module.exports = connection => {

  // 生成request parser 实例
  const parser = new RequestParser();

  // 监听数据流
  connection.on('data', (buffer) => {
    parser.append(buffer);
  })

  // 监听request parser是否处理完毕
  parser.on('finish', (message) => {
    console.log('message')
  }) 
}