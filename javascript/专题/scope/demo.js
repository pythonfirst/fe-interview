/**
 * 模拟call
 * 思路：给传入的对象加一个调用函数的属性，然后执行该函数
 * 最后再把该属性从对象中删除
 * @param {*} context 
 * @returns 
 */
Function.prototype.call2 = function(context) {
  context = context || global || window; // 兼容传null的情况
  let arr = [];
  for (let i=1; i < arguments.length; i++) {
    arr.push(arguments[i]);
  }
  context.fn = this; // 获取调用call2的函数
  let result = context.fn(...arr); // ES6解构数组
  delete context.fn  // 执行完毕后删除context上的fn
  return result
}

/**
 * 模拟apply
 * 思路：总体思路和call相同
 * 处理agrumens参数更加简单一些
 * @param {*} context 
 * @returns 
 */
Function.prototype.apply2 = function(context) {
  context = context || global || window;
  let arr = arguments[1];

  context.fn = this;

  let result = context.fn(...arr);

  delete context.fn
  
  return result
}

/**
 * 模拟bind实现
 * 总体思路：
 * 1.return一个函数
 * 2.可以处理参数
 * 3.可以兼容new()/作为构造函数时ss
 * 
 * @param {*} context 
 * @returns 
 */
Function.prototype.bind2 = function(context) {
  // 处理调用者非函数
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable');
  }

  const self = this;
  let args = Array.prototype.slice.call(arguments, 1)

  let fNOP = function() {}
  let fBind = function() {
    return self.apply(context, args.concat(Array.prototype.slice.call(arguments)))
  }
  fNOP.prototype = this.prototype;
  fBind.prototype = new fNOP();
  return fBind
}

let obj = {
  a: 1,
  b: 2,
  c: 3,
}

let a = 1000;

function Log(name, age) {
  console.log('this.a', this.a, 'name: ', name, 'age: ', age);
}

// Log.call2(null, 'keven', 26)
// Log()
// Log.apply2(obj, ['keven-apply', 27])

// Log.bind2(obj, 'bind-name')(30)
let bind = Log.bind2(obj, 'bind-name')
let instance = new bind(22)
