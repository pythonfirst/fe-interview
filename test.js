/**
 * 原型式继承
 * 思路：Object.create();
 * 缺点：实例引用属性共享
 * @param {*} o 
 * @returns 
 */
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F()
}