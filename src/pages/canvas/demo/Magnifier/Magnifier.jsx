import React, {
  useState,
} from 'react';
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

  // useEffect(() => {
  //   if (imgDom) {
  //     const canvas = document.getElementById('canvas');
  //     const ctx = canvas.getContext('2d');
  //     console.log(imgDom.width, imgDom.height);
  //     ctx.drawImage(imgDom, 0, 0);
  //   }
  // }, [img]);

  return { onUploadImg, img };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.layout}>
      <div className={scss.magnifier}>
        {state.img ?
          <div className={}>
            <img src={state.img}/>
          </div> :
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
    </div>
  );
};
