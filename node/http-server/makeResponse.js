const reasonPharseMap = {
  200: 'ok',  // get put delete success
  201: 'created', // post 新建成功
  206: 'Partial Content', // 获取资源部分header: {Range: bytes=1-5}
  304: 'Not Modified',
  401: 'Unauthorized',
  403: 'Forbidden', // get put delete URL不合法；post目录
  404: 'Not Found',  // get put delete url不存在
  500: 'Internal Server Error',  // server不知道如何处理
}

module.exports = (message) => {
  if (!message.response.status) {
    message.response.status = 500;
  }


  const reasonPharse =reasonPharseMap[message.response.status];

  const statusLine = `${message.request.version} ${message.response.status} ${reasonPharse} \r\n`;

  message.response.headers.push({
    key: 'Content-Length',
    value: message.response.body.length,
  })
  
  let headerLines = message.response.headers
    .map(item => {
      return `${item.key}: ${item.value}\r\n`
    })
    .join('');
  
  headerLines += "\r\n";

  return Buffer.concat([
    Buffer.from(statusLine, 'ascii'),
    Buffer.from(headerLines, 'ascii'),
    message.response.body,
  ]);
}