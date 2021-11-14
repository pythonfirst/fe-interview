(function(window) {
  // 数据
  let data = 'IIFE module data';

  //操作数据的函数
  function foo() {
    // 用于暴露的函数
    console.log(`foo() ${data}`);
  }

  function bar() {
    // 用于暴露的函数
    console.log(`bar() ${data}`);
    otherFun(); //内部调用
  }

  function otherFun() {
    // 内部私有的函数
    console.log('privateFunction go otherFun()');
  }
  

  window.module = { foo, bar}

})(window)