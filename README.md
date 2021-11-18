# Tablet
Tablet是一个基于canvas的在线画板，内置精简版jQuery，无其他依赖，`传统网站`或`vue`、`react`、`angular`等单页面应用皆可使用！兼容各种移动设备！

Tablet is a canvas-based web page drawing board with a built-in simplified version of jQuery, 
no other dependencies, and the operation steps can be withdrawn. It can be used on `traditional w
ebsites` or single-page applications such as `vue`, `react`, and `angular`! 
Compatible with various mobile devices!

## canvas签名板文档
这是<code>Tablet2.0</code>文档，Tablet1.0文档请前往 

[Tablet1.0文档](https://github.com/941477276/Tablet/blob/master/README.md)

## 安装
1. **npm安装：**
`npm install canvas-tablet -S`
2. **script标签引入：**
`将/dist/Table-2.0.1.min.js下载下来即可`

## 基本使用
```
<div class="tool-bar">
  <div class="tablet-btns" style="padding: 10px;">
    <input class="-color-picker color-color" type="text" value="字体颜色" id="colpick" readonly/>
    <input class="-color-picker bg-color" type="text" value="背景颜色" id="colpick2" readonly/>
    <div class="clear-canvas">清屏</div>
    <div class="save-canvas-to-img">保存图片</div>
    <span>
         画笔粗细
         <select>
             <option value="1">1</option>
             <option value="3">3</option>
             <option value="5">5</option>
             <option value="8">8</option>
             <option value="10" selected>10</option>
             <option value="15">15</option>
             <option value="20">20</option>
         </select>
         <!--<select>
             <option value="0">正常</option>
             <option value="90">顺时针旋转90度</option>
             <option value="-90">逆时针旋转90度</option>
             <option value="180">旋转180度</option>
         </select>-->
         <button type="button" class="get_blob">获取blob对象</button>
         <button type="button" class="set-img">设置背景图片</button>
         <button type="button" class="backOneStep">撤回</button>
    </span>
  </div>
</div>

<div class="container" id="container"></div>
<script src="./dist/Table.2.0.1.min.js"></script>  
<script>
  var tablet;
  $(function () {
    tablet = new Tablet("#container", {
      // 画笔默认颜色
      defaultColor: "#2e76da",
      // 默认背景色
      defaultBackgroundColor: '#f60',
      // canvas画布是否响应式
      // response: true,
      // canvas的宽度，宽高都可以传递函数
      // width: 0,
      // height: 0,
      // 前面板的额外class
      // extraClass: "",
      // 设置获取到的图片的类型，可选值png、jpg，默认png
      // imgType: "png",
      // 清除画布前执行的函数，如果该函数返回false，则不会进行清除
      // onBeforeClear: function () {},
      // 清除画布后执行的函数
      // onClear: function () {},
      autoResize: true, // 浏览器窗口改变时是否重新绘制
      // 画布初始化后的回调
      onInit: function () {
        var that = this,
          container = this.container;
        $(".-color-picker").each(function () {
          var self = this,
            $self = $(this);
          if ($self.hasClass('color-color')) {

            $self.colpick({
              color: that.config.defaultColor,
              layout: 'hex',
              submitText: "确定",
              onSubmit: function (hsb, hex, rgb, el, bySetColor) {
                var color = "#" + hex;
                $(el).css({
                  //color: color,
                  "border-color": color
                }).colpickHide();
                el.selectedColor = color;
                that.color = color;

                that.setColor(color);
              }
            });
            $self.css({
              "border-color": that.config.defaultColor
            });
          } else if ($self.hasClass('bg-color')) {
            $self.colpick({
              color: that.config.defaultBackgroundColor,
              layout: 'hex',
              submitText: "确定",
              onSubmit: function (hsb, hex, rgb, el, bySetColor) {
                var color = "#" + hex;
                $(el).css({
                  //color: color,
                  "border-color": color
                }).colpickHide();
                el.selectedColor = color;
                //that.bgColor = color;
                that.setBackgroundColor(color);
                // 重绘背景图后必须刷新一下，否则偶尔会出现最后一个线条被重复绘制一遍问题
                var timer = setTimeout(function (){
                  clearTimeout(timer);
                  that.refresh();
                }, 0);
              }
            });
            $self.css({
              "border-color": that.config.defaultBackgroundColor
            });
          }
        });
        $('.clear-canvas').on('click', function () {
          that.clear();
        })
        $(".tablet-btns select").eq(0).on("change", function () {
          that.setLineWidth($(this).val());
        });
        $(".save-canvas-to-img").on("click", function () {
          console.log(that.getBase64());
          if (!that.isMobile) {
            alert("请按f12打开控制台查看base64图片数据！");
          }
        });
        $(".get_blob").on("click", function () {
          console.log(that.getBlob());
        });
        $(".set-img").on("click", function () {
          that.setBackgroundImage(document.getElementById('bg_img'));
          // 重绘背景图后必须刷新一下，否则偶尔会出现最后一个线条被重复绘制一遍问题
          var timer = setTimeout(function (){
            clearTimeout(timer);
            that.refresh();
          }, 0);
        });
        $(".backOneStep").on('click', function () {
          that.revoke();
        });
      }
    });
    console.log(tablet);
  });
</script>
```
  <p>效果如图：</p>
  
  ![Table画板效果](./images/tablet2.0_effect.gif)
  
  <div class="pt-20"></div>

## 实例方法
> `refresh(refreshWH)`

刷新画布，线条及背景将会重绘，返回当前Tablet实例；如果`refreshWH`为true，则会重新计算画布宽高

> `hasCanUseLine`

判断是否有可用的线条，可以用来判断用户是否有绘制内容，返回值类型：`boolean`

> `getRect`

获取画布位置及宽高；返回值类型：`{x: number, width: number, y: number, height: number}`

> `getBase64(type, angle)`

将画布内容转换成base64数据，并返回；返回值类型：`string`
+ `type`：图片类型，只有`jpg`、`png`两个选项，默认`png`
+ `angle`：旋转角度，默认为0，角度支持**90的整数倍**

> `getBlob(type, angle)`

将画布内容转换成blob数据，并返回；返回值类型：`blob`
+ `type`：图片类型，只有`jpg`、`png`两个选项，默认`png`
+ `angle`：旋转角度，默认为0，角度支持**90的整数倍**

> `getMax(xPoints, yPoints)`

获取x、y轴的最大、最小值；`xPoints, yPoints`分别为x轴、y轴所有坐标；返回值类型：`{top: number, left: number, bottom: number, right: number}`

> `setColor(color)`

设置画笔颜色；`color`为颜色值，可以是任何css的颜色表达式；返回当前Tablet实例

> `setLineWidth(width)`

设置画笔粗细；`width`为粗细值，`number类型`；返回当前Tablet实例

> `setBackgroundColor(bgColor, x, y, width, height, addToOperationRecord)`

设置画布背景颜色；返回当前Tablet实例

1. `bgColor`：颜色值，可以是任何css的颜色表达式
2. `x`：绘制起始x点，默认为0
3. `y`：绘制起始y点，默认为0
4. `width`：绘制宽度，默认为整个画布宽度
5. `height`：绘制高度，默认为整个画布高度
6. `addToOperationRecord`：是否将此操作添加到操作历史中，默认为true

> `setBackgroundImage(img, x, y, width, height, onImgLoading, onFail, addToOperationRecord)`

设置画布背景颜色；返回当前Tablet实例

1. `img`：背景图片，值可以为图片url或者Image对象
2. `x`：绘制起始x点，默认为0
3. `y`：绘制起始y点，默认为0
4. `width`：绘制宽度，默认为整个画布宽度
5. `height`：绘制高度，默认为整个画布高度
6. `onImgLoading`：图片加载中回调
7. `onFail`：图片加载失败回调
8. `addToOperationRecord`：是否将此操作添加到操作历史中，默认为true

> `setCanvasWH(width, height)`

设置画布的宽高；`width, height`分别为画布宽高，如果不传宽高则会自动计算；返回当前Tablet实例

> `canvasReset`

重置canvas画笔属性，使用最后一次的属性进行重置，返回当前Tablet实例；

> `revoke`

回退一步，返回当前Tablet实例；


> `clear(clearPoints)`

  `clear`方法用于清空画布，返回值当前Tablet实例；如果`clearPoints`为true，则会将之前绘制的线条及操作步骤清空
 


## 演示地址

### https://941477276.github.io/Tablet/index2.html
