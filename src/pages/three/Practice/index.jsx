import React, {
  useRef,
  useEffect,
} from 'react';
import * as THREE from 'three';

const useStateHook = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    const SCENE_WIDTH = 500;
    const SCENE_HEIGHT = 500;

    // 1. 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);
    containerRef.current.appendChild(renderer.domElement);

    // 2. 创建场景
    const scene = new THREE.Scene();

    // 3. 创建摄像机
    const camera = new THREE.PerspectiveCamera(
      45,
      SCENE_WIDTH / SCENE_HEIGHT,
      1,
      500
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    // 4. 创建材质: 蓝色的线性材质
    const material = new THREE.LineBasicMaterial({ color: '#0000ff' });

    // 5. 绘制几何体: 并添加顶点
    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 10, 0));
    geometry.vertices.push(new THREE.Vector3(10, 0, 0));

    // 6. 绘制线条
    const line = new THREE.Line(geometry, material);

    // 7. 渲染: 将线条添加到场景中并渲染
    scene.add(line);
    renderer.render(scene, camera);
  }, []);

  return { containerRef };
};

export default () => {
  const state = useStateHook();
  return (
    <div ref={state.containerRef}/>
  );
};
