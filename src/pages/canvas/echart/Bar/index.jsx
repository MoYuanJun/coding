import React from 'react';
import { useEffect, useRef }  from 'react';

const useStateHook = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width="500";
    canvas.height="500";

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 450);
    ctx.lineTo(450, 450);
    ctx.strokeStyle = '#fff';
    ctx.stroke();

  }, []);

  return { canvasRef };
}

export default (props) => {
  const state = useStateHook(props);
  return (
    <canvas ref={state.canvasRef} style={{ background: '#829dba' }}>
      demo-1
    </canvas>
  );
}
