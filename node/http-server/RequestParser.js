const Events = require('events');  // 继承node 事件类
const { read } = require('fs');

class RequestParser extends Events {

  _state = this._read_request_line; // 初始化state,读取request line

  _cache = null;

  // 解析完成的message
  _message = {
    request: {
      method: '',
      path: '',
      version: '',
      headers: [],
      body: Buffer.from('')
    },
    response: {
      status: 0,
      headers: [],
      body: Buffer.from('')
    },
  }

  append(buffer) {

    for (let offset=0; offset<buffer.length; offset++) {
      this._state = this._state(buffer[offset]);
    }
  }

  _read_request_line(char) {
    if (!this._cache) {
      // Method, URI, Version, CR LF
      // [Pointer, Method, URI, Version, CRFlage,]  Pointer为标识符;
      this._cache = [1, '', '', '', false]; 
    }

    if (char === 0x20) { // === SP space空格
      this._cache[0]++;
    } else if (char === 0x0D) { // === CR enter回车
      this._cache[4] = true;
    } else if (char === 0x0a && this._cache[4]) { // === LF Line Feed 换行符
      // request读取结束，将解析结果赋值给message
      this._message.request.method = this._cache[1];
      this._message.request.path = this._cache[2];
      this._message.request.version= this._cache[3];
      this._cache = null;
      return this._read_header_line;
    } else {  // 正常字符
      this._cache[this._cache[0]] += String.fromCharCode(char);
    }
    return this._read_request_line
  }

  _read_header_line(char) {
    if (!this._cache) {
      // Token: content CRLF
      // [Pointer, token, conent, CRFlage]
      this._cache = [1, '', '', false];
    }

    if (char === 0x3A) { // ===:
      this._cache[0]++;
    } else if (char === 0x0D) { // ===CR
      this._cache[3] = true;
    } else if (char === 0x0A && this._cache[3]) { // === CF
      if (this._cache[1]) {
        this._message.request.headers.push({
          key: this._cache[1],
          value: this._cache[2], 
        })
        this._cache = null;
        return this._read_header_line;
      } else {
        // 如果有CONTENT-LENGTH > 0 则读取body
        const contentLength = this._message.request.headers.find(item => item.key === 'Content-Length')
        this._cache = null;
        return contentLength && contentLength.value > 0 ? this._read_body : this._send_finish_event();      
      }
    } else { // 普通字符
      this._cache[this._cache[0]] += String.fromCharCode(char);
    }
    return this._read_header_line
  }

  _read_body(char) {
    const contentLength = this._message.request.headers.find(item => item.key === 'Content-Length')?.value;

    if (!this._cache) {
      // [Content-Length, bytes-read, content]
      this._cache = [
        parseInt(contentLength),
        0,
        new Uint8Array(contentLength)];  //TODO: 这里为什么是用Unit8Array?
    }
    if (this._cache[1] < this._cache[0]) {
      this._cache[2][this._cache[1]] = char;
      this._cache[1]++;
    }

    if (this._cache[1] === this._cache[0]) {
      this._message.request.body = Buffer.from(this._cache[2]);
      this._cache = null;
      return this._send_finish_event()
    }

    return this._read_body;

  }

  _send_finish_event(char) {
    this.emit('finish', this._message)
    return this._end(char)
  }

  _end(char){
    return this._end;
  }
  // 将处理结束事件导出
  // this.emits('finish', message)
}

module.exports  = RequestParser;