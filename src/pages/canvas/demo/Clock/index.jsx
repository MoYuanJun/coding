import React, {
  useRef,
  useEffect,
} from 'react';
import Clock from './clock';
import scss from './index.module.scss';

const useStateHook = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    new Clock({ container: containerRef.current });
  }, []);

  return { containerRef };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.layout}>
      <div ref={state.containerRef}/>
    </div>
  );
};
