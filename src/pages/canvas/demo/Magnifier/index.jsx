import React, {
  useState,
  useEffect,
} from 'react';

/**
 * file 对象转 Img Dom
 * @param {File} file file 对象
 * @return {DOM}
 */
const fileToImgDom = file => new Promise((resolve, reject) => {
  try {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = res => {
      const img = document.createElement('img');
      img.src = res.target.result;
      img.onload = () => resolve(img);
    };
  } catch (e) {
    reject(e);
  }
});

const useStateHook = () => {
  const [imgDom, setImgDom] = useState(null);

  // 载入图片
  const onUploadImg = async event => {
    const [file] = event.target.files;
    const imgDom = await fileToImgDom(file);
    setImgDom(imgDom);
  };

  useEffect(() => {
    if (imgDom) {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      console.log(imgDom.width, imgDom.height);
      ctx.drawImage(imgDom, 0, 0);
    }
  }, [imgDom]);

  return { onUploadImg };
};

export default () => {
  const state = useStateHook();
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={state.onUploadImg}
      />
      <div>
        <canvas id="canvas" width="400" height="400"></canvas>
      </div>
    </div>
  );
};
