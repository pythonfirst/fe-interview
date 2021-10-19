const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
/**
 * 框架：
 * 三个变量：state/callbacks/data
 * 两个方法：resolve/reject
 * 立即执行
 * 微任务执行
 * @param {*} executor 
 */
function MyPromise(executor) {

  this.state = PENDING;
  this.onFulfilledCallback = [];
  this.onRejectedCallback = [];
  const self = this;

  function resolve(value) {
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = FULFILLED;
        self.data = value;

        for (let i=0; i<self.onFulfilledCallback.length; i++) {
          self.onFulfilledCallback[i](value)
        }
      }
    });
  }

  function reject(reason) {
    setTimeout(() => {
      if (self.state === PENDING) {
          self.state = REJECTED;
          self.data = reason;

          for (let i=0; i<self.onRejectedCallback.length; i++) {
            self.onRejectedCallback[i](reason)
          }
      }
    });
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason)
  }

}

/**
 * 框架：
 * 三个状态: fulfilled/rejected/pending
 * 返回一个promise
 * try catch
 * 微任务
 * @param {*} onFulfilled 
 * @param {*} onRejected 
 */
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const self = this;

  let promise2 = new MyPromise((resolve, reject) => {
    if (self.state === FULFILLED) {
      setTimeout(() => {
        if (typeof onFulfilled === 'function') {
          try {
            const x = onFulfilled(self.data);
            promiseResolutionProcedure(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        } else {
          resolve(self.data)
        }
      });
    }
  
    else if (self.state === REJECTED) {
      setTimeout(() => {
        if (typeof onRejected === 'function') {
          try {
            const x = onRejected(self.data);
            promiseResolutionProcedure(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        } else {
          reject(self.data)
        }
      });
    }
  
    else if (self.state === PENDING) {
      self.onFulfilledCallback.push(function(promise1Value) {
        if (typeof onFulfilled === 'function') {
          try {
            const x = onFulfilled(self.data);
            promiseResolutionProcedure(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        } else  {
          resolve(promise1Value)
        }
      })
  
      self.onRejectedCallback.push(function(promise1Reason) {
        if (typeof onRejected === 'function') {
          try {
            const x = onRejected(self.data);
            promiseResolutionProcedure(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        } else {
          reject(promise1Reason)
        }
      })
    }
  })

  return promise2
}

/**
 * 框架：
 * 1. 判断返回值x 是否为自身
 * 2. 判断是否为MyPromise 实例
 * 3. 判断是否为函数或者对象
 * 
 * @param {*} promise2 
 * @param {*} x 
 * @param {*} resolve 
 * @param {*} reject 
 */
// function promiseResolutionProcedure(promise2, x, resolve, reject) {

//   if (x === promise2) {
//     reject( new TypeError('Chain cycle detected'))
//   }

//   // 判断x的状态
//   if (x instanceof MyPromise) {
//     if (x.state === PENDING) {
//       x.then(function(value) {
//         promiseResolutionProcedure(promise2, value, resolve, reject)
//       })
//     }

//     else if (x.state === FULFILLED) {
//       resolve(x.data)
//     }

//     else if (x.state === REJECTED) {
//       reject(x.data)
//     }
//     return
//   }

//   if (x && (typeof x === 'object' || typeof x === 'function')) {
//     let isCalled = false;

//     try {
//       let then = x.then;

//       if (typeof then === 'function') {
//         x.then.call(
//           x,
//           function resolvePromise(y) {
//             if (isCalled) return;
//             isCalled = true;
//             return promiseResolutionProcedure(promise2, y, resolve, reject)
//           },
//           function rejectPromise(r) {
//             if (isCalled) return;
//             isCalled = true;
//             return reject(r)
//           }
//         )
//       } else {
//         if (isCalled) return;
//         isCalled = true;
//         resolve(x)
//       }

//     } catch (e) {
//       if (isCalled) return;
//       isCalled = true;
//       reject(e)
//     }
//   }

//   else {
//     resolve(x)
//   }
// }
function promiseResolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  if (x instanceof Promise) {
    if (x.state === "pending") {
      x.then(function (value) {
        promiseResolutionProcedure(promise2, value, resolve, reject);
      }, reject);
    } else if (x.state === "fulfilled") {
      resolve(x.data);
    } else if (x.state === "rejected") {
      reject(x.data);
    }
    return;
  }

  if (x && (typeof x === "object" || typeof x === "function")) {
    let isCalled = false;

    try {
      let then = x.then;

      if (typeof then === "function") {
        then.call(
          x,
          function resolvePromise(y) {
            if (isCalled) return;
            isCalled = true;
            return promiseResolutionProcedure(promise2, y, resolve, reject);
          },
          function rejectPromise(r) {
            if (isCalled) return;
            isCalled = true;
            return reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (isCalled) return;
      isCalled = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}


MyPromise.resolve = function(value) {
  return new MyPromise((resolve, reject) => {
    resolve(value)
  })
}

MyPromise.reject = function(reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason)
  })
}

MyPromise.all = function(promises) {
  const  res = [];
  let i=0;
  function processData(index, data, resolve) {
    res[index] =data;
    if (i === promises.length) {
      resolve(res)
    }
    i++
  }
  return new MyPromise((resolve, reject) => {
    for (let i=0; i<promises.length; i++) {
      promises[i].then(value => {
        processData(i, value,resolve)
      }, reject)
    }
  })
}

MyPromise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i=0; i<promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}

MyPromise.prototype.catch = function(callback) {
  return this.then(null,callback)
}

MyPromise.prototype.finally = function(callback) {
  return this.then(value => {
    return MyPromise.resolve(callback()).then(() => value)
  }, reason => {
    return MyPromise.resolve(callback()).then(() => {throw reason})
  })
}


// const promise1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('success')
//     reject('err')
//   }, (1500));
// })

// promise1
// .then(value => {
//   console.log('promise1 then1 value', value);
//   return value
// }, reason => {
//   console.log('promise1 then1 reason', reason)
//   return reason
// })
// .then(value => {
//   console.log('promise1 then2 value', value);
// }, reason => {
//   console.log('promise1 then2 reason', reason)
// })

module.exports = MyPromise