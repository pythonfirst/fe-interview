## 类型

### 说一下JavaScript中的类型

原始类型：

引用类型：

### 变量在内存中的存贮方式

### 类型转换

#### 强类型&弱类型

#### 静态语言& 动态语言

## this

### 箭头函数中的this

## JavaScript三座大山

### 闭包

### 异步

### 事件循环

实际上事件循环属于宿主环境，不属于JavaScript

## 工程化

### webpack

### vite&ES module

### ESModule&CommonJS&CMD

## 框架

### Vue

#### 核心原理

##### 响应式原理

##### DOM diff 原理

### React

## 网络协议

### HTTP

### HTTP 1.1

### HTTPs

### HTTP2&HTTP3

### tcp/ip

## 安全

### XSS

### xsrf

v-html为什么会对安全构成隐患

## 编码

asicII

base64

Utf-8

decodeURI

## 浏览器原理

## 性能优化

## 设计模式

### 单例模式

### 观察者模式

### 发布订阅模式

### 常见指标

### 优化方式

## 编码题

### 数组去重

### 函数柯里化

### 解析url参数

### 懒加载

### 防抖

### 截流

### 实现call&apply&bind

## 技术方案

### 微前端

### 埋点方案

### 异常监控方案sladar

## 算法与数据结构

### 数据结构

#### 字符串

#### 数组

#### 链表

#### 队列&栈

#### 二叉树

#### 哈希表&哈希集合

### 算法

#### 二分查找

#### 排序算法

#### 贪心算法

#### 递归与回溯

#### 动态规划

## 使用promise包装一个XMLHttpRequest

```javascript
/**
     * promise 封装XMLHttpRequest
     */
    function fetch(url, method="GET") {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = () => {
          resolve(xhr.responseText)
        }
        xhr.onerror = () => {
          reject(xhr.statusText)
        }

        xhr.send();
      })
    } 

  fetch('https://mdn.github.io/js-examples/promises-test/myLittleVader.jpg', 'GET')
  .then(res => {
    console.log('res', res)
  })
```

## 事件循环（Event Loop）

提起JavaScript我们会想起来这些特点：单线程、非阻塞、异步、并发的语言。还有调用栈、事件循环、回调队列、一些API以及其他东西。

## V8&宿主环境

### Browser & Node 

事件循环并不存在于V8中，而是由宿主环境提供的。更确切的可以这么说：调用栈（stack）是JavaScript引擎的（V8），任务队列（task queue）是宿主环境提供的（browser || Node）。

### 调用栈

- [ ] 画图模拟下面的调用栈执行过程
- [ ] 复制到浏览器查看错误调用栈信息

```javascript
// 复制到浏览器，看到浏览器打印的错误调用栈信息
function foo() {
    throw new Error('Oops');
}

function bar() {
    foo();
}

function baz() {
    bar();
}

baz()
```

#### 堆栈溢出

```js
function foo() {
    return foo()
}

foo();
```

## 阻塞&非阻塞（blocking）

阻塞是调用栈中执行很慢的代码。当调用栈中有执行耗时的任务时，会阻塞调用栈中其他的代码执行。

### 回调（callback）

回调是在未来某个时刻进步任务队列（task queue）的异步回调。

5s后执行回调。

```javascript
console.log(1);

setTimeout(() => {
    console.log(2)
}, 5000)

console.log(3) 

// 1
// 3
// 2
```

0s后执行回调

事件循环必须要等栈清空才能将任务队列中的回调压入栈执行。

```js
console.log(1);

setTimeout(() => {
    console.log(2)
}, 0)

console.log(3) 

// 1
// 3
// 2
```

setTimeout(cb, 1000)真正含义并不是1s之后运行，而是最快1s之后运行。

setTimeout 的特性同样适用于Ajax。

异步回调



### Promise

## 进程&线程

## Browser & Node



















