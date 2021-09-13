# 判断一个字符是否属于[a-z][A-Z][0-9]

```javascript
function isValid(s) {
    return ( 'a' <= s && s <= 'z') || ('A' <= s && s <= "Z" ) || ('0' <= s && s <= '9')
}
```

# 翻转字符串

```javascript
function reverse(s) {
    return s.split('').reverse().join('')
}
```

