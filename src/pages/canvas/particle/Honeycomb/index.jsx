import React, {
  useRef,
  useEffect,
} from 'react';

import Paricle from './Paricle';

const useStateHook = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    new Paricle({
      container: containerRef.current,
    });
  }, []);

  return { containerRef };
}

export default () => {

  const state = useStateHook();

  return (
    <div 
      ref={state.containerRef}
      style={{ width: '100vw', height: '100vh' }}>
    </div>
  );
};
