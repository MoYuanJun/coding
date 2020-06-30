const validator = {
  set: (obj, prop, value) => {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('年龄必须是整数!');
      }

      if (value > 200) {
        throw new RangeError('年龄不可大于 200!');
      }
      obj[prop] = value;
    }
  },
};

const person = new Proxy({}, validator);

person.age = 18;
person.age;        // 18

person.age = 11.1; // 抛错: 年龄必须是整数!
person.age = 222;  // 抛错: 年龄不可大于 200!
