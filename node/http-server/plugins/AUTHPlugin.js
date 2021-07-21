const path = require('path');
const fs = require('fs');
const headerUtils = require('../utils/headers');

module.exports = (message, env) => {
  // 如果response.status 不是0，直接返回message
  if (message.response.status !== 0) {
    return message;
  }

  // 判断是否携带Authorization
  const authorizationValue = headerUtils.readHeaer(message.request.headers, 'Authorization');
  const cookieValue = headerUtils.readHeaer(message.request.headers, 'Cookie');
  if (!cookieValue && authorizationValue) {
    // Basic zhaocanxiang:123456
    const matchedValue = authorizationValue.match(/Basic\s*(\w+)/i);
    // 匹配到用户名密码
    if (matchedValue[1]) {
      const userPair = Buffer.from(matchedValue[1], 'base64').toString().split(':');
      // make session file
      if (userPair[0] === 'admin' && userPair[1] === '123456') {
        const sessionId = new Date().getTime();
        const sessionPath = path.resolve(env.session, String(sessionId));
        fs.writeFileSync(sessionPath, userPair[0]); // session写入一个用户名;
        // set cookie
        headerUtils.setHeader(message.response.headers, 'Set-Cookie', `sessionId=session_${sessionId};max-age=3600;SameSite='None'`);
        return message
      } else {
        message.response.status = 401;
        headerUtils.setHeader(message.response.headers, 'www-Authenticate', 'basic realm="login"');
        return message;
      }
    } else {
      // 未匹配到用户名密码
      headerUtils.setHeader(message.response.headers, 'www-Authenticate', 'basic realm="login"');
      message.response.status = 401;
      return message
    }
  } else {
    // 未携带登陆信息Authorization
    const cookieValue = headerUtils.readHeaer(message.request.headers, 'Cookie');
    if (cookieValue) {
      const sessionId = cookieValue.match(/sessionId=session_(\w+)/);
      const sessionPath = path.resolve(env.session, String(sessionId[1]));
      if (fs.existsSync(sessionPath)) {
        // session存在则return message
        if (fs.readFileSync(sessionPath).toString() === 'admin') { // 登陆用户是否为admin
        } else {
          headerUtils.setHeader(message.response.headers, 'www-Authenticate', 'basic realm="login"');
          message.response.status = 401;
        }
        return message;
      } 
    }
  }
  // session不存在转向401
  headerUtils.setHeader(message.response.headers, 'www-Authenticate', 'basic realm="login"');
  message.response.status = 401;
  return message;
}