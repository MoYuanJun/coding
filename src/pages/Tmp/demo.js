// 例一

// const obj = new Proxy({}, {
//   get: (target, propKey, receiver) => {
//     console.log(`getting ${propKey}!`);
//     return Reflect.get(target, propKey, receiver);
//   },
//   set: (target, propKey, value, receiver) => {
//     console.log(`setting ${propKey}!`);
//     return Reflect.set(target, propKey, value, receiver);
//   },
// });

// obj.name = 'qy';
// obj.name;   // qy


// 例二
// const obj = new Proxy({}, {
//   get: (target, propKey) => 35,
// });

// obj.title; // 35
// obj.name; // 35
// obj.time; // 35

// 例三
// const target = {};
// const handler = {};
// const proxy = new Proxy(target, handler);

// proxy.name = 'qy';
// target.name;  // qy

// 例四
// const proxy = new Proxy({}, {
//   get: (target, propKey) => 35,
// });

// const obj = Object.create(proxy);
// obj.name;  // 35

// 例五
const handler = {
  get: (target, propKey) => (propKey === 'prototype'
    ? Object.prototype
    : `Hello ${propKey}`
  ),

  apply: (target, thisBinding, args) => args[0],
};

const fproxy = new Proxy((x, y) => x + y, handler);

console.log(fproxy(1, 2)); // 1

console.log(fproxy.prototype === Object.prototype); // true

console.log(fproxy.foo === 'Hello foo'); // true
