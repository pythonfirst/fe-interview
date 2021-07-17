1. 使用promise包装一个XMLHttpRequest

```javascript
/**
     * promise 封装XMLHttpRequest
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

