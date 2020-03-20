#  笔记

## 参考

- https://juejin.im/post/5e6f85df6fb9a07c8b5bcdcb
- https://juejin.im/post/5c5432ca6fb9a049b82ae58a#heading-4
- https://juejin.im/post/5e5e5f0af265da57133b30bc#heading-19
- https://www.jianshu.com/p/b1affeebd986
- https://blog.csdn.net/qq_36565626/article/details/88225756

- https://blog.csdn.net/yuewenyao/article/details/84073574
- https://blog.csdn.net/qq_15906905/article/details/97074749?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task


## 落点问题：如何判断是否触摸到了图片、操控按钮

1. 首先提供一种简单的方法，canvas中有一个isPointInPath方法可以判断一个落点是否在某个路径中。不过如果canvas中的元素是图片，那么我们必须在画每一张图片时，为其加上一个路径包裹起来。这是一种解决落点问题的方案。这里不做深入介绍了，我采用的是下面的方案


2. 通过图片四个点位置判断当前鼠标是否落在图片上, 这里需要考虑到图片旋转的问题: 可以通过向量来解决


## 如何进行图片的选装、缩放、剪切

## 如何实现图片下载
 

## tmp

向量

设A坐标(m,n),B坐标(p,q),则向量AB的坐标为(p-m,q-n)，即一个向量的坐标等于表示此向量的有向线段的终点坐标减去始点的坐标

向量的点积 = x1*x2 + y1 * y2 = |a||b|cosθ
数量积判断两个向量的夹角是锐角还是钝角

==> a.b > 0 方向基本相同(夹角在 0 ~ 90)
    a.b = 0 正交、相互垂直
    a.b < 0 方法基本相反, 夹角在 90 到 180 之间

向量的叉积
    几何意义: 由这两向量构成的平行四边形的面积
    |a×b| = |a||b|sin∠(a,b)
    sin30 === sin150

定义：向量a与b的外积a×b是一个向量，其长度等于|a×b| = |a||b|sin∠(a,b)，其方向正交于a与b。并且，(a,b,a×b)构成右手系。
特别地，0×a = a×0 = 0.此外，对任意向量a，a×a=0。

function rayCasting(p, poly) {
    var px = p.x,
        py = p.y,
        flag = false

    for(var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
      var sx = poly[i].x,
          sy = poly[i].y,
          tx = poly[j].x,
          ty = poly[j].y

      // 点与多边形顶点重合
      if((sx === px && sy === py) || (tx === px && ty === py)) {
        return 'on'
      }

      // 判断线段两端点是否在射线两侧
      if((sy < py && ty >= py) || (sy >= py && ty < py)) {
        // 线段上与射线 Y 坐标相同的点的 X 坐标
        var x = sx + (py - sy) * (tx - sx) / (ty - sy)

        // 点在多边形的边上
        if(x === px) {
          return 'on'
        }

        // 射线穿过多边形的边界
        if(x > px) {
          flag = !flag
        }
      }
    }

    // 射线穿过多边形边界的次数为奇数时点在多边形内
    return flag ? 'in' : 'out'
  }


  function isPointInRect(point, rect) {
    const [touchX, touchY] = point;
    // 长方形四个点的坐标
    const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = rect;
    
    // 四个向量
    const v1 = [x1 - touchX, y1 - touchY];
    const v2 = [x2 - touchX, y2 - touchY];
    const v3 = [x3 - touchX, y3 - touchY];
    const v4 = [x4 - touchX, y4 - touchY];
    if(
        (v1[0] * v2[1] - v2[0] * v1[1]) > 0 
        && (v2[0] * v4[1] -  v4[0] * v2[1]) > 0
        && (v4[0] * v3[1] - v3[0] * v4[1]) > 0
        && (v3[0] * v1[1] -  v1[0] * v3[1]) > 0
    ){
        return true;
    }
    return false;
}


A x B = (.......) = 