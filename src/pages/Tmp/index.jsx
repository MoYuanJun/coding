/* eslint-disable no-var */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';

export default () => {
  const handleClick = useCallback(async () => {
    const res = await window.documentPictureInPicture.requestWindow({
      width: 1000,
      height: 1000,
    });
    console.log('%c [ res ]-13', 'font-size:13px; background:pink; color:#bf2c9f;', res);
  }, []);

  return (
    <div onClick={handleClick}>
      1
    </div>
  );
};

