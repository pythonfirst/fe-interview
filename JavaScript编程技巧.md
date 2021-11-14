## 判断一个字符是否属于[a-z][A-Z][0-9]

方法1

```javascript
function isValid(s) {
    return ( 'a' <= s && s <= 'z') || ('A' <= s && s <= "Z" ) || ('0' <= s && s <= '9')
}

```

方法2 (正则)

```js
function isValid(c) {
   const re = /([a-z]|[A-Z]|[0-9])/
   return re.test(c)
}
```



## 翻转字符串

```javascript
function reverse(s) {
    return s.split('').reverse().join('')
}
```

## 判断一个数是否为奇数/偶数

```javascript
// 判断是否为偶数
function isOdd(num) {
	return num&1 === 1;
}

// 判断是否为奇数
function isEven(num) {
	return !num&1 
}
```

## 生成l1*l2的二维数组

```javascript
// 生成l1*l2的二维数组
function generateArr(l1, l2) {
	return new Array(l1).fill(0).map(() => new Array(l2).fill(0))
}

// Array.from
const dp = Array.from(Array(l1), () => Array(l2).fill(0));
```

## 二维数组进行排序

要求：使数组第一个元素按照升序排列，数组第二个元素使用降序排列。



## 交换数组两个位置元素

```js
// 1. 不使用临时变量
[arr[i], arr[j]] = [arr[j], arr[i]]

// 2. 使用临时变量
const temp = arr[i];
arr[i] = arr[j];
arr[j] = temp;
```





















