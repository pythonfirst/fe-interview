## 类型

### 面试题

#### 1. 如何让 `a == 1 && a == 2 && a == 3`

```js
const a = {
	value: [3,2,1],
  valueOf: function () {return this.value.pop();}
}
```

2. undefined 和 null的区别

   一个为已经定义，但是未赋值，一个为空值null，空指针在栈内存中找不到其值地址指向。

3. 如何判断空对象

```js
JSON.stringify({}) === '{}'
```

4. ### 0.1 + 0.2 === 0.3 ？

   IEEE 754标准

   [IEEE 754 64位双精度浮点类型](https://bytedance.feishu.cn/docs/doccniZIdVuvlPiK9iZJuHIThBg#qvqgW7)

### 参考

[你真的掌握变量和类型了吗](https://juejin.cn/post/6844903854882947080)

### 说一下JavaScript中的类型

原始类型包括：number/string/boolean/undefined/null/Symbol/bigInt

引用类型：Object

### 变量在内存中的存储方式

原始类型的值都是保存在栈中，引用类型的值保存在堆中。

[堆空间和栈空间](https://time.geekbang.org/column/article/129596)

### 类型转换

#### 包装类型

Number、String、Boolean

装箱操作：将基本类型转为对应的包装类型

拆箱操作：将引用类型转为基本类型

​					从引用类型转为基本类型string，会先调用引用类型的toString，再调用valueOf方法。

​					从引用类型转为基本类型number，会先调用valueOf，再调用toString方法。

调用 `'hello.slice(0,2)`'，会先装箱，然后调用引用类型的slice方法，然后再拆箱返回基本类型，这是自动装箱和拆箱。

另外还可以手装箱和拆箱，比如：

````js
let num = new Number(123);

let num2 = num.valueOf();
let str = num.toString();
````

#### 显式类型转换

#### 隐式类型转换

##### if 语句

if 语句和逻辑语句，会将小括号中的表达式转为`Boolean`值。只有一下几种会被转为false，其他均为true：`'' null 0 undefined NaN false`

```js
if () {}
```

##### 各种数学运算符

###### +

1.当一侧为`String`类型，被识别为字符串拼接，并会优先将另一侧转换为字符串类型。

2.当一侧为`Number`类型，另一侧为原始类型，则将原始类型转换为`Number`类型。

3.当一侧为`Number`类型，另一侧为引用类型，将引用类型和`Number`类型转换成字符串后拼接。

```js
+'123' // 123 string => number
'4' + 5 // '45' =>string
4+true // 5 => Number
5+{} // '5[ojbect object]' => toString
```

###### ==

1. NaN

```js
NaN == NaN // false 狠起来连自己都杀的人，和任何值比较都返回false

```

2. Boolean

Boolean`和其他任何类型比较，`Boolean`首先被转换为`Number类型。

```js
true == 1  // true 
true == '2'  // false
true == ['1']  // true
true == ['2']  // false

false == undefined // false false => 0然后和undefined比较
false == null // false 
```

3. string == number

首先将string=>number

```js
'123' == 123 // true
'abc' == 123 // false
'' == 0 // true
```

4. null == undefined

null == undefined 为true，除此之外null 和undefined任何值比较都为false

```js
null == undefined // true
```

5. 原始类型和引用类型

当原始类型和引用类型做比较时，对象类型会依照`ToPrimitive`规则转换为原始类型

```js
'[object Object]' == {} // true
'1,2,3' == [1, 2, 3] // true

[] == ![] // true ![] => false => 0; [] => 0 0 === 0 => true

```

#### 语言分类

编程语言可以分为静态动态语言以及强类型和弱类型。动态和静态的切入点为是在变量声明时是否指定类型，强类型和弱类型的切入点为是否允许进行隐式类型转换，即在运行过程中是否需要检查数据类型。

更详细的了解可以参考[编程语言按照类型分类](/Users/bytedance/Desktop/interview-log/javascript/文档/引用/静态类型与动态类型的区别.md)

### 类型判断

| 类型      | typeof (所有结果均为string类型) | 备注                                         |
| :-------- | ------------------------------- | -------------------------------------------- |
| String    | 'string'                        |                                              |
| Number    | 'number'                        |                                              |
| Boolean   | 'boolean'                       |                                              |
| undefined | 'undefined'                     |                                              |
| null      | **'object'**                    |                                              |
| BigInt    | 'bigint'                        | 可以在一行数字之后加n表示bigint：1234n       |
| Symbol    | 'symbol'                        | Symbol(5)                                    |
| Object    | 'object'                        |                                              |
| Function  | 'function'                      | 函数属于Object，但是typeof 返回值为 function |

#### 判断是否为数组

##### toString

```js
// 没有局限性
function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]'
}

const arr = [1,2]

console.log(isArray(arr));
```

instanceOf

```js
// 具有局限性：不同页面的引用地址Array的堆地址是不同的。
function isArray(o) {
    return o instanceof Array
}

const arr = [1,2]

console.log(isArray(arr));
```

##### Array.isArray()

```js
// ES6新方法，考虑兼容性
function isArray(o) {
    return Array.isArray(arr)
}

const arr = [1,2]

console.log(isArray(arr));
```

##### 参考

[Array.isArray()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

### number 类型

### 垃圾回收机制

### 内存泄漏

### 堆栈溢出

## this

### 面试题

### 默认绑定

非严格模式下，this指向的全局对象window，严格模式下this指向undefined；

开启了严格模式，使得函数内的this指向undefined，并不会改变全局中的this的指向。

### 隐式绑定

**this永远指向最后调用它的那个对象** 谁最后调用的函数，函数内的this指向的就是谁（不考虑箭头函数）

### 隐式绑定的隐式丢失问题

有两种情况容易发生隐式丢失问题：

- 使用另一个变量来给函数取别名
- 将函数作为参数传递时会被隐式赋值，回调函数丢失this绑定

所以说，如果你把一个函数当成参数传递到另一个函数的时候，也会发生隐式丢失的问题，且与包裹着它的函数的this指向无关。在非严格模式下，会把该函数的this绑定到window上，严格模式下绑定到undefined。

### 显式绑定

apply bind call（对箭头函数无效）

### new 绑定

### 箭头函数绑定

箭头函数的this由外层作用域决定的，且指向函数定义时的this，而非执行时。

显示绑定中的apply bind call 对箭头函数无效

### 参考

[再来40道this面试题酸爽继续(1.2w字用手整理)](https://juejin.cn/post/6844904083707396109)

[this、apply、call、bind](https://juejin.cn/post/6844903496253177863)

[11 | this：从JavaScript执行上下文的视角讲清楚this](https://time.geekbang.org/column/article/128427)]

## JavaScript三座大山

### 作用域&闭包

#### 作用域

词法作用域：函数的作用域在函数定义的时候确定；

动态作用域：函数的作用域在函数调用的时候确定；

[JavaScript深入之词法作用域和动态作用域 #3](https://github.com/mqyqingfeng/Blog/issues/3)

#### 闭包

能够访问自由变量的函数为闭包，或者函数访问了外部函数的变量。应用角度来讲：函数被返回或者作为参数传递为闭包。

闭包中引用的外部的变量存放在堆空间中

[JavaScript深入之闭包 #9](https://github.com/mqyqingfeng/Blog/issues/9)

### 原型链&继承

#### 原型链

[JavaScript深入之从原型到原型链 ](https://github.com/mqyqingfeng/Blog/issues/2)

#### 继承

[JavaScript深入之继承的多种方式和优缺点 #16](https://github.com/mqyqingfeng/Blog/issues/16)

### 异步

## 事件循环

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

### 面试题

#### 从输入url到页面显示，这个过程发生了什么

### 进程和线程有什么区别

hello

### 跨域

### V8引擎

## 性能优化

### 常见指标

### 优化方式

## 设计模式

### 单例模式

### 观察者模式

### 发布订阅模式

## TypeScript

### 为什么要用TypeScript

## 编码题

### 数组去重

### 数组扁平化

### 类数组转为数组

#### slice

```js
let arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 };
const arr = Array.prototype.slice.call(arrayLike);
```

#### Array.from（ES6)

```js
let arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 };

const arr = Array.from(arrayLike, e=> e+'1');
```

### 函数柯里化

[「前端进阶」彻底弄懂函数柯里化](https://juejin.cn/post/6844903882208837645)

[从一道面试题认识函数柯里化](https://juejin.cn/post/6844903665308794888)

```js
/**
 * 柯里化-支持传不固定参数;
 * -function.length: 函数形参数量
 * @param {*} func 
 * @param {*} args 
 * @returns 
 */
function curry(func, args) {
	const length = func.length;
	args = args|| [];

	return function () {
		newArgs = args.concat([].slice.call(arguments));

		if (newArgs.length >= length) {

			return func.apply(this, newArgs)
		} else {
			return curry.call(this, func, newArgs)
		}
	}
}
```

### 链式调用

### 实现parseUrl

[套路满满的parseUrl](https://juejin.cn/post/6844904135452524552)

### 懒加载

### 防抖

[JavaScript专题之跟着underscore学防抖](https://github.com/mqyqingfeng/Blog/issues/22#)

```js

/**
 * 1. 返回一个函数
 * 2. 函数内存在settimeout,settimeout延迟支持原函数
 * 3. 支持绑定原this
 * 4. 支持原生events对象
 * 5. 立刻执行，ns后才能触发
 * 6. 返回值
 * 7. 取消
 * @param {*} func 回调函数
 * @param {*} wait 等待时长
 * @param {Boolean} immediate 是否立即执行
 * @returns 
 */
function debounce(func, wait, immediate=false) {
	let timeout, result;

	const debouned = function() {
		let self = this;
		const args = arguments;
	
     // 运行前先取消
		if (timeout) clearTimeout(timeout)
		// 立即执行	
		if (immediate) {
			let callNow = !timeout;
			
			timeout = setTimeout(() => {
				timeout = null;
			}, wait)

			if (callNow) {
				result = func.apply(self, args)
				return result;
			}
		} else {
			// 非立即执行
			timeout = setTimeout(func.bind(self, ...args), wait);
		}

		// 支持取消
		debouned.cancel = function() {
			clearTimeout(timeout);
			timeout = null;
		}

		// 返回函数执行结果
		return result
	}
	return debouned
}
```

### 截流

```js
/**
 * 截流：固定时间段内只执行一次

 * @param {*} func 
 * @param {*} wait 等待时间
 * @param {leading, trailing} options 
 * @returns 
 */
function throttle(func, wait, options={}) {
	let timeout
	let previous = 0;
	let self;
	let args;

	function later() {
		previous = +new Date();
		timeout = null;
		func.apply(self, args);
	}
	const throttled = function() {
		self = this;
		args = arguments;
		const now = +new Date();

		if (!previous && options.leading === false) previous = now;

		// 用于停止触发后，判断trailing的触发事件；
		const remain = wait - ( now - previous);

		if (remain <=0 || remain > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			func.apply(self, args)
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remain);
		}
	}

	return throttled
}
```

### 实现Event（eventBus)

### 实现promise

[从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469)

### 实现call&apply&bind

### call

```js
/**
 * 1. 绑定this为接收的第一个参数
 * 2. 接收其余参数作为绑定函数的参数
 * 3. 函数具有返回值
 * 4. 兼容传入的参数为nul的情况 // node 为global，browser为window
 * @param {*} context 
 */
Function.prototype.call2 = function (context) {
	// 如果第一个参数传入null,则this为window
	context = context || window;
	// 将参数提取为数组
	const args = Array.from(arguments).slice(1) // 如果要求不使用ES6，可以用for循环
	// 将调用的函数this添加为context的方法
	context.fn = this;

	// 在context上调用该方法并返回该函数返回值
	const res = context.fn(...args);
	// 删除该对象上临时添加的方法
	delete context.fn;

	return res;
}
```

### apply

```js
Function.prototype.apply2 = function (context) {
	// 如果第一个参数传入null,则this为window
	context = context || global;
	// 将调用函数的参数取出来
	const arr = arguments[1];
	// 将调用的函数this添加为context的方法
	context.fn = this;
	// 在context上调用该方法并返回该函数返回值
	const res = context.fn(...arr);
	// 删除该对象上临时添加的方法
	delete context.fn;

	return res;
}

```

### bind

```js

/**
 * 1. 返回一个函数
 * 2. 返回的函数绑定制定this
 * 3. 支持不固定参数
 * 4. 支持使用new创建
 * 4.1 支持继承绑定函数原型的属性。
 * @param {*} context 
 * @returns 
 */
/**
 * 1. 返回一个函数
 * 2. 接收不固定参数
 * 3. 能够兼容作为构造函数
 * 4. 支持调用的非函数报错
 * @param {*} context 
 */
Function.prototype.bind2 = function(context) {

		if (typeof this !== 'function') {
			return new Error('请使用函数调用')
		}
		const self = this;

		const args = Array.prototype.slice.call(arguments).slice(1);

		function fBind() {
			const bindArgs = Array.prototype.slice.call(arguments);
			
     	// 支持具有返回值
			return self.apply(this instanceof fBind ? this : context, args.concat(bindArgs))
		}

		const fNOP = function(){}
		fNOP.prototype  = self.prototype;
		fBind.prototype = new fNOP();

		return fBind;
}

```



### 实现new

```js
/**
 * 1. 创建一个空对象
 * 2. 从参数重拿到构造函数
 * 3. 将空对象原型指向构造函数原型
 * 4. apply执行构造函数
 * 5. 返回执行结果？如果为object 则返回，非ojbect返回新对象
 * @returns 
 */
function objectFactory() {
	var obj = new Object();

	// 弹出第一个构造函数参数；
	const Construtor = Array.prototype.shift.call(arguments);

	// 绑定新对象的原型到构造函数的原型，这样对象可以访问构造函数原型中的属性；
	obj.__proto__ = Construtor.prototype;

	// 执行构造函数
	const res = Construtor.apply(obj, arguments)

	return typeof res === 'object' ? res : obj
}
```

### 实现Object.create()

```js
function create(o) {
	function f() {};
	f.prototype = o;
	return new f();
}
```

### 判断两个对象是否相等

### 深拷贝&浅拷贝

#### 浅拷贝

##### 数组

###### Array.prototype.slice()

```js
const arr = [1, { a: 'a', b: 'b'}, [3, 4, 5]];

const shallowCopy = arr.slice();

shallowCopyArr[1].b = 'bbbbb';
console.log(arr, shallowCopyArr);
```

###### Array.prototype.concat()

```js
const arr = [1, { a: 'a', b: 'b'}, [3, 4, 5]]

const shallowCopyArr = arr.concat();

shallowCopyArr[1].b = 'bbbbb'
console.log(arr, shallowCopyArr);
```

###### Array.from(ES6)

```js
const arr = [1, { a: 'a', b: 'b'}, [3, 4, 5]]

const shallowCopyArr = Array.from(arr);

shallowCopyArr[1].b = 'bbbbb'

console.log(arr, shallowCopyArr);
```

###### [...rest]

```js
const arr = [1, { a: 'a', b: 'b'}, [3, 4, 5]]

const [...shallowCopyArr = arr

shallowCopyArr[1].b = 'bbbbb'

console.log(arr, shallowCopyArr);
```

##### 对象

###### 递归

```js
/**
 * 对象浅拷贝
 * @param {*} obj 
 */
function shallowCopy(obj) {
    // 判断参数是否为对象
    if (typeof obj !== 'object' || obj === null) return;

    const copy = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        // 遍历obj的自身属性，原型上的属性不拷贝
        if (obj.hasOwnProperty(key)) {
            copy[key] = obj[key]
        }
    }
    return copy
}

const arr = [1,2,3]
const obj = { a: 'a', b: 'b'}

const arrC = shallowCopy(arr);
const objC = shallowCopy(obj)
arrC[1] = 5
objC.b = 'c'
console.log(arr, arrC, obj, objC);
```

#### 深拷贝

##### 数组

###### JSON.stringfy()

```js
const arr = [1, { a: 'a', b: 'b'}, [3, 4, 5]]

const shallowCopyArr = JSON.parse(JSON.stringify(arr))

shallowCopyArr[1].b = 'bbbbb'
console.log(arr, shallowCopyArr);
```

##### 对象

###### 递归

此版本缺点：没有考虑 DOM对象、正则对象、时间对象，没有考虑循环引用的问题

````js

/**
 * 对象深拷贝
 * @param {*} obj 
 */
function deepCopy(obj) {
    // 判断参数是否为对象
    if (typeof obj !== 'object' || obj === null) return;

    const copy = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        // 遍历obj的自身属性，原型上的属性不拷贝
        if (obj.hasOwnProperty(key)) {
            copy[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return copy
}

const arr = [1,2,3]
const obj = { a: 'a', b: 'b', c: { d: 'd'}}

const arrC = deepCopy(arr);
const objC = deepCopy(obj)
arrC[1] = 5
objC.c.d = 'c'

console.log(arr, arrC, obj, objC);
````

###### 递归2

优点：兼容DOM、正则、Date

缺点：没有考虑循环引用

```js
function deepclone(obj) {

    const _toString = Object.prototype.toString;

    // 先校验是否为对象
    if (typeof obj !== 'object' || obj === null) return obj;

    // 校验DOM
    if (obj.noteType && 'cloneNode' in obj) {
        return obj.cloneNode(true);
    }

    // 校验Date
    if (_toString(obj) === '[object Date]') {
        return new Date(obj.getTime())
    }

    // 校验Regex
    if (_toString(obj) === '[object RegExp]') {
        var flags = [];

        if (obj.global) { flags.push('g')};
        if (obj.multiline) { flags.push('m')};
        if (obj.ignoreCase) { flags.push('i')}

        return new RegExp(obj.source, flags.join(''))
    }

    // 普通对象
    let result = Array.isArray(obj) ? [] : {};

    for (let k in obj) {
        if (obj.hasOwnProperty(k)) [
            result[k] = deepclone(obj[k])
        ]
    }

    return result;
}

const arr = [1, { a: 'a', b: 'b', c: {d: 'd'}}]

const arrC = deepclone(arr)
arrC[1].c.d = 'f'
console.log(arr, arrC)


```

###### 递归3

优点：兼容DOM/Regex/Date & 兼容循环引用（环）

缺点：性能较差，比如for...in 会遍历原型上的对象

要点：增加一个map来存储已经clone的对象，key为原始对象，value为clone后的对象，每次遇到对象先去查一遍是否已经clone过，如果clone直接返回clone的对象。

```js
function deepclone(obj, map = new Map()) {

    const _toString = Object.prototype.toString;

    // 先校验是否为对象
    if (typeof obj !== 'object' || obj === null) return obj;

    // 兼容循环引用
    if (map.get(obj)) {
        return map.get(obj);
    }
    let copyObj
    // 校验DOM
    if (obj.nodeType && 'cloneNode' in obj) {
        copyObj = obj.cloneNode(true);
    } else if (_toString(obj) === '[object Date]') {
        // 校验date
        copyObj = new Date(obj.getTime())
    } else if (_toString(obj) === '[object RegExp]') {
        // 兼容正则
        var flags = [];
        if (obj.global) { flags.push('g')};
        if (obj.multiline) { flags.push('m')};
        if (obj.ignoreCase) { flags.push('i')};

        copyObj = new RegExp(obj.source, flags.join(''))
    } else {
        // 普通对象
        copyObj = Array.isArray(obj) ? [] : {};
        map.set(obj, copyObj)
        for (let k in obj) {
            if (obj.hasOwnProperty(k)) [
                copyObj[k] = deepclone(obj[k], map)
            ]
        }
    }
    return copyObj
}

const arr = [1, { a: 'a', b: 'b', c: {d: 'd'},}]

arr[1].e = arr;
const arrC = deepclone(arr)
arrC[1].c.d = 'f'
console.log(arr, arrC)

```

###### 递归4(weakMap)

将递归4中的`new map()` 改为`new WeakMap()`能够有效减少内存的使用，及时释放内存，触发垃圾回收机制

```js
function deepclone(obj,  map = new WeakMap()) {
   // 这里代码同递归3
}
```

###### 递归5(性能优化)

forEach循环代替for...in迭代，提高性能。

for...in迭代会迭代出原型上的属性。

```js
function deepclone(obj, map = new WeakMap()) {

    const _toString = Object.prototype.toString;

    // 先校验是否为对象
    if (typeof obj !== 'object' || obj === null) return obj;

    // 兼容循环引用
    if (map.get(obj)) {
        return map.get(obj);
    }
    let copyObj
    // 校验DOM
    if (obj.nodeType && 'cloneNode' in obj) {
        copyObj = obj.cloneNode(true);
    } else if (_toString(obj) === '[object Date]') {
        // 校验date
        copyObj = new Date(obj.getTime())
    } else if (_toString(obj) === '[object RegExp]') {
        // 兼容正则
        var flags = [];
        if (obj.global) { flags.push('g')};
        if (obj.multiline) { flags.push('m')};
        if (obj.ignoreCase) { flags.push('i')};

        copyObj = new RegExp(obj.source, flags.join(''))
    } else {
        // 普通对象
        copyObj = Array.isArray(obj) ? [] : {};
        map.set(obj, copyObj)
				// forEach 代替for...in 遍历
        if (Array.isArray(obj)) {
            obj.forEach((e, k) => {
                copyObj[k] = typeof obj[k] !== 'object' ? obj[k] : deepclone(obj[k], map);
            })
        } else {
            Object.keys(obj).forEach(k => {
                copyObj[k] = typeof obj[k] !== 'object' ? obj[k] : deepclone(obj[k], map);
            })
        }
    }
    return copyObj
}

const arr = [1, { a: 'a', b: 'b', c: {d: 'd'},}]

arr[1].e = arr;
const arrC = deepclone(arr)
arrC[1].c.d = 'f'
console.log(arr, arrC)

```

递归6（支持 Set Map)

优点：支持map set数据结构、提炼出类型函数，使代码更易读

```js
function deepclone(obj, map = new WeakMap()) {

    function getType(obj) {
        const _toString = Object.prototype.toString;
        const _type = _toString(obj);

        if (obj.nodeType && 'cloneNode' in obj) return 'node'
        switch(_type) {
            case '[object Date]':
                return 'date';
            case '[object RegExp]':
                return 'regExp';
            case '[object Map]':
                return 'map';
            case '[object Set]':
                return 'set';
            default:
                return Array.isArray(obj) ? 'array' : 'object';
        }
    }

    // 先校验是否为对象
    if (typeof obj !== 'object' || obj === null) return obj;

    // 兼容循环引用
    if (map.get(obj)) {
        return map.get(obj);
    }
    let copyObj
    const type = getType(obj)

    // 处理DOM
    if (type === 'node') {
        copyObj = obj.cloneNode(true);
    } else if (type === 'date') {
        // 处理date
        copyObj = new Date(obj.getTime())
    } else if (type === 'regExp') {
        // 兼容正则
        var flags = [];
        if (obj.global) { flags.push('g')};
        if (obj.multiline) { flags.push('m')};
        if (obj.ignoreCase) { flags.push('i')};

        copyObj = new RegExp(obj.source, flags.join(''))
    } else {
        // 普通对象
        copyObj = Array.isArray(obj) ? [] : {};
        map.set(obj, copyObj)
        if (type === 'array' || type === 'set' || type === 'map') {
            obj.forEach((e, k) => {
                copyObj[k] = typeof e !== 'object' ? e : deepclone(e, map);
            })
        } else {
            Object.keys(obj).forEach(k => {
                copyObj[k] = typeof obj[k] !== 'object' ? obj[k] : deepclone(obj[k], map);
            })
        }
    }
    return copyObj
}

const arr = [1, { a: 'a', b: 'b', c: {d: 'd'}, g: new Map([[true,1],[ false, 2]]), h: new Set([1,2,3]) }]

arr[1].e = arr;
const arrC = deepclone(arr)
arrC[1].c.d = 'f'
console.log(arr, arrC)

```

#### promise 包装ajax

版本1

```js
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

版本2

```js
function request(method='GET', url) {
	return new Promise((resolved, rejected) => {
		const xhr = new XMLHttpRequest();

		xhr.open(method, url)
		xhr.send();

		xhr.onload = handler

		xhr.onerror = handler


		function handler() {
			if (this.readyState !==4) return;

			if (this.status === 200) {
				resolved(this.response.slice)
			} else {
				rejected(this.status)
			}
		}
	})
}

request('GET', 'https://juejin.cn/api/get')
.then(res => {
	console.log('res', res);
})
.catch(err => {
	console.log('err', err);
})
```



#### 参考

[ MDN-cloneNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)

[MDN-getTime](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)

[MDN-regexp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

[github-深浅拷贝](https://github.com/mqyqingfeng/Blog/issues/32)

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

[要就来45道Promise面试题一次爽到底(1.1w字用心整理)](https://juejin.cn/post/6844904077537574919)

#### 参考



## 进程&线程

## Browser & Node

面试题链接汇总

[链接1](https://github.com/pythonfirst/StudyNotes)

















