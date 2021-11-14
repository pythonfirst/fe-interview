class Dog {
  constructor() {

  }

  show() {
    console.log('我是一个单例对象');
  }
}

Dog.getInstance = (
  function() {
    let instance = null;
    return function() {
      if (!instance) {
        instance = new Dog()
      }

      return instance;
    }
  }
)()

const dog1 = new Dog();
const dog2 = new Dog();
console.log(dog1 === dog2);

const dog3 = Dog.getInstance();
const dog4 = Dog.getInstance();
console.log(dog3 === dog4);
