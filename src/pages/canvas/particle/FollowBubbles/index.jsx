import React from 'react';
import scss from './index.module.scss';
import FollowBubbles from './FollowBubbles';

const useStateHook = () => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    new FollowBubbles({ container: containerRef.current });
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
