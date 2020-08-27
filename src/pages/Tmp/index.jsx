import React from 'react';
import scss from './index.module.scss';
// https://juejin.im/post/6862156294611009544

const useStateHook = () => {
  const onChange = event => {
    const [file] = event.target.files;
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      console.log(reader.result);
    };
  };

  return { onChange };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.body}>
      <input type="file" onChange={state.onChange}/>
    </div>
  );
};
