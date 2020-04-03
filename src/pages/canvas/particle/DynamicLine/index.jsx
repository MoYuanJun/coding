import React, {
  useRef,
  useEffect,
} from 'react';

import Paiticle from './Paiticle';

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
      ref={state.containerRef}
      style={{ height: '100vh', width: '100vw' }}
    />
  );
};
