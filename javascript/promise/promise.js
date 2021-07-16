// 封装setTimeout
const wait = ms => new Promise(resolve => setTimeout(() => {
  resolve()}, ms));

let i = 0
const callBack = () => {
  i++;
  console.log(i)
}

const sleep = async callBack => {
  await wait(3000).then(callBack);
  sleep(callBack)
}

sleep(callBack)