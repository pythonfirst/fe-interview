/** class似有方法实现单例模式 */
class SingleDog {
  show() {
    console.log('我是一个单例对象')
  }

  static getInstance() {
    if (!SingleDog.instance) {
      SingleDog.instance = new SingleDog();
    }

    return SingleDog.instance
  }
}

const s1 = new SingleDog();
const s2 = new SingleDog();

console.log(s1 === s2)

const s3 = SingleDog.getInstance();
const s4 = SingleDog.getInstance();
console.log(s3 === s4)

/** 闭包实现单例模式 */
function Vuex() {

}

Vuex.getInstance = (function() {
  let instance = null;
  return function() {
    if (!instance) {
      instance = new Vuex();
    }
  }
})()

const v1 = Vuex.getInstance();
const v2 = Vuex.getInstance();

console.log('v1 v2', v1===v2)

/** 更优的实现 */
class SingleApple {
  constructor(name, creator, products) {
    
    if (!SingleApple.instance) {
      this.name = name;
      this.creator = creator;
      this.products = products;
      SingleApple.instance = this;
    } 

    return SingleApple.instance
  }
}

let apple1 = new SingleApple('apple', 'steve jobs', ['iphone', 'mac'])
let apple2 = new SingleApple('apple2', 'steve jobs2', ['iphone2', 'mac2'])
console.log('apple1', 'apple2',apple1 === apple2, apple1.name, apple2.name)


class Storage {
  static getInstance() {
    let instance = null;
    if (!instance) {
      instance = new Storage();
    }

    return instance;
  }


  getItem(key) {
    return localStorage.getItem(key);
  }

  setItem(key) {
    return localStorage.setItem(key)
  }
}