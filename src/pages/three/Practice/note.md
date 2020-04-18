## 创建一个基础场景

```js
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
    const renderer = new THREE.WebGLRenderer();            // 创建
    renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);           // 设置大小(宽高)
    containerRef.current.appendChild(renderer.domElement); // 挂载到页面

    // 2. 创建场景
    const scene = new THREE.Scene();

    // 3. 创建摄像机: PerspectiveCamera 透视摄像机(视野角度, 长宽比, 近截面, 远截面)
    const camera = new THREE.PerspectiveCamera(
      75,
      SCENE_WIDTH / SCENE_HEIGHT,
      0.1,
      1000
    );
    camera.position.z = 5;

    // 4. 创建立方体 - 并添加到场景中
    const geometry = new THREE.BoxGeometry(1, 1, 1);                  // 创建立方体对象
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });// 创建材质
    const cube = new THREE.Mesh(geometry, material);                  // 创建网格对象
    scene.add(cube); // 将网格对象添加到场景

    // 5. 添加动画循环
    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);   // 在渲染器中渲染场景
    };
    animate();
  }, []);

  return { containerRef };
};

export default () => {
  const state = useStateHook();
  return (
    <div ref={state.containerRef}/>
  );
};
```
