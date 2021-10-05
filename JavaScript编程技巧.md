## 判断一个字符是否属于[a-z][A-Z][0-9]

```javascript
function isValid(s) {
    return ( 'a' <= s && s <= 'z') || ('A' <= s && s <= "Z" ) || ('0' <= s && s <= '9')
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

