function Person(name) {
  this.name = name;
}

person1 = new Person('person1')

console.log(Person.prototype === person1.__proto__) // 构造函数prototype属性与实例的__proto__属性相等为实例的原型。
 
console.log(Person.prototype.constructor === Person);  // 构造函数prototype属性的constructor属性等于构造函数。

console.log(Object.getPrototypeOf(person1) === Person.prototype) // 实例的getPrototypeOf方法可以获得实例的原型。

console.log(person1.constructor === Person)  // person1的构造函数===Person person1本身没有，通过原型链查找在原型上找到。