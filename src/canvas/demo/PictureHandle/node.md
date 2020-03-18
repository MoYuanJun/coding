#  笔记

## 参考

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
 