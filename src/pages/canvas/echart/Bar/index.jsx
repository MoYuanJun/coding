import React, {
  useRef,
  useEffect,
} from 'react';
import Bar from './bar';
import scss from './index.module.scss';

const data = [
  { name: '周一', value: 300 },
  { name: '周二', value: 250 },
  { name: '周三', value: 100 },
  { name: '周四', value: 220 },
  { name: '周五', value: 280 },
];

const useStateHook = () => {
  const containerRef = useRef();

  useEffect(() => {
    const bar = new Bar({ padding: 50, data });
    bar.init(containerRef.current);
    bar.draw();
  }, []);

  return { containerRef };
};

export default props => {
  const state = useStateHook(props);
  return (
    <div className={scss.layout}>
      <div
        ref={state.containerRef}
        style={{ width: 600, height: 500 }}
      />
    </div>
  );
};
