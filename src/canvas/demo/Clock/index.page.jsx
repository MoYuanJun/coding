import React, {
  useRef,
  useEffect,
} from 'react';
import Clock from './clock';

const useStateHook = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const clock = new Clock({ container: containerRef.current });
    clock.render();
  }, []);

  return { containerRef };
};

export default () => {
  const state = useStateHook();

  return (
    <div  
      ref={state.containerRef} 
      // style={{ width: 200, height: 200 }}
    />
  );
};
export const path = ['canvas', '练习', '时钟'];