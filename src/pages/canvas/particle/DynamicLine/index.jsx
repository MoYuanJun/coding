import React, {
  useRef,
  useEffect,
} from 'react';
import Paiticle from './Paiticle';
import scss from './index.module.scss';

const useStateHook = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    new Paiticle({ container: containerRef.current });
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
