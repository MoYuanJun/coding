export default class Line {
  constructor({ padding = 50, data = [] }){
    this.canvas = null;
    this.ctx = null;
    this.width = 0;
    this.height = 0;
    this.data = data;
    this.padding = padding;
  }


  // 初始化
  init = (container) => {
    const { width, height } = window.getComputedStyle(container);
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = parseFloat(width);
    this.canvas.height = parseFloat(height);
    this.canvas.style.background = 'red';
    this.ctx = this.canvas.getContext('2d');
    container.appendChild(this.canvas);
  }

  // 绘制坐标轴
  // drwxz



}