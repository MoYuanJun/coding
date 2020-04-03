
export default class Pie {
  constructor(container, { s }){
    this.container = container;
  }

  // 初始化
  init = () => {
    if (!this.container){return false;}
    const { width, height } = window.getComputedStyle(this.container);
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = parseFloat();
    this.canvas.height = this.height;

    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }
};
