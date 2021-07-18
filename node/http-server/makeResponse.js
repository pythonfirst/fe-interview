const reasonPharseMap = {
  500: 'Internal Server Error',
  403: 'Forbidden',
  201: 'created',
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
    message.response.body
  ]);
}