/**
 * 原型链继承：子构造函数prototype指向父构造函数实例；
 * 缺点：1. 引用类型。
 */
 function Parent(name, age) {
  this.name = name; 
  this.age = age;
  this.habits = ['table tennis']
  this.sayName = function() {
    console.log(`my name is ${this.name}`)
  }
}

function Child() {

}

// 只要这样直接给原型赋值，都会造成原型属性被所有实例共享。
Child.prototype = new Parent();

 /**
 * 经典继承（借用构造函数)
 * 思路：子构造函数内通过call调用父构造函数
 * 缺点：方法都在构造函数中定义，每次创建构造函数都会创建一遍方法。
 */

function Parent (name) {
  this.name = name;
  this.sayName = function() {
    console.log(`my name is ${this.name}`)
  }
}

function Child(name) {
  Parent.call(this)
  this.name = name;
}


/**
 * 组合继承：原型链和经典继承组合
 * 思路：1. 子构造函数内通过call调用父构造函数
 *      2. 将子构造函数的原型指向父构造函数实例
 *      3. 更正子构造函数的constructor属性
 * 缺点：方法都在构造函数中定义，每次创建构造函数都会创建一遍方法。
 */

 function Parent (name, age) {
  this.name = name;
  this.age = age;
  this.colors = ['red', 'green']
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;