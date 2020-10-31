/*!
* Tablet
* Tablet是一个基于canvas的在线画板，依赖jQuery！兼容各种移动设备！
*/

;(function(window) {
    function Tablet(container, config) {
        this._init(container, config);
        this._ctxInit();
    }
    Tablet._conut = 0;
    /* 内部使用，初始化前面板 */
    Tablet.prototype._init = function(_container, config) {
        var container = $(_container);

        if(container.length == 0){
            throw "第一个参数必须是包裹前面板的选择器！";
        }
        container = container.eq(0);

        var that = this;
        this.config = {
            // canvas画布是否响应式
            response: true,
            // canvas的宽度，宽高都可以传递函数
            width: 0,
            height: 0,
            // 前面板的额外class
            extraClass: "",
            // 清屏按钮的innerHTML
            clearBtnHtml: "",
            // 保存图片的innerHTML
            saveBtnHtml: "",
            // 需要添加到工具栏中的其他内容
            otherHtml: "",
            // 默认字体颜色
            defaultColor: "#000",
            // 默认背景色
            defaultBackgrondColor: "transparent",
            // 设置获取到的图片的类型，可选值png、jpg，默认png
            imgType: "png",
            // 初始化完毕后执行的函数
            onInit: function (){},
            // 清除画布前执行的函数，如果该函数返回false，则不会进行清除
            onBeforeClear: function() {},
            // 清除画布后执行的函数
            onClear: function() {}
        }
        if(config && ({}).toString.call(config) === "[object Object]"){
            $.extend(true, this.config, config);
        }
        this.container = container;
        this.id = "Tablet_LYN_" + (Tablet._conut++);
        // 设置字体颜色
        this.color = this.config.defaultColor;
        // 设置背景色
        this.bgColor = this.config.defaultBackgrondColor;

        this.isMobile = isMobile = /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent);
        this.lineConfig = {
            strokeStyle: this.config.defaultColor,
            lineWidth: 8,
            lineCap: "round",
            lineJoin: "round",
            shadowBlur: 1,
            shadowColor: this.config.defaultColor
        }
        this.container.append($(this.buildTablet()));
        this.tablet = $("#" + this.id);
        this.$canvas = this.tablet.find("canvas");
        this.canvas = this.tablet.find("canvas")[0];
        this.ctx = this.canvas.getContext("2d");
        // 用于记录当前绘制的坐标
        this.point = {x: 0, y: 0};
        // 存储所有的x、y轴坐标，以获取最大及最小值
        this.points = {
            x: [],
            y: [],
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
        // 旋转的角度
        this.degree = 0;

        if(typeof this.config.width === "function"){
            this.width = this.config.width();
        }else{
            this.width = this.config.width;
        }
        if(typeof this.config.height === "function"){
            this.height = this.config.height();
        }else{
            this.height = this.config.height;
        }

        // 设置canvas画布的宽高
        that.setCanvasWH(that.width, that.height);
        if(that.config.response && !this.isMobile){
            var event = "resize";
            event += window.onorientationchange ? " orientationchange" : "";
            $(window).on(event, function (){
                that.setCanvasWH();
                that.canvasReset();
            });
        }
        var winW = $(window).width();
        if(this.isMobile){
            if(winW >= 768){
                that.lineConfig.lineWidth = 8;
            }else if(winW < 768 && winW >= 414){
                that.lineConfig.lineWidth = 6;
            }else if(winW < 414 && winW >= 375){
                that.lineConfig.lineWidth = 4;
            }else if(winW < 375 && winW >= 320){
                that.lineConfig.lineWidth = 2;
            }
        }

        this.config.onInit && (typeof this.config.onInit === "function") && this.config.onInit.call(this);
    }
    /* 内部使用，给canvas进行一些初始化设置 */
    Tablet.prototype._ctxInit = function (){
        var that = this,
            // 画线函数
            pait = function (singal){
                switch (singal){
                    case 1:
                        /*如果是1，则表明是鼠标按下或是触摸开始，只要是鼠标按下或触摸开始则清楚之前绘制的路径，从按下的点重新开始*/
                        that.ctx.beginPath();
                        that.ctx.moveTo(that.point.x, that.point.y);
                    case 2:
                        that.ctx.lineTo(that.point.x, that.point.y);
                        that.ctx.stroke();
                        break;
                    default:
                }
            },
            clientRect = that.clientRect = that.canvas.getBoundingClientRect(),
            // 标记鼠标是否按钮或手指是否按下
            pressed = this.pressed = false,
            create = function (singal){
                return function (e){
                    e.preventDefault();

                    if(singal === 1){
                        that.pressed = true;
                    }
                    /* 如果鼠标刚按下(手指刚触摸)，或鼠标在移动中(手指在滑动中)则立即画线 */
                    if(singal === 1 || that.pressed){
                        e = that.isMobile ? e.touches[0] : e;
                        // 设置坐标值 不加0.5，整数坐标处绘制直线，直线宽度将会多1px
                        that.point.x = e.clientX - that.clientRect.left + 0.5;
                        that.point.y = e.clientY - that.clientRect.top + 0.5;
                        that.points.x.push(that.point.x);
                        that.points.y.push(that.point.y);
                        //console.log(that.point);
                        pait(singal);
                    }
                }
            }
        that.ctx.lineWidth = that.lineConfig.lineWidth;
        that.ctx.strokeStyle = that.lineConfig.strokeStyle;
        that.ctx.lineCap = that.lineConfig.lineCap;
        that.ctx.lineJoin = that.lineConfig.lineJoin;
        // 移动端性能太弱, 不适合模糊，去掉模糊可以提高手写渲染速度。pc端添加模糊为了去除锯齿
        if (!that.isMobile) {
            that.ctx.shadowBlur = that.lineConfig.shadowBlur;
            that.ctx.shadowColor = that.lineConfig.shadowColor;
        }
        var start = create(1),
            move = create(2),
            // 为了避免UI过度绘制，让move操作执行得更加流畅，因此使用requestAnimationFrame优化
           animationMove = window.requestAnimationFrame ? function(e) {
                requestAnimationFrame(function (){
                    move(e);
                });
           } : move;

        if(isMobile){
            this.canvas.addEventListener("touchstart", start);
            this.canvas.addEventListener("touchmove", move);
        }else{
            this.canvas.addEventListener("mousedown", start);
            this.canvas.addEventListener("mousemove", move);
        }
        ["touchend", "mouseleave", "mouseup"].forEach(function (event, index){
            that.canvas.addEventListener(event, function (){
                that.pressed = false;
            });
        });
    }
    /*
        设置画笔颜色
        @param { color: string } 颜色值，可以是任何css的颜色表达式
    */
    Tablet.prototype.setColor = function (color){
        var that = this;
        that.ctx.beginPath();
        if(color){
            that.color = color;
            that.lineConfig.strokeStyle = color;
        }

        that.ctx.strokeStyle = that.lineConfig.strokeStyle;
        if(!that.isMobile){
            that.lineConfig.shadowColor = color;
            that.ctx.shadowColor = that.lineConfig.shadowColor;
        }
        return this;
    }
    /*
        设置画笔粗细
        @param { lineWidth: number } 画笔的粗细，必须是一个数值
    */
    Tablet.prototype.setLineWidth = function (number){
        var that = this;
        number = parseFloat(number);
        if( isNaN(number) ){ return this; }

        that.ctx.beginPath();
        that.lineConfig.lineWidth = number;

        that.ctx.lineWidth = that.lineConfig.lineWidth;
        return this;
    }
    /*
        设置canvas的宽高
        @param { width: number } canvas的宽度
        @param { height: number } canvas的高度
    */
    Tablet.prototype.setCanvasWH = function (width, height){
        var that = this,
            $tabletBtns = this.tablet.find('.tablet-btns'),
            bt = parseFloat(this.$canvas.css("border-top-width"), 10),
            bb = parseFloat(this.$canvas.css("border-bottom-width"), 10),
            bl = parseFloat(this.$canvas.css("border-left-width"), 10),
            br = parseFloat(this.$canvas.css("border-right-width"), 10);

        // 如果没有传递高度，则默认高度为.-tablet-container 的高度减去工具栏的高度
        if(!width || !height){
            var _w = 0,
                _h = 0,
                $canvasParent = this.tablet;
            if(!that.isMobile){
                _w = $canvasParent.width();
                // canvas的高度要减去工具栏的高度
                _h = $canvasParent.height() - $tabletBtns.outerHeight();
            }else{
                var winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                _w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                _h = winH;

                that.tablet.children(".-tablet-container").css({
                    width: _w,
                    height: _h
                });
            }

            this.width = _w - bl - br;
            // $tabletBtns.outerHeight()的高度为工具栏的高度，它的高度只有在.-tablet-container的宽度设置好后才能正确获取
            this.height = _h - $tabletBtns.outerHeight() - bt- bb;
        }else{
            this.tablet.children(".-tablet-container").css({
                width: width,
                height: height
            });

            this.width = width - bl - br;
            this.height = height - $tabletBtns.outerHeight() - bt- bb;
        }
        that.clientRect = that.canvas.getBoundingClientRect();
        // 根据屏幕像素比优化canvas
        var devicePixelRatio = this.devicePixelRatio = window.devicePixelRatio;
        if(devicePixelRatio){
            this.$canvas.width(this.width);
            this.$canvas.height(this.height);
            this.canvas.width = this.width * devicePixelRatio;
            this.canvas.height = this.height * devicePixelRatio;
            this.ctx.scale(devicePixelRatio, devicePixelRatio);
        }else{
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
        return this;
    }
    /*
        canvas重置。重置时会使用最后一次的属性进行重置
    */
    Tablet.prototype.canvasReset = function (){
        var that = this;
        that.ctx.lineWidth = that.lineConfig.lineWidth;
        that.ctx.strokeStyle = that.lineConfig.strokeStyle;
        that.ctx.lineCap = that.lineConfig.lineCap;
        that.ctx.lineJoin = that.lineConfig.lineJoin;
        that.clientRect = that.canvas.getBoundingClientRect();
        // 移动端性能太弱, 不适合模糊，去掉模糊可以提高手写渲染速度。pc端添加模糊为了去除锯齿
        if (!that.isMobile) {
            that.ctx.shadowBlur = that.lineConfig.shadowBlur;
            that.ctx.shadowColor = that.lineConfig.shadowColor;
        }
        this.points = {
            x: [],
            y: [],
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
        return this;
    }
    /*
        清屏
    */
    Tablet.prototype.clear = function (){
        var w = this.width,
            h = this.height;
        if (this.config.onBeforeClear && (typeof this.config.onBeforeClear === "function")){
            var flag = this.config.onBeforeClear.call(this);
            if(flag === false){
                return;
            }
        }
        if(this.degree == 90 || this.degree == -90){
            w = this.height;
            h = this.width;
        }
        this.ctx.clearRect(0, 0, w, h);
        this.points = {
            x: [],
            y: [],
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
        this.config.onClear && (typeof this.config.onClear === "function") && this.config.onClear.call(this);
        return this;
    }
    /*
        获取图片的base64数据
    */
    Tablet.prototype.getBase64 = function (type){
        var that = this,
            position = Tablet.getMax(this.points.x, this.points.y);
        if(!type){
            type = "image/png";
        }else{
            var _type = type.toLowerCase();
            if(_type === "png"){
                type = "image/png";
            }else if(_type === "jpg" || _type === "jpeg"){
                type = "image/jpg";
            }
        }
        var base64Img = this.canvas.toDataURL(type, 1);
        return base64Img;
    }
    /*
        获取图片的二进制数据
    */
    Tablet.prototype.getBlob = function (type){
        var that = this,
            base64Img = this.getBase64(type),
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
    }
    /*
        旋转画布
        @param { degree: number } 旋转的角度
    */
    Tablet.prototype.rotate = function (degree){
        var minDeg = -90,
            maxDeg = 180,
            // canvas画布旋转的弧度
            angle = 0,
            that = this,
            // 容器平移的距离
            translateLen = 0,
            winW = $(window).width(),
            winH = $(window).height(),
            w = winW,
            h = winH,
            newCanvas = $('<canvas>');
        degree = ~~ degree;
        if(degree < minDeg){
            degree = minDeg;
        }
        if(degree > maxDeg){
            degree = maxDeg;
        }

        this.degree = degree;
        angle = degree * Math.PI / 180;
        // 旋转后把原来的canvas干掉，然后替换成新的
        this.tablet.find("canvas").remove();
        this.tablet.find(".-canvas-wrapper").append(newCanvas);

        translateLen = (winH - winW) / 2;
        switch(degree){
            case 0:
                translateLen = 0;
                break;
            case -90:
                /* 如果旋转90度，容器的宽度等于页面可视范围的高度，容器的高度等于页面可视范围的宽度 */
                w = h;
                h = winW;
                translateLen = -translateLen;
                break;
            case 90:
                /* 如果旋转-90度，容器的宽度等于页面可视范围的高度，容器的高度等于页面可视范围的宽度 */
                w = h;
                h = winW;
                break;
            case 180:
                translateLen = 0;
                break;
            default:
                translateLen = 0;
        }

        //旋转容器
        this.tablet.children().css({
            transform: "rotate(" + degree + "deg) translate(" + translateLen + "px," + translateLen + "px)",
            transformOrigin: 'center center'
        });
        //重新设置当前对象的$canvas、canvas、ctx值
        this.$canvas = this.tablet.find("canvas").eq(0);
        this.canvas = this.$canvas[0];
        this.ctx = this.canvas.getContext("2d");
        // 重新初始化ctx
        this._ctxInit();
        // 重新计算宽高
        that.setCanvasWH(w, h);
        this.canvasReset();

        // 旋转canvas坐标系，旋转的弧度为负的角度转换成弧度的值，即与容器成反方向旋转
        this.ctx.rotate(-angle);
        //平移canvas坐标系
        switch(degree){
            case 0:
                break;
            case -90:
               this.ctx.translate(0, -this.width);
                break;
            case 90:
                this.ctx.translate(-this.height, 0);
                break;
            case -180:
            case 180:
                this.ctx.translate(-this.width,-this.height);
                break;
            default:
        }
    }
    /*
        生成前面板html
    */
    Tablet.prototype.buildTablet = function() {
        var that = this,
            html = '',
            flex = '';
        if(this.isMobile){
            flex = 'flex ';
        }
        html += '<div class="-tablet ' + flex + this.config.extraClass + '" id="' + this.id + '">';
            html += '<div class="-tablet-container">';
            /*if(typeof this.config.otherHtml === "string" && this.config.otherHtml.length > 0){
                html += '    <div class="tablet-btns">';
                // html += '        <div class="clear-canvas">';
                // html += this.config.clearBtnHtml ? this.config.clearBtnHtml : '清屏';
                // html += '        </div>';
                //html += '        <div class="save-canvas-to-img">';
                //html += this.config.saveBtnHtml ? this.config.saveBtnHtml : '保存图片';
                //html += '        </div>';

                if(typeof this.config.otherHtml === "string" && this.config.otherHtml.length > 0){
                    html += this.config.otherHtml;
                }

                html += '    </div>';
            }*/
            html += '    <div class="-canvas-wrapper">';
            html += '        <canvas></canvas>';
            html += '    </div>';
            html += '</div>';
        html += '</div>';
        //html += '</div>';
        return html;
    }

    /*
        获取x、y轴的最大、最小值，并返回一个对象
        @param { xPoints: array } x轴的所有坐标点
        @param { yPoints: array } y轴的所有坐标点
    */
    Tablet.getMax = function (xPoints, yPoints){
        var obj = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
        if(({}).toString.call(xPoints) !== "[object Array]" || ({}).toString.call(yPoints) !== "[object Array]"){
            return obj;
        }
        obj.left = Math.min.apply(null, xPoints);
        obj.right = Math.max.apply(null, xPoints);
        obj.top = Math.min.apply(null, yPoints);
        obj.bottom = Math.max.apply(null, yPoints);
        return obj;
    }

    window.Tablet = Tablet;
})(window);
