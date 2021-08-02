//=====简单工厂模式=====
// 构造函数
function User(name, age, career, work) {
  this.name = name;
  this.age = age;
  this.career = career;
  this.work = work;
}

// 工厂函数
function Factory(name, age, career) {
  let work;
  switch(career) {
    case 'coder':
      work = ['写代码', '写bug', '修bug'];
      break;

    case 'product_manager':
      work = ['订会议室', '写PRD', '验收'];
      break
    // 其他工种情况
    // ...

  }
  return new User(name, age, career, work)
}

//=====抽象工厂模式=====

// 抽象工厂类
class MobilePhoneFactory {
  // 操作系统
  createOS() {
    throw new Error('抽象工厂不允许直接调用，需要将此方法重写')
  }

  // 提供硬件接口
  createHardWare() {
    throw new Error('抽象工厂方法不允许直接调用, 需要重写此方法')
  }
}

// 继承抽象工厂创建fake工厂
class FakeStarFactory extends MobilePhoneFactory {

  // 重写操作系统方法
  createOS() {
    return new AndroidOS();
  }
  
  // 重写硬件接口
  createHardWare() {
    return new QualCommHardWare()
  }
}

// 抽象产品类

// 操作系统抽象产品类
class OS {
  controlHardWare() {
    throw new Error('抽象产品方法不允许直接调用，需要重写')
  }
}

// 安卓系统
class AndroidOS extends OS {
  controlHardWare() {
    console.log('我会用安卓的方式去操作硬件')
  }
}

// 苹果系统
class AppleOS extends OS {
  controlHardWare() {
    console.log('我会用IOS的方式去操作硬件')
  }
}

// 硬件抽象产品类
class HardWare {
  operateByOrder() {
    throw new Error('抽象产品方法不允许直接调用，需要重写')
  }
}

// 高通
class QualCommHardWare extends HardWare {
  operateByOrder() {
    console.log('我会用高通的方式去运转')
  }
}

// 小米
class MiWare extends HardWare {
  operateByOrder() {
    console.log('我会用小米的方式去运转')
  }
}

// 这是我的手机
// const myPhone = new FakeStarFactory()
// const myOS = myPhone.createOS();
// const myHardWare = myPhone.createHardWare();

// myOS.controlHardWare();
// myHardWare.operateByOrder();

//=====单例模式=====
class SingleDogStatic {
  show() {
    console.log('我是一个单例对象');
  }

  static getInstance() {
    if (!SingleDog.instance) {
      SingleDog.instance = new SingleDog();
    }
    return SingleDog.instance
  }
}

// 闭包实现
class SingleDog {
  show() {
    console.log('我是一个单例对象');
  }
  // 使用闭包实现
  static getInstance = (function() {
    let instance = null;
    return function() {
      if (!instance) {
        instance = new SingleDog();
      }
      return instance
    }
  })()
}

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();
console.log(s1=== s2)