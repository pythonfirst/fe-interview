/**
 * 手写call
 * 自顶向下
 * 1. 给obj添加调用fn
 *  1.1 处理剩余参数
 * 2. 执行fn
 * 3. 删除obj的fn属性
 * 4. 处理返回值
 * @param {object} obj 
 */
 Function.prototype.call2 = function(obj) {

  const args = [];
  for (let i=1; i<arguments.length; i++) {
    args.push(arguments[i])
  }

  // 拿到调用call2的函数
  obj.fn = this || window;

  const result = obj.fn(...args);

  delete obj.fn

  return result
}

/**
 * 手写apply
 * @param {*} obj 
 * @returns 
 */
Function.prototype.apply2 = function(obj) {

  console.log(arguments)

  const arr = arguments[1];

  obj.fn = this || window;

  const result = !arr ? obj.fn() : obj.fn(...arr);

  delete obj.fn

  return result
}

/**
 * 模拟bind
 * 1. 返回一个函数
 * 2. 可以传入不定参数
 *  2.1 bind时可以传入参数
 *  2.2 函数调用时可以传入参数
 * 3. 可以使用new
 * @param {*} obj 
 */
 Function.prototype.bind2 = function (obj) {
  const self = this; // 调用bind2的函数，即：bar（）
  
  const arr = [];
  for (let i=1; i< arguments.length; i++) {
    arr.push(arguments[i])
  }

  return function() {
    let bindArgs = Array.prototype.slice.call(arguments);

    // 如果this为fBound的实例，则为使用new调用， 将this指向实例
    var fBound = self.apply(this instanceof fBound ? this : obj, arr.concat(bindArgs))

    // 修改返回函数原型为绑定函数原型,可以继承绑定函数属性。
    // 使用fNOP中转避免fBound与绑定函数指向同一个对象。
    // fBound.prototype.__prototype__ = self.prototype
    const fNOP = function() {};
    fNOP.prototype = self.prototype;
    fBound.prototype = new fNOP();

    return fBound
  }
}