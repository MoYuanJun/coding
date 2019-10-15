
export default class Bar {
  constructor({ width, height, padding }){
    this.ctx = null;
    this.canvas = null;
    this.width = width;
    this.height = height;
    this.padding = padding;
  }

  // 初始化
  init(container){
    const canvas = document.createElement('canvas');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    canvas.width = '100%';
    canvas.height = '100%';
    container.appendChild(canvas);
  }



}