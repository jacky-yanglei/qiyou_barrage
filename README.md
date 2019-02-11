# 一个基于JQ的弹幕插件
## 使用方法
#### 第一步，创建一个弹幕对象  
#### $('.content') 是弹幕的容器，必须指定高度  
`var QiYouBarrage = $('.content').QiYouBarrage();`  
#### 第二步 发送弹幕
```
QiYouBarrage.addBarrage({  
            info: '第一条弹幕', // 弹幕信息  
            top: parseInt(Math.random()*160), // 弹幕离父元素的高度  
            stayTime: (parseInt(Math.random()*10 + 5)) // 弹幕在容器中停留的总时间  
        });  
// 发送一条弹幕  
```
#### 其他方法
清除当前容器中的所有弹幕  
`QiYouBarrage.removeAll()`
