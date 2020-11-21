import React from 'react';
import G6 from '@antv/g6';
import scss from './index.module.scss';
import { Button } from 'antd';
// https://g6.antv.vision/zh/docs/manual/middle/states/bindEvent
// https://g6.antv.vision/zh/docs/api/Graph
const data = {
  nodes: [
    {
      id: 'node_1',
      x: 100,
      y: 200,
      label: '起始点',
    },
    {
      id: 'node_2',
      x: 300,
      y: 200,
      lable: '',
    },
  ],
  edges: [
    {
      source: 'node_1',
      target: 'node_2',
      label: '我是连线',
    },
  ],
};

const useStateHook = () => {
  const graph = React.useRef(null);
  const containerRef = React.useRef();

  const addBehaviors = () => {
    graph.current.addBehaviors(['drag-canvas'], 'default');
  };

  const removeBehaviors = () => {
    graph.current.removeBehaviors(['drag-canvas'], 'default');
  };

  React.useEffect(() => {
    graph.current = new G6.Graph({
      container: containerRef.current,
      width: 800,
      height: 500,
      modes: {
        default: [],
      },
    });
    graph.current.data(data);
    graph.current.render();

    graph.current.on('beforelayout', evt => {
      console.log('beforelayout', evt);
    });

    graph.current.on('afterlayout', evt => {
      console.log('afterlayout', evt);
    });
  }, []);

  return { containerRef, addBehaviors, removeBehaviors };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.research}>
      <div className={scss.tools}>
        <Button onClick={state.addBehaviors}>
          添加拖拽行为
        </Button>&emsp;
        <Button onClick={state.removeBehaviors}>
          移除拖拽行为
        </Button>
      </div>
      <div className={scss.container} ref={state.containerRef}/>
    </div>
  );
};
