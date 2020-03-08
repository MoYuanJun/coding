// 参考: https://codepen.io/JulianLaval/pen/KpLXOO
import React, {
  useRef,
  useEffect,
} from 'react';

import './x';

const useStateHook = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    var canvasDiv = document.getElementById('particle-canvas');
    var options = {
      particleColor: '#888',
      // background: 'https://raw.githubusercontent.com/JulianLaval/canvas-particle-network/master/img/demo-bg.jpg',
      interactive: true,
      speed: 'medium',
      density: 'high',
      background: '#fff',
    };
    var particleCanvas = new ParticleNetwork(canvasDiv, options);
    console.log('--------->>>', particleCanvas);
    // if (containerRef.current){
    //   var options = {
    //     particleColor: '#888',
    //     background: 'https://raw.githubusercontent.com/JulianLaval/canvas-particle-network/master/img/demo-bg.jpg',
    //     interactive: true,
    //     speed: 'medium',
    //     density: 'high'
    //   };
  
    //   var particleCanvas = new ParticleNetwork(containerRef.current, options);
    //   containerRef.current.appendChild(particleCanvas);
    // }
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
