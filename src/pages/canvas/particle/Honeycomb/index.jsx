import React, {
  useRef,
  useEffect,
} from 'react';
import Paricle from './Paricle';
import scss from './index.module.scss';

const useStateHook = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    new Paricle({
      container: containerRef.current,
    });
  }, []);

  return { containerRef };
};

export default () => {
  const state = useStateHook();

  return (
    <div
      className={scss.layout}
      ref={state.containerRef}
    />
  );
};
