function Person(name, age) {
  this.name = name;
  this.age = age;
  return { age}
}

Person.prototype.strength = 60;

Person.prototype.sayName = function() {
  console.log(`my name is ${this.name}`)
}

const person = new Person('focus', 20)

// console.log(person.name, person.age, person.strength)
// person.sayName()


/**
 * 自顶向下
 * 模拟new的实现
 * 1. 从参数重拿到构造函数。
 * 2. 创建一个新对象obj
 * 3. 将新对象的__proto__指向构造函数的prototype
 * 4. 构造函数的this指向obj
 * 5. 返回obj
 * 6. follow up: 处理返回值的情况
 */
function objectFactory() {
    let obj = new Object()

    const Constructor = Array.prototype.shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    const ret = Constructor.apply(obj, arguments)
    return typeof ret === 'undefined' ? obj : ret 
}

person1 = objectFactory(Person, 'zhao', 28);

console.log('person1', person1)
// person1.sayName()