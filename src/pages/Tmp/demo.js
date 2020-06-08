
const matchSubStr = subStr => {
  const reg = /(?<first>(?<firstSub>[01])\k<firstSub>*)/;

  const { groups: { first, firstSub } } = reg.exec(subStr);

  reg.compile(`(?<second>${firstSub === '0' ? '1' : '0'}{${first.length}})`);

  const { groups: { second } } = reg.exec(subStr) || { groups: {} };

  return second ? `${first}${second}` : null;
};

const countSubStr = str => {
  const res = [];
  for (let i = 0; i < str.length - 1; i += 1) {
    const match = matchSubStr(str.slice(i));
    match && res.push(match);
  }
  console.log('--->>', res);
  return res.length;
};

countSubStr('00110011');
