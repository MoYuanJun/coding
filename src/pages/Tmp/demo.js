const fun = (str, mode) => {
  let curr = 0;     // 当前指针位置
  const modeArr = mode.match(/([a-z.]\*)|([a-z.]+(?=[a-z.]\*|$))/g);

  if (!modeArr) {
    return false;
  }
  modeArr.forEach(ele => {
    if (ele[1] === '*') {
      // * 模式匹配
      while (ele[0]) {
        if (str[curr] !== ele[0]) {
          break;
        }
        curr += 1;
      }
    } else {
      // 无模式匹配
      for (const v of ele) {
        if (!v !== '.' || v !== str[curr]) {
          return false;
        }
        curr += 1;
      }
    }
    return curr === str.length;
  });
};

fun('ab', 'a..*.');
