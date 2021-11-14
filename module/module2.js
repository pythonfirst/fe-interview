let data2 = 'module two data';

function foo() {
  //与模块1中的函数冲突了
  console.log(`foo() ${data2}`);
}