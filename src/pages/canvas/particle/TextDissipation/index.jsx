import React from 'react';
import scss from './index.module.scss';
import TextDissipation from './TextDissipation';

const useStateHook = () => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    new TextDissipation({
      container: containerRef.current,
    });
  }, []);

  return { containerRef };
};

export default () => {
  const state = useStateHook();

  return (
    <div
      ref={state.containerRef}
      className={scss.textDissipation}
    />
  );
};
