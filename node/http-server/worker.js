const makeResponse = require('./makeResponse');
const RequestParser = require('./RequestParser');

module.exports = connection => {
  // stream 处理器
  const parser = new RequestParser();
  // 是否有数据；如果有数据读取数据解析
  connection.on('data', (buffer) => {
    parser.append(buffer);
  })

  parser.on('finish', (message) => {
    // plugin 0
    // ...
    // make response
    message.response.body = Buffer.from('{"hello": "world"}', "ascii");
    response = makeResponse(message)
    connection.end(response);
  })
}