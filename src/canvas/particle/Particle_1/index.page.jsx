import React, {
  useRef,
  useEffect,
} from 'react';

import Paiticle from './Paiticle';
import './x';

const useStateHook = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const paiticle = new Paiticle({ container: containerRef.current });

    // var canvasDiv = document.getElementById('particle-canvas');
    // var options = {
    //   particleColor: '#888',
    //   // background: 'https://raw.githubusercontent.com/JulianLaval/canvas-particle-network/master/img/demo-bg.jpg',
    //   interactive: true,
    //   speed: 'medium',
    //   density: 'high',
    //   background: '#fff',
    // };
    // var particleCanvas = new ParticleNetwork(canvasDiv, options);
  }, []);

  return { containerRef };
}

export default () => {
  const state = useStateHook();

  return (
    <div
      id="particle-canvas"
      ref={state.containerRef}
      style={{ height: '100vh', width: '100vw'}}
    >
      
    </div>
  );
};
export const path = ['canvas', '粒子', '粒子1'];
