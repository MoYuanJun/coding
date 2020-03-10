import React, {
  useEffect,
} from 'react';

const useStateHook = () => {
  useEffect(() => {
    require('./d');
  }, []);
}

export default () => {

  useStateHook();

  return (
    <div>
      <canvas 
        id="c" 
        style={{ position: 'absolute', left: 0, top: 0 }}>

      </canvas>
    </div>
  );
};

export const path = ['canvas', '粒子', '粒子2'];
