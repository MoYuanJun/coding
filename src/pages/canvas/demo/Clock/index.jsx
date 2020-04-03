import React, {
  useRef,
  useEffect,
} from 'react';
import Clock from './clock';

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
    <div ref={state.containerRef}/>
  );
};
