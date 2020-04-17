import React, {
  useState,
} from 'react';
import Magnifier from './component';
import scss from './index.module.scss';

const useStateHook = () => {
  const [img, setImg] = useState(null);

  // 载入图片
  const onUploadImg = async event => {
    const [file] = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = res => setImg(res.target.result);
  };

  return { onUploadImg, img };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.layout}>
      {state.img ?
        <Magnifier src={state.img}/> :
        <div className={scss.form}>
          <label htmlFor="magnifier-input">
            +
          </label>
          <input
            type="file"
            accept="image/*"
            id="magnifier-input"
            onChange={state.onUploadImg}
          />
        </div>
      }
    </div>
  );
};
