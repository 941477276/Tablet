/*!
* Tablet
* Tablet是一个轻量级的基于canvas的在线画板，无其他依赖，传统网站或vue、react、angular等单页面应用皆可使用！兼容各种移动设备！
* github: https://github.com/941477276/Tablet
*/
;(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require());
  } else {
    window.Tablet = factory();
    try {
      if (typeof define === "function") {
        define(function (require) {
          return factory(require());
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
})(function () {
  /**
   * 线条构造函数
   * @param ctx 主画布上下文
   * @param ctxBack 副画布上下文
   * @param lineConfig 画笔设置
   * @param bgConfig 背景设置
   * @constructor
   */
  function Line (ctx, ctxBack, lineConfig, bgConfig) {
    this.ctx = ctx;
    this.ctxBack = ctxBack;
    this.lineConfig = lineConfig || {}; // 画笔配置
    this.bgConfig = bgConfig || {}; // 画布背景配置
    this.backuped = false; // 是否已经将线条备份到了副画布中
    this.points = [];
  }

  Line.prototype.draw = function (widthRate, heightRate, onlyCtxBackDraw, devicePixelRatio) {
    widthRate = typeof widthRate === 'undefined' ? 1 : parseFloat(widthRate);
    heightRate = typeof heightRate === 'undefined' ? 1 : parseFloat(heightRate);
    widthRate = (widthRate > 0 ? widthRate : 1);
    heightRate = (heightRate > 0 ? heightRate : 1);
    onlyCtxBackDraw = typeof onlyCtxBackDraw === 'undefined' ? false : !!onlyCtxBackDraw;
    var lineConfig = this.lineConfig;
    // var ctxBack = this.ctxBack;
    var ctx = onlyCtxBackDraw ? this.ctxBack : this.ctx;
    console.log('draw', widthRate, heightRate, onlyCtxBackDraw, lineConfig);
    ctx.beginPath();
    // 设置画笔样式
    for (var attr in lineConfig) {
      ctx[attr] = lineConfig[attr];
    }
    ctx.lineWidth = lineConfig.lineWidth * Math.min(widthRate, heightRate);
    // 如果points的长度为1，则说明这是一个点
    if (this.points.length == 1) {
      var point = this.points[0];
      var x = point.x * widthRate;
      var y = point.y * heightRate;
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
      return;
    }
    this.points.forEach(function (point, index) {
      var x = point.x * widthRate;
      var y = point.y * heightRate;
      ctx[index > 0 ? 'lineTo' : 'moveTo'](x, y);
      // 这里必须及时绘制，如果将绘制放到循环外面，那么在重绘过程中线条会变细
      if (index > 0) {
        ctx.stroke();
      }
    });
  };
  Line.prototype.addPoint = function (x, y) {
    this.points.push({ x: x, y: y });
  };


  /**
   * 操作记录构造函数
   * @param options
   * @constructor
   */
  function OperationRecord (options) {
    this.tablet = options.tablet;
    this.type = options.type;
    this.linesIndex = typeof options.linesIndex === 'undefined' ? -1 : options.linesIndex; // 记录线条的下标
    this.lines = [].concat(options.lines);
    this.lineConfig = options.lineConfig ? tool.extend({}, options.lineConfig) : null;
    this.bgConfig = options.bgConfig ? tool.extend({}, options.bgConfig) : null;
  }

  OperationRecord.prototype.exec = function () {
    var that = this;
    var tablet = this.tablet;
    var ctx = tablet.ctx;
    var ctxBack = this.tablet.ctxBack;
    // 画线操作
    var drawLine = function (onlyCtxBackDraw) {
      console.log('画线');
      onlyCtxBackDraw = typeof onlyCtxBackDraw == 'undefined' ? false : !!onlyCtxBackDraw;
      that.lines.forEach(function (line) {
        if (line) {
          line.draw(tablet.widthZoomRate, tablet.heightZoomRate, onlyCtxBackDraw, that.tablet.devicePixelRatio);
        }
      });
    };
    // 画背景
    var drawBg = function (bgConfig) {
      if (bgConfig.bgType == 'color') {
        tablet.setBackgroundColor(bgConfig.bgColor, bgConfig.x, bgConfig.y, bgConfig.width, bgConfig.height, false);
      } else if (bgConfig.bgType == 'img') {
        tablet.setBackgroundImage(bgConfig.bgImg, bgConfig.x, bgConfig.y, bgConfig.width, bgConfig.height, null, null, false);
      }
    };
    var devicePixelRatio = this.tablet.devicePixelRatio;
    switch (this.type) {
      case 'drawLine':
        ctxBack.clearRect(0, 0, tablet.width, tablet.height);

        drawLine(true);
        drawBg(that.bgConfig);
        break;
      // case 'lineConfig':
      //  break;
      case 'bgColor':
      case 'bgImg':
        // 先在副本画布画线
        ctxBack.clearRect(0, 0, tablet.width, tablet.height);

        drawLine(true);
        // 再执行画背景操作
        drawBg(that.bgConfig);
        break;
    }
  };

  /**
   * 画板构造函数
   * @param container 画板所在容器
   * @param config 画板配置
   * @constructor
   */
  function Tablet (container, config) {
    this._init(container, config);
    this._ctxInit();
  }

  Tablet._conut = 0;
  /* 内部使用，初始化前面板 */
  Tablet.prototype._init = function (el, config) {
    var container;
    var that = this;
    if (typeof el === 'string') {
      container = document.querySelector(el);
    } else if (typeof el === 'object' && el.nodeType == 1) {
      container = el;
    }
    if (!container) {
      throw new Error("el参数必须是一个css选择器或dom元素！");
    }


    this.config = {
      // canvas画布是否响应式
      response: true,
      // canvas的宽度，宽高都可以传递函数
      width: 0,
      height: 0,
      // 前面板的额外class
      extraClass: "",
      // 默认字体颜色
      defaultColor: "#000",
      // 默认背景色
      defaultBackgroundColor: "transparent",
      defaultBgType: 'color', // 默认背景类型
      defaultBgImg: null, // 默认背景图片 // 背景类型，有color、img两种
      defaultHeight: 400, // 默认高度
      autoResize: true, // 浏览器窗口改变时是否重新绘制
      // 设置获取到的图片的类型，可选值png、jpg，默认png
      imgType: "png",
      // 初始化完毕后执行的函数
      onInit: function () {
      },
      // 清除画布前执行的函数，如果该函数返回false，则不会进行清除
      onBeforeClear: function () {
      },
      // 清除画布后执行的函数
      onClear: function () {
      }
    };
    if (config && tool.getType(config) === "object") {
      tool.extend(true, this.config, config);
    }
    this.container = container;
    this.id = "Tablet_LYN_" + (Tablet._conut++);

    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.isMobile = /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent);
    this.lineConfig = {
      strokeStyle: this.config.defaultColor,
      lineWidth: 8,
      lineWidthZoomRate: 1, // 画笔缩放比例，窗口大小改变后会改变
      lineCap: "round",
      lineJoin: "round",
      shadowBlur: 1,
      shadowColor: this.config.defaultColor
    };
    this.bgConfig = {
      bgColor: this.config.defaultBackgroundColor, // 背景色
      bgImg: this.config.bgImg, // 背景图片
      bgType: this.config.bgType, // 背景类型，有color、img两种
      x: 0,
      y: 0,
      width: -1,
      height: -1
    };
    this.container.appendChild(this.buildTablet());
    var tabletEl = this.tabletEl = document.getElementById(this.id);

    this.canvas = tabletEl.querySelector('.tablet-canvas');
    this.ctx = this.canvas.getContext("2d");
    this.canvasBack = tabletEl.querySelector('.backup-canvas');
    this.ctxBack = this.canvasBack.getContext("2d");
    // 用于记录当前绘制的坐标
    this.point = { x: 0, y: 0 };
    this.lines = []; // 线条记录
    this.operationRecords = []; // 操作记录
    // 旋转的角度
    this.degree = 0;
    this.version = '2.0.4';

    if (typeof this.config.width === "function") {
      this.width = this.config.width();
    } else {
      this.width = this.config.width;
    }
    if (typeof this.config.height === "function") {
      this.height = this.config.height();
    } else {
      this.height = this.config.height;
    }
    var winW = tool.getDocumentWidthHeight();
    if (this.isMobile) {
      delete this.lineConfig.shadowBlur;
      delete this.lineConfig.shadowColor;
      if (winW >= 768) {
        this.lineConfig.lineWidth = 8;
      } else if (winW < 768 && winW >= 414) {
        this.lineConfig.lineWidth = 6;
      } else if (winW < 414 && winW >= 375) {
        this.lineConfig.lineWidth = 4;
      } else if (winW < 375 && winW >= 320) {
        this.lineConfig.lineWidth = 2;
      }
    }

    // 设置canvas画布的宽高
    this.setCanvasWH(this.width, this.height);
    this.widthOrigin = this.width;
    this.heightOrigin = this.height;
    this.widthZoomRate = 1; // 画布宽度缩放比例
    this.heightZoomRate = 1;
    // 将画布显示出来
    tool.setCss(this.canvas, 'display', 'block');


    // 画布随浏览器窗口大小响应
    if (this.config.autoResize) {
      this._removeResizeEventFn = this._bindResizeEvent();
    }

    // 监听插件被移除事件，然后移除window上的事件
    tool.on(tabletEl, 'DOMNodeRemoved', function () {
      console.log('tabletEl被移除了');
      that.destroy();
    });

    this.config.onInit && (typeof this.config.onInit === "function") && this.config.onInit.call(this);
  };
  /* 内部使用，给canvas进行一些初始化设置 */
  Tablet.prototype._ctxInit = function () {
    // var lines = this.lines;
    var that = this,
      // 画线函数
      pait = function (singal) {
        switch (singal) {
          case 1:
            /*如果是1，则表明是鼠标按下或是触摸开始，只要是鼠标按下或触摸开始则清楚之前绘制的路径，从按下的点重新开始*/
            that.ctx.beginPath();
            that.ctx.moveTo(that.point.x, that.point.y);
            /* that.ctxBack.beginPath();
            that.ctxBack.moveTo(that.point.x, that.point.y);*/

            that.lines.push(new Line(that.ctx, that.ctxBack, tool.extend({}, that.lineConfig), tool.extend({}, that.bgConfig)));
          case 2:
            // 重新设置画笔大小，当浏览器大小改变后，再在画布上画线如果不重新设置画笔的话则会出问题
            that.ctx.lineWidth = that.lineConfig.lineWidth * that.lineConfig.lineWidthZoomRate;
            that.ctx.lineTo(that.point.x, that.point.y);
            that.ctx.stroke();
            /*that.ctxBack.lineTo(that.point.x, that.point.y);
            that.ctxBack.stroke();*/
            // 在添加点的时候，点的实际位置要根据画布缩放比例来计算，这样在画布缩放时才能更好的重画
            that.lines[that.lines.length - 1].addPoint(that.point.x / that.widthZoomRate, that.point.y / that.heightZoomRate);
            break;
          default:
        }
      },
      // 标记鼠标是否按钮或手指是否按下
      pressed = this.pressed = false,
      create = function (singal) {
        return function (e) {
          e.preventDefault();

          if (singal === 1) {
            that.pressed = true;
          }
          /* 如果鼠标刚按下(手指刚触摸)，或鼠标在移动中(手指在滑动中)则立即画线 */
          if (singal === 1 || that.pressed) {
            e = that.isMobile ? e.touches[0] : e;
            var canvasScroll = tool.offset(that.canvas);
            var scrollTop = tool.scrollTop();
            var scrollLeft = tool.scrollLeft();
            // 设置坐标值 不加0.5，整数坐标处绘制直线，直线宽度将会多1px
            that.point.x = e.clientX - ((canvasScroll.left + 0.5) - scrollLeft);
            that.point.y = e.clientY - ((canvasScroll.top + 0.5) - scrollTop);
            pait(singal);
          }
        };
      };
    var lineConfig = that.lineConfig;
    // 设置画笔样式
    for (var attr in lineConfig) {
      that.ctx[attr] = lineConfig[attr];
      that.ctxBack[attr] = lineConfig[attr];
    }
    // 移动端性能太弱, 不适合模糊，去掉模糊可以提高手写渲染速度。pc端添加模糊为了去除锯齿
    if (!that.isMobile) {
      that.ctx.shadowBlur = lineConfig.shadowBlur;
      that.ctx.shadowColor = lineConfig.shadowColor;
      that.ctxBack.shadowBlur = lineConfig.shadowBlur;
      that.ctxBack.shadowColor = lineConfig.shadowColor;
    }

    var start = create(1),
      move = create(2),
      // 为了避免UI过度绘制，让move操作执行得更加流畅，因此使用requestAnimationFrame优化
      animationMove = window.requestAnimationFrame ? function (e) {
        requestAnimationFrame(function () {
          move(e);
        });
      } : move,
      endEvent = function () {
        that.pressed = false;
        if (that.lines.length > 0) {
          var lastLine = that.lines[that.lines.length - 1];
          if (lastLine && !lastLine.backuped) {
            // console.log('每次鼠标弹起时都将最近一次绘制的内容绘制到副本画布中');
            // 每次鼠标弹起时都将最近一次绘制的内容绘制到副本画布中
            lastLine.draw(0, 0, true, that.devicePixelRatio);
            lastLine.backuped = true;
          }
        }
      },
      addOperationRecordFn = function () {
        that.pressed = false;
        if (that.lines.length > 0) {
          console.log('addOperationRecord drawLine');
          that.operationRecords.push(new OperationRecord({
            type: 'drawLine',
            tablet: that,
            lines: that.lines,
            bgConfig: that.bgConfig,
            linesIndex: that.lines.length - 1
          }));
        }
      };
    // 绘制背景
    var drawBg = function (bgConfig) {
      if (bgConfig.bgType == 'color') {
        that.setBackgroundColor(bgConfig.bgColor, -1, -1, -1, -1, false);
      } else if (bgConfig.bgType == 'img') {
        that.setBackgroundImage(bgConfig.bgImg, -1, -1, -1, -1, null, null, false);
      }
    };
    drawBg({
      bgType: this.config.defaultBgType,
      bgColor: this.config.defaultBackgroundColor,
      bgImg: this.config.defaultBgImg
    });

    var canvas = this.canvas;
    if (this.isMobile) {
      tool.on(canvas, "touchstart", start);
      tool.on(canvas, "touchmove", move);
    } else {
      tool.on(canvas, "mousedown", start);
      tool.on(canvas, "mousemove", move);
    }
    ["touchend", "mouseleave", "mouseup"].forEach(function (event, index) {
      tool.on(canvas, event, endEvent);
    });
    ["touchend", "mouseup"].forEach(function (event, index) {
      tool.on(canvas, event, addOperationRecordFn);
    });
  };
  /**
   * 浏览器窗口大小改变时重新绘制
   * @returns {eventFn}
   * @private
   */
  Tablet.prototype._bindResizeEvent = function () {
    var event = "resize";
    var that = this;
    var lastUpdateTime = 0;
    var tabletLastWidth = this.width;
    var tabletLastHeight = this.height;
    event += window.onorientationchange ? " orientationchange" : "";
    console.log('resize event');
    var eventFn = function () {
      var now = new Date().getTime();
      if (lastUpdateTime == 0 || (now - lastUpdateTime) > 100) {
        lastUpdateTime = now;
        var tablet = that.tabletEl,
          bl = parseFloat(tool.getStyle(tablet, 'border-left-width')),
          br = parseFloat(tool.getStyle(tablet, 'border-right-width')),
          bt = parseFloat(tool.getStyle(tablet, 'border-top-width')),
          bb = parseFloat(tool.getStyle(tablet, 'border-bottom-width')),
          pl = parseFloat(tool.getStyle(tablet, 'padding-left')),
          pr = parseFloat(tool.getStyle(tablet, 'padding-right')),
          pt = parseFloat(tool.getStyle(tablet, 'padding-top')),
          pb = parseFloat(tool.getStyle(tablet, 'padding-bottom'));
        var tabletW = tablet.offsetWidth - bl - br - pl - pr;
        var tabletH = tablet.offsetHeight - bt - bb - pt - pb;
        if (tabletLastWidth == tabletW && tabletLastWidth == tabletH) {
          console.info('container width not changed!');
          return;
        }
        console.log('浏览器宽高改变了，重新绘制');

        tabletLastWidth = tabletW;
        tabletLastHeight = tabletH;
        that.setCanvasWH();

        // that.ctx.save(); // 先保存主画布的状态
        // that.ctx.shadowBlur = 0; // 然后设置主画布的shadowBlur为0，以解决浏览器宽高改变后重新绘制会导致绘制的内容有边框的问题
        that.refresh(); // 刷新画布
        // that.ctx.restore(); // 恢复主画布的状态
      }
    };
    tool.on(window, event, eventFn);

    return function () {
      tool.off(window, event, eventFn);
    };
  };
  /**
   * 刷新画布
   * @returns {Tablet}
   */
  Tablet.prototype.refresh = function (refreshWH) {
    var that = this;
    refreshWH = typeof refreshWH == 'undefined' ? false : !!refreshWH;
    if (refreshWH) {
      this.setCanvasWH();
    }
    var widthRate = that.width / that.widthOrigin;
    var heightRate = that.height / that.heightOrigin;
    var bgConfig = that.bgConfig;
    var dragBg = function () {
      console.log('重绘背景！');
      if (bgConfig.bgType == 'color') {
        that.setBackgroundColor(bgConfig.bgColor, bgConfig.x, bgConfig.y, bgConfig.width, bgConfig.height, false);
      } else if (bgConfig.bgType == 'img') {
        that.setBackgroundImage(bgConfig.bgImg, bgConfig.x, bgConfig.y, bgConfig.width, bgConfig.height, null, null, false);
      }
    };
    that.lineConfig.lineWidthZoomRate = Math.min(widthRate, heightRate);
    that.widthZoomRate = widthRate;
    that.heightZoomRate = heightRate;
    console.log('rate', Math.min(widthRate, heightRate));
    var hasCanUseLines = that.hasCanUseLine();
    console.log('有可用线条', hasCanUseLines);
    // 如果没有画任何内容，则重置画布
    if (!hasCanUseLines) {
      that.canvasReset();
      dragBg();
      return this;
    }
    that.ctxBack.clearRect(0, 0, that.width, that.height);
    that.ctx.clearRect(0, 0, that.width, that.height);

    // 重绘
    that.lines.forEach(function (item) {
      if (item) {
        // 使用副本画布进行绘制，以方便后面绘制背景色/图
        item.draw(widthRate, heightRate, true, that.devicePixelRatio);
      }
    });


    // 重绘背景
    if (bgConfig.bgType == 'color' && bgConfig.bgColor == 'transparent') {
      that.ctx.save(); // 先保存主画布的状态
      that.ctx.shadowBlur = 0; // 然后设置主画布的shadowBlur为0，以解决浏览器宽高改变后重新绘制会导致绘制的内容有边框的问题
      that.ctx.drawImage(that.canvasBack, 0, 0, that.width * devicePixelRatio, that.height * devicePixelRatio, 0, 0, that.width, that.height);
      that.ctx.restore(); // 恢复主画布的状态
      return this;
    }
    dragBg();
    return this;
  };
  /**
   * 获取画布位置及宽高
   * @returns {{x: number, width: number, y: number, height: number}}
   */
  Tablet.prototype.getRect = function () {
    var w = this.width,
      h = this.height;
    if (this.degree == 90 || this.degree == -90) {
      w = this.height;
      h = this.width;
    }
    var offset = tool.offset(this.canvas);
    return {
      x: offset.left,
      y: offset.top,
      width: w,
      height: h
    };
  };
  /**
   * 判断是否有可用线条
   * @returns {boolean}
   */
  Tablet.prototype.hasCanUseLine = function () {
    var hasCanUseLines = this.lines.some(function (line) {
      return !!line;
    });
    return hasCanUseLines;
  };
  /**
   * 设置画笔颜色
   * @param color 颜色值，可以是任何css的颜色表达式
   * @returns {Tablet}
   */
  Tablet.prototype.setColor = function (color) {
    var that = this;
    that.ctx.beginPath();
    if (!color) {
      console.error('color is required!');
      return this;
    }
    that.lineConfig.strokeStyle = color;

    that.ctx.strokeStyle = color;
    that.ctxBack.strokeStyle = color;
    if (!that.isMobile) {
      that.lineConfig.shadowColor = color;
      that.ctx.shadowColor = color;
      that.ctxBack.shadowColor = color;
    }
    return this;
  };
  /**
   * 设置画笔粗细
   * @param number 画笔的粗细，必须是一个数值
   * @returns {Tablet}
   */
  Tablet.prototype.setLineWidth = function (number) {
    var that = this;
    number = parseFloat(number);
    if (isNaN(number)) {
      console.error('number is required a Number!');
      return this;
    }

    that.lineConfig.lineWidth = number;

    that.ctx.beginPath();
    that.ctxBack.beginPath();

    that.ctx.lineWidth = number;
    that.ctxBack.lineWidth = number;
    return this;
  };
  /**
   * 设置背景颜色
   * @param bgColor 颜色值
   * @param {x: number} 绘制起始x点
   * @param {y: number} 绘制起始y点
   * @param {width: number} 绘制的宽度
   * @param {height: number} 绘制的高度
   * * @param {addToOperationRecord: boolean} 是否将此操作添加到操作历史中
   * @returns {Tablet}
   */
  Tablet.prototype.setBackgroundColor = function (bgColor, x, y, width, height, addToOperationRecord) {
    var canvasRect = this.getRect();
    var that = this,
      newWidth = width > 0 ? width : canvasRect.width,
      newHeight = height > 0 ? height : canvasRect.height,
      devicePixelRatio = this.devicePixelRatio;
    x = x > 0 ? x : 0;
    y = y > 0 ? y : 0;

    this.bgConfig.bgType = 'color';
    this.bgConfig.bgColor = bgColor;
    this.bgConfig.bgImg = null;
    this.bgConfig.x = x;
    this.bgConfig.y = y;
    this.bgConfig.width = width;
    this.bgConfig.height = height;

    var ctx = this.ctx;
    // 清除原先绘制的内容
    ctx.clearRect(x, y, newWidth, newHeight);

    // 设置背景颜色
    ctx.fillStyle = bgColor;
    ctx.save(); // 保存画布当前的状态
    ctx.shadowBlur = 0; // 绘制背景时不设置阴影，以免出现绘制的线条出现边框的情况
    ctx.fillRect(x, y, newWidth, newHeight);

    // ctx.beginPath();
    if (this.hasCanUseLine()) {
      // 将原先绘制的内容绘制回去，绘制时原还不的大小需要乘以devicePixelRatio，否则会出现内容绘制不全的问题
      console.log('重新绘制', x, y, newWidth * devicePixelRatio, newHeight * devicePixelRatio, x, y, newWidth, newHeight);
      that.ctx.drawImage(that.canvasBack, x, y, newWidth * devicePixelRatio, newHeight * devicePixelRatio, x, y, newWidth, newHeight);
    }
    ctx.restore();
    addToOperationRecord = typeof addToOperationRecord == 'undefined' ? true : false;
    if (addToOperationRecord) {
      console.log('addOperationRecord bgColor');
      this.operationRecords.push(new OperationRecord({
        type: 'bgColor',
        tablet: this,
        lines: this.lines,
        bgConfig: this.bgConfig
      }));
    }
    return this;
  };
  /**
   * 设置背景图片
   * @param {img: dom|url} img dom对象或图片地址
   * @param {x: number} 绘制起始x点
   * @param {y: number} 绘制起始y点
   * @param {width: number} 绘制的宽度
   * @param {height: number} 绘制的高度
   * @param {onImgLoading: function} 图片加载中回调
   * @param {onFail: function} 绘制失败回调
   * @param {addToOperationRecord: boolean} 是否将此操作添加到操作历史中
   * @returns {boolean}
   */
  Tablet.prototype.setBackgroundImage = function (img, x, y, width, height, onImgLoading, onFail, addToOperationRecord) {
    if (!img) {
      console.error('setBackgroundImage函数必须传递一个图片url地址或图片dom对象！');
      return false;
    }

    var that = this;
    var devicePixelRatio = this.devicePixelRatio;
    var imgLoad = function () {
      var canvasRect = that.getRect();
      x = x > 0 ? x : 0;
      y = y > 0 ? y : 0;
      var newWidth = width > 0 ? width : canvasRect.width;
      var newHeight = height > 0 ? height : canvasRect.height;
      var ctx = that.ctx;
      that.bgConfig.bgType = 'img';
      that.bgConfig.bgImg = img;
      that.bgConfig.bgColor = '';
      that.bgConfig.x = x;
      that.bgConfig.y = y;
      that.bgConfig.width = width;
      that.bgConfig.height = height;
      typeof onImgLoading === 'function' && onImgLoading({ statusCode: 2, status: 'ok', img: img });
      // 清除原先绘制的内容
      ctx.clearRect(x, y, newWidth, newHeight);
      ctx.save();
      ctx.shadowBlur = 0; // 绘制背景时不设置阴影，以免出现绘制的线条出现边框的情况
      // 绘制图片
      ctx.drawImage(img, x, y, newWidth, newHeight);
      if (that.hasCanUseLine()) {
        // 将原先绘制的内容绘制回去，绘制时原还不的大小需要乘以devicePixelRatio，否则会出现内容绘制不全的问题
        console.log('重新绘制', x, y, newWidth * devicePixelRatio, newHeight * devicePixelRatio, x, y, newWidth, newHeight);
        ctx.drawImage(that.canvasBack, x, y, newWidth * devicePixelRatio, newHeight * devicePixelRatio, x, y, newWidth, newHeight);
      }
      ctx.restore();
      addToOperationRecord = typeof addToOperationRecord == 'undefined' ? true : false;
      if (addToOperationRecord) {
        console.log('addOperationRecord bgImg');
        that.operationRecords.push(new OperationRecord({
          type: 'bgImg',
          tablet: that,
          lines: that.lines,
          // linesIndex: that.lines.length - 1,
          bgConfig: that.bgConfig
        }));
      }
      console.log('图片绘制完成');
    };
    var imgLoadError = function () {
      console.error('图片加载失败,不能进行绘制');
      typeof onFail === 'function' && onFail();
    };
    if (typeof img == 'string') {
      typeof onImgLoading === 'function' && onImgLoading({ statusCode: 1, status: 'loading' });
      var url = img;
      img = new Image();
      img.onload = imgLoad;
      img.onerror = imgLoadError;
      img.src = url;
    } else {
      // complete属性若为true，则表示图片已经加载完成
      if (!img.complete) {
        img.onload = imgLoad;
        img.onerror = imgLoadError;
      } else {
        imgLoad();
      }
    }
  };
  /**
   * 设置canvas的宽高
   * @param { width: number } canvas的宽度
   * @param { height: number } canvas的高度
   * @returns {Tablet}
   */
  Tablet.prototype.setCanvasWH = function (width, height) {
    if (!width || !height) { // 如果外部没有传递宽高，则取画布元素的宽高
      var tablet = this.tabletEl;
      var bl = parseFloat(tool.getStyle(tablet, 'border-left-width')),
        br = parseFloat(tool.getStyle(tablet, 'border-right-width')),
        bt = parseFloat(tool.getStyle(tablet, 'border-top-width')),
        bb = parseFloat(tool.getStyle(tablet, 'border-bottom-width')),
        pl = parseFloat(tool.getStyle(tablet, 'padding-left')),
        pr = parseFloat(tool.getStyle(tablet, 'padding-right')),
        pt = parseFloat(tool.getStyle(tablet, 'padding-top')),
        pb = parseFloat(tool.getStyle(tablet, 'padding-bottom'));
      this.width = tablet.offsetWidth - bl - br - pl - pr;
      this.height = tablet.offsetHeight - bt - bb - pt - pb;
      if (this.width <= 0) { // 如果画布没有宽度，则取画布父级元素的宽度
        this.width = this.container.offsetWidth;
      }
      if (this.height <= 0) { // 如果画布没有高度，则取画布父级元素的高度
        this.height = this.container.offsetHeight;
        if (this.height <= 0) {
          this.height = this.config.defaultHeight;
        }
      }
    } else {
      this.width = width;
      this.height = height;
    }
    var canvas = this.canvas;
    var canvasBack = this.canvasBack;
    var ctx = this.ctx;
    var ctxBack = this.ctxBack;

    var lineConfig = this.lineConfig;
    // 根据屏幕像素比优化canvas
    var devicePixelRatio = this.devicePixelRatio = (window.devicePixelRatio || 1);
    if (devicePixelRatio && devicePixelRatio > 1) {
      var canvasW = this.width * devicePixelRatio;
      var canvasH = this.height * devicePixelRatio;
      tool.setCss(canvas, 'width', this.width);
      tool.setCss(canvas, 'height', this.height);
      tool.setCss(canvasBack, 'width', this.width);
      tool.setCss(canvasBack, 'height', this.height);
      canvas.width = canvasW;
      canvas.height = canvasH;
      canvasBack.width = canvasW;
      canvasBack.height = canvasH;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      ctxBack.scale(devicePixelRatio, devicePixelRatio);
      ctx.clearRect(0, 0, canvasW, canvasH);
      ctxBack.clearRect(0, 0, canvasW, canvasH);
    } else {
      canvas.width = this.width;
      canvas.height = this.height;
      canvasBack.width = this.width;
      canvasBack.height = this.height;
      ctx.clearRect(0, 0, this.width, this.height);
      ctxBack.clearRect(0, 0, this.width, this.height);
    }
    // 重置画笔样式
    for (var attr in lineConfig) {
      ctx[attr] = lineConfig[attr];
      ctxBack[attr] = lineConfig[attr];
    }
    return this;
  };
  /**
   * canvas重置。重置时会使用最后一次的属性进行重置
   * @returns {Tablet}
   */
  Tablet.prototype.canvasReset = function () {
    var that = this;
    var lineConfig = this.lineConfig;
    for (var attr in lineConfig) {
      that.ctx[attr] = lineConfig[attr];
      that.ctxBack[attr] = lineConfig[attr];
    }
    // 移动端性能太弱, 不适合模糊，去掉模糊可以提高手写渲染速度。pc端添加模糊为了去除锯齿
    if (!that.isMobile) {
      that.ctx.shadowBlur = lineConfig.shadowBlur;
      that.ctx.shadowColor = lineConfig.shadowColor;
      that.ctxBack.shadowBlur = lineConfig.shadowBlur;
      that.ctxBack.shadowColor = lineConfig.shadowColor;
    }
    return this;
  };
  /**
   * 回退步骤
   * @returns {Tablet}
   */
  Tablet.prototype.revoke = function () {
    var operationRecords = this.operationRecords;
    var that = this;
    if (operationRecords.length == 0) {
      return this;
    }
    var step = operationRecords.length - 1;
    var operation = operationRecords.splice(step, 1);
    console.log('step', step, operation[0], operation[0].linesIndex);
    // 移除操作步骤中对应的线条
    if (operation[0].linesIndex > -1) {
      this.removeLine(operation[0].linesIndex);
    }
    // 如果没有操作步骤了，则清空画布
    if (operationRecords.length == 0) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctxBack.clearRect(0, 0, this.width, this.height);
      // 绘制默认背景
      var drawBg = function (bgConfig) {
        if (bgConfig.bgType == 'color') {
          that.setBackgroundColor(bgConfig.bgColor, -1, -1, -1, -1, false);
        } else if (bgConfig.bgType == 'img') {
          that.setBackgroundImage(bgConfig.bgImg, -1, -1, -1, -1, null, null, false);
        }
      };
      drawBg({
        bgType: this.config.defaultBgType,
        bgColor: this.config.defaultBackgroundColor,
        bgImg: this.config.defaultBgImg
      });
      return this;
    }
    var nextOperation = operationRecords[step - 1];
    nextOperation.exec();
    return this;
  };
  /**
   * 清屏
   * @returns {Tablet}
   */
  Tablet.prototype.clear = function (clearPoints) {
    var w = this.width,
      h = this.height;
    clearPoints = typeof clearPoints === 'undefined' ? false : !!clearPoints;
    if (this.config.onBeforeClear && (typeof this.config.onBeforeClear === "function")) {
      var flag = this.config.onBeforeClear.call(this);
      if (flag === false) {
        return this;
      }
    }
    if (this.degree == 90 || this.degree == -90) {
      w = this.height;
      h = this.width;
    }
    this.ctx.clearRect(0, 0, w, h);
    this.ctxBack.clearRect(0, 0, w, h);
    if (clearPoints) {
      this.operationRecords = [];
      this.lines = [];
    }

    this.config.onClear && (typeof this.config.onClear === "function") && this.config.onClear.call(this);
    return this;
  };
  /**
   * 移除线条
   * @param indexOrLine 线条索引或线条对象
   * @returns {Tablet}
   */
  Tablet.prototype.removeLine = function (indexOrLine) {
    var lines = this.lines;
    console.log('indexOrLine', indexOrLine);
    if (typeof indexOrLine == 'number') {
      lines.splice(indexOrLine, 1, null);
      console.log('lines', lines);
    } else if (typeof indexOrLine == 'object') {
      var index = -1;
      for (var i = 0, len = lines.length; i < len; i++) {
        if (lines[i] == indexOrLine) {
          index = i;
          break;
        }
      }
      lines.splice(index, 1, null);
    }
    return this;
  };
  /**
   * 获取图片的base64数据
   * @param {type: string} 生成的图片格式，只有png、jpg两个选项
   * @param {angle: number} 图片旋转的角度
   * @returns {string}
   */
  Tablet.prototype.getBase64 = function (type, angle) {
    var that = this;
    if (!type) {
      type = "image/png";
    } else {
      var _type = type.toLowerCase();
      if (_type === "png") {
        type = "image/png";
      } else if (_type === "jpg" || _type === "jpeg") {
        type = "image/jpg";
      }
    }
    var base64Img = '';
    if (!angle) {
      base64Img = this.canvas.toDataURL(type, 1);
    } else {
      var width = this.width;
      var height = this.height;
      // 根据屏幕像素比优化canvas
      var devicePixelRatio = this.devicePixelRatio;
      if (devicePixelRatio && devicePixelRatio > 1) {
        width = width * devicePixelRatio;
        height = height * devicePixelRatio;
      }
      if (angle === -90) {
        angle = 270;
      }

      // 计算弧度
      var radian = (angle * Math.PI) / 180;
      // 计算方向
      var direction = (angle / 90) % 4;
      var newCanvas = document.createElement('canvas');
      var newCanvasCtx = newCanvas.getContext('2d');

      if (direction === 0) {
        newCanvas.width = width;
        newCanvas.height = height;
        newCanvasCtx.drawImage(this.canvas, 0, 0);
      } else if (direction === 1) {
        newCanvas.width = height;
        newCanvas.height = width;
        newCanvasCtx.translate(newCanvas.width * 0.5, newCanvas.height * 0.5);
        newCanvasCtx.rotate(radian);
        newCanvasCtx.drawImage(this.canvas, -newCanvas.height / 2, -newCanvas.width / 2);
        // newCanvasCtx.restore();
      } else if (direction === 2) {
        newCanvas.width = width;
        newCanvas.height = height;
        newCanvasCtx.translate(width * 0.5, height * 0.5);
        newCanvasCtx.rotate(radian);
        newCanvasCtx.drawImage(this.canvas, -newCanvas.width / 2, -newCanvas.height / 2);
      } else if (direction === 3) {
        newCanvas.width = height;
        newCanvas.height = width;
        newCanvasCtx.translate(newCanvas.width * 0.5, newCanvas.height * 0.5);
        newCanvasCtx.rotate(radian);
        newCanvasCtx.drawImage(this.canvas, -newCanvas.height / 2, -newCanvas.width / 2);
      }
      base64Img = newCanvas.toDataURL(type, 1);
      newCanvas = null;
      newCanvasCtx = null;
    }
    return base64Img;
  };
  /**
   * 获取图片的二进制数据
   * @param {type: string} 图片的后缀
   * @returns {Blob}
   */
  Tablet.prototype.getBlob = function (type, angle) {
    var that = this,
      base64Img = this.getBase64(type, angle),
      arr = base64Img.split(","),
      // mime类型
      mime = arr[0].match(/:(.*?);/)[1],
      bStr = atob(arr[1]),
      len = bStr.length,
      u8arr = new Uint8Array(len);
    while (len--) {
      u8arr[len] = bStr.charCodeAt(len);
    }
    return new Blob([u8arr], { type: mime });
  };
  /*
      生成前面板html
  */
  Tablet.prototype.buildTablet = function () {
    var html = '',
      flex = '',
      tempDiv = document.createElement('div');
    /*if (this.isMobile) {
      flex = 'flex ';
    }*/
    html += '<div class="-tablet ' + flex + this.config.extraClass + '" id="' + this.id + '">';
    html += '    <div class="-canvas-wrapper">';
    html += '        <canvas class="tablet-canvas" style="cursor: crosshair;display: none;"></canvas>'; // 默认隐藏画布，以方便在初始化时好获取高度
    html += '        <canvas class="backup-canvas" style="display: none;"></canvas>';
    html += '    </div>';
    html += '</div>';
    tempDiv.innerHTML = html;

    return tempDiv.firstChild;
  };
  /**
   *  获取x、y轴的最大、最小值，并返回一个对象
   * @param { xPoints: array } x轴的所有坐标点
   * @param { yPoints: array } y轴的所有坐标点
   * @returns {{top: number, left: number, bottom: number, right: number}}
   */
  Tablet.getMax = function (xPoints, yPoints) {
    var obj = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    if (({}).toString.call(xPoints) !== "[object Array]" || ({}).toString.call(yPoints) !== "[object Array]") {
      return obj;
    }
    obj.left = Math.min.apply(null, xPoints);
    obj.right = Math.max.apply(null, xPoints);
    obj.top = Math.min.apply(null, yPoints);
    obj.bottom = Math.max.apply(null, yPoints);
    return obj;
  };
  /**
   * 获取画布内容像素颜色
   * @returns {{}}
   */
  Tablet.prototype.getTabletImageColors = function () {
    // 获取像素数据
    // let data = this.getImageData();
    var data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    console.log('data', data);
    var hexCache = {};
    var toHex = function (a) {
      if (a in hexCache) {
        return hexCache[a];
      }
      var hex = a.toString(16);
      if (hex.length == 1) {
        hex = "0" + hex;
      } else {
        hex = hex;
      }
      hexCache[a] = hex;
      return hex;
    };

    var colorCache = {};
    var toColor = function (r, g, b, a) {
      var prop = r + '_' + g + '_' + b + '_' + a;
      if (prop in colorCache) {
        return colorCache[prop];
      }
      var s = [];
      s.push(toHex(r));
      s.push(toHex(g));
      s.push(toHex(b));
      s.push(toHex(a));
      var color = s.join('');
      colorCache[prop] = color;
      console.log('color, alpha', color, Math.round(a / 255 * 100) / 100);
      return color;
    }

    var map = {};
    for (var i = 0; i < data.length; i += 4) {
      var r = data[i];
      var g = data[i + 1];
      var b = data[i + 2];
      var a = data[i + 3];
      var c = toColor(r, g, b, a);

      if (map[c]) {
        map[c]++;
      } else {
        map[c] = 1;
      }
    }
    return map;
  };

  /**
   * 判断画布中是否有内容
   * @param singleColorCountMin 单个颜色最少数量，默认5
   * @param totalColorCountMin 总颜色数量，默认为2
   * @returns {boolean}
   */
  Tablet.prototype.hasContent = function (singleColorCountMin, totalColorCountMin) {
    var hasCanUseLine = this.hasCanUseLine();
    var colors = this.getTabletImageColors();
    if (!singleColorCountMin) {
      singleColorCountMin = 5;
    }
    if (!totalColorCountMin) {
      totalColorCountMin = 2;
    }
    if (!hasCanUseLine) {
      var filteredColors = {};
      var filteredColorCount = 0;
      for (var color in colors) {
        var count = colors[color];
        if (count > singleColorCountMin) {
          filteredColors[color] = count;
          filteredColorCount++;
        }
      }
      return filteredColorCount >= totalColorCountMin;
    }
    return true;
  };
  /**
   * 销毁画布
   */
  Tablet.prototype.destroy = function () {
    var canvas = this.canvas;
    var canvasBack = this.canvasBack;
    tool.setCss(canvas, 'cursor', 'default');
    // 移除事件
    ["touchend", "mouseleave", "mouseup", "touchstart", "touchmove", "mousedown", "mousemove", "touchend", "mouseup"].forEach(function (event, index) {
      tool.off(canvas, event);
      tool.off(canvasBack, event);
    });

    canvas = this.canvas = null;
    this.ctx = null;
    canvasBack = this.canvasBack = null;
    this.ctxBack = null;
    this.tabletEl = null;
    this.container = null;
    this.lines = [];
    this.operationRecords = [];
    if (typeof this._removeResizeEventFn === 'function') {
      this._removeResizeEventFn();
      this._removeResizeEventFn = null;
    }
  };


  var tool = {
    // 获取浏览器宽高
    getDocumentWidthHeight () {
      if (window.innerHeight != null) {
        return {
          width: window.innerWidth,
          height: window.innerHeight,
        };
      } else if (document.compatMode === 'CSS1Compat') {
        // 怪异模式浏览器
        return {
          width: document.documentElement.scrollWidth,
          height: document.documentElement.scrollHeight,
        };
      }
      return {
        width: document.body.scrollWidth,
        height: document.body.scrollHeight,
      };
    },
    /**
     * 获取元素距浏览器最顶部及最左边的距离
     * @param ele dom元素
     */
    offset (ele) {
      var positon = {
        top: 0,
        left: 0,
      };
      var offsetParent = ele.offsetParent;
      positon.top = ele.offsetTop;
      positon.left = ele.offsetLeft;
      while (offsetParent != null) {
        positon.top += offsetParent.offsetTop;
        positon.left += offsetParent.offsetLeft;
        offsetParent = offsetParent.offsetParent;
      }
      return positon;
    },
    /**
     * 获取浏览器垂直滚动条的位置
     */
    scrollTop () {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    },
    /**
     * 获取浏览器水平滚动条的位置
     */
    scrollLeft () {
      return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    },
    /**
     * 给指定元素添加class
     * @param ele
     * @param classname
     */
    addClass (ele, classname) {
      if (!ele || !classname || ele.nodeType !== 1) {
        return;
      }
      var classArr = classname.split(' ');
      if (ele.classList) {
        for (var i = 0, len = classArr.length; i < len; i++) {
          var item = classArr[i];
          if (!ele.classList.contains(item)) {
            ele.classList.add(item);
          }
        }
        return ele;
      } else {
        var classNameArr = ele.className && ele.className.length > 0 ? ele.className.split(' ') : [];
        if (classNameArr.length === 0) {
          ele.className = classname;
          return;
        }
        // 合并两个数组
        Array.prototype.push.apply(classNameArr, classArr);
        classNameArr = tool.arrayNoReapeat(classNameArr);
        ele.className = classNameArr.join(' ');
        return ele;
      }
    },
    /**
     * 数组去重
     * @param arr 需要去重的数组
     * @param isObjectValue 数组的值是否是引用类型
     */
    arrayNoReapeat (arr, isObjectValue) {
      if (!arr || arr.length === 0) {
        return arr;
      }
      isObjectValue = typeof isObjectValue === 'undefined' ? false : !!isObjectValue;
      var arrLen = arr.length;
      let newArr = [];
      // 值类型的数组，使用对象属性唯一的特性来去重
      if (!isObjectValue) {
        var obj = {};
        for (var i = 0; i < arrLen; i++) {
          obj[arr[i]] = 1;
        }
        for (var attr in obj) {
          newArr.push(attr);
        }
        return newArr;
      }

      newArr.push(arr[0]);
      for (var i = 1; i < arrLen; i++) {
        let item = arr[i];
        let repeat = false;
        for (var j = 0; j < newArr.length; j++) {
          if (item === arr[j]) {
            repeat = true;
            break;
          }
        }
        if (!repeat) {
          newArr.push(item);
        }
      }
      return newArr;
    },
    /**
     * 给指定元素移除class
     * @param ele
     * @param classname
     */
    removeClass (ele, classname) {
      if (!ele || !classname || ele.nodeType !== 1) {
        return;
      }
      var classArr = classname.split(' ');
      if (ele.classList) {
        for (var i = 0, len = classArr.length; i < len; i++) {
          var item = classArr[i];
          if (ele.classList.contains(item)) {
            ele.classList.remove(item);
          }
        }
        return ele;
      } else {
        var classNameArr = ele.className && ele.className.length > 0 ? ele.className.split(' ') : [];
        if (classNameArr.length === 0) {
          return;
        }
        for (var i = classNameArr.length; i >= 0; i--) {
          for (var j = 0, len2 = classArr.length; j < len2; j++) {
            if (classNameArr[i] === classArr[j]) {
              classNameArr.splice(i, 1);
            }
          }
        }
        ele.className = classNameArr.join(' ');
        return ele;
      }
    },
    /**
     * 判断元素是否包含指定className
     * @param ele dom元素
     * @param className className
     * @returns {boolean}
     */
    hasClass (ele, className) {
      if (!ele || !ele.nodeName) {
        console.error('ele 必须是一个dom元素');
        return;
      }
      if (!className) {
        console.error('className 必须是一个字符串');
        return;
      }
      if (ele.classList) {
        return ele.classList.contains(className);
      } else {
        var flag = false;
        var classNameArr = ele.className.split(' ');
        for (var i = 0, len = classNameArr.length; i < len; i++) {
          if (classNameArr[i] === className) {
            flag = true;
            break;
          }
        }
        return flag;
      }
    },
    /**
     * 获取元素的css属性值
     * @param ele dom元素
     * @param cssAttribute css属性名称
     */
    getStyle (ele, cssAttribute) {
      if (!ele || !ele.nodeName) {
        console.error('ele 必须是一个dom元素');
        return;
      }
      if (!cssAttribute) {
        console.error('cssAttribute 必须是一个字符串');
        return;
      }
      var val = '';
      if (window.getComputedStyle) {
        val = window.getComputedStyle(ele, null)[cssAttribute];
      } else if (ele.currentStyle) {
        val = ele.currentStyle[cssAttribute];
      }
      if (!isNaN(parseFloat(val))) {
        return parseFloat(val);
      } else {
        return val;
      }
    },
    /**
     * 给元素设置css属性
     * @param ele dom元素
     * @param attr css属性名
     * @param val css属性值，如果不传递attr参数，则该参数可以为一个对象，就像jquery的css()方法一样
     */
    setCss (ele, attrs, val) {
      if (!ele || !ele.nodeName) {
        console.error('ele 必须是一个dom元素');
        return;
      }
      var type1 = ({}).toString.call(attrs);
      // 需要字段加单位的css属性
      var autoAddUnitAttr = {
        width: 1,
        height: 1,
        margin: 1,
        padding: 1,
        borderRadius: 1,
        top: 1,
        left: 1,
        marginLeft: 1,
        marginRight: 1,
        marginTop: 1,
        marginBottom: 1,
        right: 1,
        bottom: 1,
        paddingLeft: 1,
        paddingRight: 1,
        paddingTop: 1,
        paddingBottom: 1,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        fontSize: 1,
        lineHeight: 1,
        textIndent: 1,
        minWidth: 1,
        maxWith: 1,
      };
      if (type1 === '[object String]' && typeof val !== 'undefined') {
        attrs = attrs.replace(/\-(\w)/g, function (matched, $1) {
          return $1.toUpperCase();
        });
        if (attrs in autoAddUnitAttr && !isNaN(Number(val))) {
          ele.style[attrs] = val + 'px';
        } else {
          ele.style[attrs] = val;
        }
      } else if (type1 === '[object Object]') {
        var style = ele.style;
        for (var attr in attrs) {
          var val2 = attrs[attr];
          var isNumber = Number(val2);

          attr = attr.replace(/\-(\w)/g, function (matched, $1) {
            return $1.toUpperCase();
          });

          if (attr in autoAddUnitAttr && !isNaN(isNumber)) {
            style[attr] = val2 + 'px';
          } else {
            style[attr] = val2;
          }
        }
      }
      return this;
    },
    /**
     * 获取兄弟节点
     * @param elm
     * @returns {Array}
     */
    siblings (elm) {
      var a = [];
      var p = elm.parentNode.children;
      for (var i = 0, pl = p.length; i < pl; i++) {
        if (p[i] !== elm) a.push(p[i]);
      }
      return a;
    },
    /**
     * 判断两个元素是否是包含关系
     * @param ele 父元素
     * @param childEle 子元素
     * @returns {Boolean}
     */
    elementContains (ele, childEle) {
      if (ele === childEle) {
        return false;
      }
      if (typeof ele.contains === 'function') {
        return ele.contains(childEle);
      } else {
        while (true) {
          if (!childEle) {
            return false;
          }
          if (childEle === ele) {
            return true;
          } else {
            childEle = childEle.parentNode;
          }
        }
        return false;
      }
    },

    /**
     * 绑定事件
     * @param ele dom元素
     * @param eventName 事件名称
     * @param fn 事件回调函数
     */
    on: function (ele, eventName, fn) {
      if (!ele) {
        console.error('on(ele, eventName, fn)函数第一个参数必须是一个dom元素!');
        return this;
      }
      if (!eventName || typeof eventName !== 'string') {
        console.error('on(ele, eventName, fn)函数第二个参数必须是一个字符串!');
        return this;
      }
      if (!fn || typeof fn !== 'function') {
        console.error('on(ele, eventName, fn)函数第三个参数必须是一个函数!');
        return this;
      }
      if (!ele._events) {
        ele._events = {};
      }

      if (!(eventName in ele._events)) {
        ele._events[eventName] = [fn];
        if (document.addEventListener) {
          var eventFn = function (e) {
            var events = ele._events[eventName];
            if (events && events.length > 0) {
              for (var i = 0, len = events.length; i < len; i++) {
                if (events[i]) {
                  events[i].call(ele, e);
                }
              }
            }
          };
          ele.addEventListener(eventName, eventFn, false);
          // 把事件回调函数也存起来，这样在移除事件的时候才能真正的把该事件移除掉
          ele._events[eventName + '_fn'] = eventFn;
        } else if (window.attachEvent) {
          var eventFn = function () {
            var events = ele._events[eventName];
            var e = window.event;
            e.preventDefault = function () {
              e.returnValue = false;
            };
            e.stopPropagation = function () {
              e.cancelBubble = true;
            };
            for (var i = 0, len = events.length; i < len; i++) {
              events[i].call(ele, e);
            }
          };
          ele.attachEvent('on' + eventName, eventFn);
          ele._events[eventName + '_fn'] = eventFn;
        }
      } else {
        //ele._events[eventName] = [fn];
        var index = this.getIndex(ele._events[eventName], function (item) {
          return item === fn;
        });
        if (index < 0 || typeof index === 'undefined') {
          ele._events[eventName].push(fn);
        }
      }
      return this;
    },
    /**
     * 解绑事件
     * @param ele dom元素
     * @param eventName 事件名称
     * @param fn 事件回调函数
     */
    off: function (ele, eventName, fn) {
      if (!ele) {
        console.error('off(ele, eventName, fn)函数第一个参数必须是一个dom元素!');
        return;
      }
      if (!eventName || typeof eventName !== 'string') {
        console.error('off(ele, eventName, fn)函数第二个参数必须是一个字符串!');
        return;
      }
      if (!ele._events) {
        return this;
      }
      if (!eventName) {
        return this;
      }
      console.log('off', eventName, ele);
      var events = ele._events[eventName];
      var eventFn = ele._events[eventName + '_fn'];
      // 如果只传递了事件名称而未传递具体的事件，则将指定事件名称的所有回调函数全部清除
      if (eventName && !fn) {
        if (document.removeEventListener) {
          //for(var i = 0, len = events.length; i < len; i++){
          ele.removeEventListener(eventName, eventFn, false);
          //}
        } else if (window.detachEvent) {
          //for(var i = 0, len = events.length; i < len; i++){
          ele.detachEvent('on' + eventName, eventFn);
          //}
        }
        delete ele._events[eventName];
        delete ele._events[eventName + '_fn'];
      } else if (eventName && fn) {
        if (!events) {
          return;
        }
        if (document.removeEventListener) {
          var index = this.getIndex(events, function (item) {
            return item === fn;
          });
          if (index > -1) {
            events.splice(index, 1);
          }
          if (events.length === 0) {
            delete ele._events[eventName];
            delete ele._events[eventName + '_fn'];
          }
        } else if (window.detachEvent) {
          if (!events) {
            return;
          }
          var index = this.getIndex(events, function (item) {
            return item === fn;
          });
          if (index > -1) {
            events.splice(index, 1);
          }
          if (events.length === 0) {
            delete ele._events[eventName];
            delete ele._events[eventName + '_fn'];
          }
        }
      }
      events = null;
      return this;
    },

    /**
     * 获取数组中符合条件的元素的索引
     * @param arr 数组
     * @param fn 一个函数，如果函数返回true，则返回该项的下标，如果没有找到则返回-1
     */
    getIndex (arr, fn) {
      if (!arr || arr.length === 0 || !fn || (typeof fn !== 'function')) {
        return -1;
      }

      if (arr.findIndex) {
        return arr.findIndex(fn);
      }
      var len = arr.length;
      var i = 0;
      var index = -1;
      for (; i < len; i++) {
        var item = arr[i];
        if (fn(item, index, arr) === true) {
          index = i;
          break;
        }
      }
      return index;
    },
    /**
     * 对象/数组拷贝，支持深拷贝（jQuery代码）
     * @returns {any}
     */
    extend: function () {
      var isFunction = function isFunction (obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
      };
      var isPlainObject = function (obj) {
        var proto, Ctor;
        // Detect obvious negatives
        // Use toString instead of jQuery.type to catch host objects
        if (!obj || toString.call(obj) !== "[object Object]") {
          return false;
        }
        proto = Object.getPrototypeOf(obj);
        // Objects with no prototype (e.g., `Object.create( null )`) are plain
        if (!proto) {
          return true;
        }
        // Objects with prototype are plain iff they were constructed by a global Object function
        Ctor = ({}).hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && ({}).toString.call(Ctor) === ({}).toString.call(Object);
      };
      var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

      // Handle a deep copy situation
      if (typeof target === "boolean") {
        deep = target;

        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
      }

      // Handle case when target is a string or something (possible in deep copy)
      if (typeof target !== "object" && !isFunction(target)) {
        target = {};
      }

      // Extend jQuery itself if only one argument is passed
      if (i === length) {
        target = this;
        i--;
      }

      for (; i < length; i++) {

        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {

          // Extend the base object
          for (name in options) {
            copy = options[name];

            // Prevent Object.prototype pollution
            // Prevent never-ending loop
            if (name === "__proto__" || target === copy) {
              continue;
            }

            // Recurse if we're merging plain objects or arrays
            if (deep && copy && (isPlainObject(copy) ||
              (copyIsArray = Array.isArray(copy)))) {
              src = target[name];

              // Ensure proper type for the source value
              if (copyIsArray && !Array.isArray(src)) {
                clone = [];
              } else if (!copyIsArray && !isPlainObject(src)) {
                clone = {};
              } else {
                clone = src;
              }
              copyIsArray = false;

              // Never move original objects, clone them
              target[name] = duesTools.extend(deep, clone, copy);

              // Don't bring in undefined values
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }

      // Return the modified object
      return target;
    },

    /**
     * 判断对象是否是一个空对象
     * @param obj
     */
    isEmptyObject (obj) {
      for (var attr in obj) {
        return false;
      }
      return true;
    },
    /**
     * 获取元素的指定父级元素
     * @param el dom 元素
     * @param className 父元素的class name
     * @returns {dom、undefined}
     */
    parents (el, className) {
      if (!el || !el.nodeName || !className) {
        return;
      }
      var classNameArr = className.split(' ');
      var parent = el.parentElement;

      while (parent) {
        var flag = true;
        for (var i = 0, len = classNameArr.length; i < len; i++) {
          if (!this.hasClass(parent, classNameArr[i])) {
            flag = false;
            break;
          }
        }
        if (flag) {
          return parent;
        } else {
          parent = parent.parentElement;
        }
      }
    },
    /**
     * 获取变量的数据类型
     * @param obj
     * @returns {string|string|"undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"}
     */
    getType: function (obj) {
      var class2type = {};
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ?
        class2type[toString.call(obj)] || "object" :
        typeof obj;
    }
  };

  return Tablet;
});
