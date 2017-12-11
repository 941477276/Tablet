/*!
* @Author: 李燕南-941477276@qwq.com
* @Date:   2017-12-05 14:10:40
* @Last Modified by:   李燕南
* @Last Modified time: 2017-12-11 10:58:23
*/

/* colpick.js start */
;(function($){var colpick=function(){var tpl='<div class="colpick"><div class="colpick_color"><div class="colpick_color_overlay1"><div class="colpick_color_overlay2"><div class="colpick_selector_outer"><div class="colpick_selector_inner"></div></div></div></div></div><div class="colpick_hue"><div class="colpick_hue_arrs"><div class="colpick_hue_larr"></div><div class="colpick_hue_rarr"></div></div></div><div class="colpick_new_color"></div><div class="colpick_current_color"></div><div class="colpick_hex_field"><div class="colpick_field_letter">#</div><input type="text" maxlength="6" size="6" /></div><div class="colpick_rgb_r colpick_field"><div class="colpick_field_letter">R</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_g colpick_field"><div class="colpick_field_letter">G</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_h colpick_field"><div class="colpick_field_letter">H</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_s colpick_field"><div class="colpick_field_letter">S</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_submit"></div></div>',defaults={showEvent:"click",onShow:function(){},onBeforeShow:function(){},onHide:function(){},onChange:function(){},onSubmit:function(){},colorScheme:"light",color:"3289c7",livePreview:true,flat:false,layout:"full",submit:1,submitText:"OK",height:156,polyfill:false},fillRGBFields=function(hsb,cal){var rgb=hsbToRgb(hsb);$(cal).data("colpick").fields.eq(1).val(rgb.r).end().eq(2).val(rgb.g).end().eq(3).val(rgb.b).end()},fillHSBFields=function(hsb,cal){$(cal).data("colpick").fields.eq(4).val(Math.round(hsb.h)).end().eq(5).val(Math.round(hsb.s)).end().eq(6).val(Math.round(hsb.b)).end()},fillHexFields=function(hsb,cal){$(cal).data("colpick").fields.eq(0).val(hsbToHex(hsb))},setSelector=function(hsb,cal){$(cal).data("colpick").selector.css("backgroundColor","#"+hsbToHex({h:hsb.h,s:100,b:100}));$(cal).data("colpick").selectorIndic.css({left:parseInt($(cal).data("colpick").height*hsb.s/100,10),top:parseInt($(cal).data("colpick").height*(100-hsb.b)/100,10)})},setHue=function(hsb,cal){$(cal).data("colpick").hue.css("top",parseInt($(cal).data("colpick").height-$(cal).data("colpick").height*hsb.h/360,10))},setCurrentColor=function(hsb,cal){$(cal).data("colpick").currentColor.css("backgroundColor","#"+hsbToHex(hsb))},setNewColor=function(hsb,cal){$(cal).data("colpick").newColor.css("backgroundColor","#"+hsbToHex(hsb))},change=function(ev){var cal=$(this).parent().parent(),col;if(this.parentNode.className.indexOf("_hex")>0){cal.data("colpick").color=col=hexToHsb(fixHex(this.value));fillRGBFields(col,cal.get(0));fillHSBFields(col,cal.get(0))}else{if(this.parentNode.className.indexOf("_hsb")>0){cal.data("colpick").color=col=fixHSB({h:parseInt(cal.data("colpick").fields.eq(4).val(),10),s:parseInt(cal.data("colpick").fields.eq(5).val(),10),b:parseInt(cal.data("colpick").fields.eq(6).val(),10)});fillRGBFields(col,cal.get(0));fillHexFields(col,cal.get(0))}else{cal.data("colpick").color=col=rgbToHsb(fixRGB({r:parseInt(cal.data("colpick").fields.eq(1).val(),10),g:parseInt(cal.data("colpick").fields.eq(2).val(),10),b:parseInt(cal.data("colpick").fields.eq(3).val(),10)}));fillHexFields(col,cal.get(0));fillHSBFields(col,cal.get(0))}}setSelector(col,cal.get(0));setHue(col,cal.get(0));setNewColor(col,cal.get(0));cal.data("colpick").onChange.apply(cal.parent(),[col,hsbToHex(col),hsbToRgb(col),cal.data("colpick").el,0])},blur=function(ev){$(this).parent().removeClass("colpick_focus")},focus=function(){$(this).parent().parent().data("colpick").fields.parent().removeClass("colpick_focus");$(this).parent().addClass("colpick_focus")},downIncrement=function(ev){ev.preventDefault?ev.preventDefault():ev.returnValue=false;var field=$(this).parent().find("input").focus();var current={el:$(this).parent().addClass("colpick_slider"),max:this.parentNode.className.indexOf("_hsb_h")>0?360:(this.parentNode.className.indexOf("_hsb")>0?100:255),y:ev.pageY,field:field,val:parseInt(field.val(),10),preview:$(this).parent().parent().data("colpick").livePreview};$(document).mouseup(current,upIncrement);$(document).mousemove(current,moveIncrement)},moveIncrement=function(ev){ev.data.field.val(Math.max(0,Math.min(ev.data.max,parseInt(ev.data.val-ev.pageY+ev.data.y,10))));if(ev.data.preview){change.apply(ev.data.field.get(0),[true])}return false},upIncrement=function(ev){change.apply(ev.data.field.get(0),[true]);ev.data.el.removeClass("colpick_slider").find("input").focus();$(document).off("mouseup",upIncrement);$(document).off("mousemove",moveIncrement);return false},downHue=function(ev){ev.preventDefault?ev.preventDefault():ev.returnValue=false;var current={cal:$(this).parent(),y:$(this).offset().top};$(document).on("mouseup touchend",current,upHue);$(document).on("mousemove touchmove",current,moveHue);var pageY=((ev.type=="touchstart")?ev.originalEvent.changedTouches[0].pageY:ev.pageY);change.apply(current.cal.data("colpick").fields.eq(4).val(parseInt(360*(current.cal.data("colpick").height-(pageY-current.y))/current.cal.data("colpick").height,10)).get(0),[current.cal.data("colpick").livePreview]);return false},moveHue=function(ev){var pageY=((ev.type=="touchmove")?ev.originalEvent.changedTouches[0].pageY:ev.pageY);change.apply(ev.data.cal.data("colpick").fields.eq(4).val(parseInt(360*(ev.data.cal.data("colpick").height-Math.max(0,Math.min(ev.data.cal.data("colpick").height,(pageY-ev.data.y))))/ev.data.cal.data("colpick").height,10)).get(0),[ev.data.preview]);return false},upHue=function(ev){fillRGBFields(ev.data.cal.data("colpick").color,ev.data.cal.get(0));fillHexFields(ev.data.cal.data("colpick").color,ev.data.cal.get(0));$(document).off("mouseup touchend",upHue);$(document).off("mousemove touchmove",moveHue);return false},downSelector=function(ev){ev.preventDefault?ev.preventDefault():ev.returnValue=false;var current={cal:$(this).parent(),pos:$(this).offset()};current.preview=current.cal.data("colpick").livePreview;$(document).on("mouseup touchend",current,upSelector);$(document).on("mousemove touchmove",current,moveSelector);var pageX,pageY;if(ev.type=="touchstart"){pageX=ev.originalEvent.changedTouches[0].pageX;pageY=ev.originalEvent.changedTouches[0].pageY}else{pageX=ev.pageX;pageY=ev.pageY}change.apply(current.cal.data("colpick").fields.eq(6).val(parseInt(100*(current.cal.data("colpick").height-(pageY-current.pos.top))/current.cal.data("colpick").height,10)).end().eq(5).val(parseInt(100*(pageX-current.pos.left)/current.cal.data("colpick").height,10)).get(0),[current.preview]);return false},moveSelector=function(ev){var pageX,pageY;if(ev.type=="touchmove"){pageX=ev.originalEvent.changedTouches[0].pageX;pageY=ev.originalEvent.changedTouches[0].pageY}else{pageX=ev.pageX;pageY=ev.pageY}change.apply(ev.data.cal.data("colpick").fields.eq(6).val(parseInt(100*(ev.data.cal.data("colpick").height-Math.max(0,Math.min(ev.data.cal.data("colpick").height,(pageY-ev.data.pos.top))))/ev.data.cal.data("colpick").height,10)).end().eq(5).val(parseInt(100*(Math.max(0,Math.min(ev.data.cal.data("colpick").height,(pageX-ev.data.pos.left))))/ev.data.cal.data("colpick").height,10)).get(0),[ev.data.preview]);return false},upSelector=function(ev){fillRGBFields(ev.data.cal.data("colpick").color,ev.data.cal.get(0));fillHexFields(ev.data.cal.data("colpick").color,ev.data.cal.get(0));$(document).off("mouseup touchend",upSelector);$(document).off("mousemove touchmove",moveSelector);return false},clickSubmit=function(ev){var cal=$(this).parent();var col=cal.data("colpick").color;cal.data("colpick").origColor=col;setCurrentColor(col,cal.get(0));cal.data("colpick").onSubmit(col,hsbToHex(col),hsbToRgb(col),cal.data("colpick").el)},show=function(ev){if(ev){ev.stopPropagation()}var cal=$("#"+$(this).data("colpickId"));if(ev&&!cal.data("colpick").polyfill){ev.preventDefault()}cal.data("colpick").onBeforeShow.apply(this,[cal.get(0)]);var pos=$(this).offset();var top=pos.top+this.offsetHeight;var left=pos.left;var viewPort=getViewport();var calW=cal.width();if(left+calW>viewPort.l+viewPort.w){left-=calW}cal.css({left:left+"px",top:top+"px"});if(cal.data("colpick").onShow.apply(this,[cal.get(0)])!=false){cal.show()}$("html").mousedown({cal:cal},hide);cal.mousedown(function(ev){ev.stopPropagation()})},hide=function(ev){if(ev.data.cal.data("colpick").onHide.apply(this,[ev.data.cal.get(0)])!=false){ev.data.cal.hide()}$("html").off("mousedown",hide)},getViewport=function(){var m=document.compatMode=="CSS1Compat";return{l:window.pageXOffset||(m?document.documentElement.scrollLeft:document.body.scrollLeft),w:window.innerWidth||(m?document.documentElement.clientWidth:document.body.clientWidth)}},fixHSB=function(hsb){return{h:Math.min(360,Math.max(0,hsb.h)),s:Math.min(100,Math.max(0,hsb.s)),b:Math.min(100,Math.max(0,hsb.b))}},fixRGB=function(rgb){return{r:Math.min(255,Math.max(0,rgb.r)),g:Math.min(255,Math.max(0,rgb.g)),b:Math.min(255,Math.max(0,rgb.b))}},fixHex=function(hex){var len=6-hex.length;if(len>0){var o=[];for(var i=0;i<len;i++){o.push("0")}o.push(hex);hex=o.join("")}return hex},getUniqueID=(function(){var cnt=0;return function(){cnt+=1;return cnt}})(),restoreOriginal=function(){var cal=$(this).parent();var col=cal.data("colpick").origColor;cal.data("colpick").color=col;fillRGBFields(col,cal.get(0));fillHexFields(col,cal.get(0));fillHSBFields(col,cal.get(0));setSelector(col,cal.get(0));setHue(col,cal.get(0));setNewColor(col,cal.get(0))};return{init:function(opt){opt=$.extend({},defaults,opt||{});if(typeof opt.color=="string"){opt.color=hexToHsb(opt.color)}else{if(opt.color.r!=undefined&&opt.color.g!=undefined&&opt.color.b!=undefined){opt.color=rgbToHsb(opt.color)}else{if(opt.color.h!=undefined&&opt.color.s!=undefined&&opt.color.b!=undefined){opt.color=fixHSB(opt.color)}else{return this}}}return this.each(function(){if(!$(this).data("colpickId")){var options=$.extend({},opt);options.origColor=opt.color;if(typeof opt.polyfill=="function"){options.polyfill=opt.polyfill(this)}options.input=$(this).is("input");if(options.polyfill&&options.input&&this.type==="color"){return}var id="colorpicker_"+getUniqueID();$(this).data("colpickId",id);var cal=$(tpl).attr("id",id);cal.addClass("colpick_"+options.layout+(options.submit?"":" colpick_"+options.layout+"_ns"));if(options.colorScheme!="light"){cal.addClass("colpick_"+options.colorScheme)}cal.find("div.colpick_submit").html(options.submitText).click(clickSubmit);options.fields=cal.find("input").change(change).blur(blur).focus(focus);cal.find("div.colpick_field_arrs").mousedown(downIncrement).end().find("div.colpick_current_color").click(restoreOriginal);options.selector=cal.find("div.colpick_color").on("mousedown touchstart",downSelector);options.selectorIndic=options.selector.find("div.colpick_selector_outer");options.el=this;options.hue=cal.find("div.colpick_hue_arrs");var huebar=options.hue.parent();var UA=navigator.userAgent.toLowerCase();var isIE=navigator.appName==="Microsoft Internet Explorer";var IEver=isIE?parseFloat(UA.match(/msie ([0-9]{1,}[\.0-9]{0,})/)[1]):0;var ngIE=(isIE&&IEver<10);var stops=["#ff0000","#ff0080","#ff00ff","#8000ff","#0000ff","#0080ff","#00ffff","#00ff80","#00ff00","#80ff00","#ffff00","#ff8000","#ff0000"];if(ngIE){var i,div;for(i=0;i<=11;i++){div=$("<div></div>").attr("style","height:8.333333%; filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr="+stops[i]+", endColorstr="+stops[i+1]+'); -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='+stops[i]+", endColorstr="+stops[i+1]+')";');huebar.append(div)}}else{var stopList=stops.join(",");huebar.attr("style","background:-webkit-linear-gradient(top,"+stopList+"); background: -o-linear-gradient(top,"+stopList+"); background: -ms-linear-gradient(top,"+stopList+"); background:-moz-linear-gradient(top,"+stopList+"); -webkit-linear-gradient(top,"+stopList+"); background:linear-gradient(to bottom,"+stopList+"); ")}cal.find("div.colpick_hue").on("mousedown touchstart",downHue);options.newColor=cal.find("div.colpick_new_color");options.currentColor=cal.find("div.colpick_current_color");cal.data("colpick",options);fillRGBFields(options.color,cal.get(0));fillHSBFields(options.color,cal.get(0));fillHexFields(options.color,cal.get(0));setHue(options.color,cal.get(0));setSelector(options.color,cal.get(0));setCurrentColor(options.color,cal.get(0));setNewColor(options.color,cal.get(0));if(options.flat){cal.appendTo(this).show();cal.css({position:"relative",display:"block"})}else{cal.appendTo($(this).parent());$(this).on(options.showEvent,show);cal.css({position:"absolute"})}}})},showPicker:function(){return this.each(function(){if($(this).data("colpickId")){show.apply(this)}})},hidePicker:function(){return this.each(function(){if($(this).data("colpickId")){$("#"+$(this).data("colpickId")).hide()}})},setColor:function(col,setCurrent){if(col!=undefined){setCurrent=(typeof setCurrent==="undefined")?1:setCurrent;if(typeof col=="string"){col=hexToHsb(col)}else{if(col.r!=undefined&&col.g!=undefined&&col.b!=undefined){col=rgbToHsb(col)}else{if(col.h!=undefined&&col.s!=undefined&&col.b!=undefined){col=fixHSB(col)}else{return this}}}return this.each(function(){if($(this).data("colpickId")){var cal=$("#"+$(this).data("colpickId"));cal.data("colpick").color=col;cal.data("colpick").origColor=col;fillRGBFields(col,cal.get(0));fillHSBFields(col,cal.get(0));fillHexFields(col,cal.get(0));setHue(col,cal.get(0));setSelector(col,cal.get(0));setNewColor(col,cal.get(0));cal.data("colpick").onChange.apply(cal.parent(),[col,hsbToHex(col),hsbToRgb(col),cal.data("colpick").el,1]);if(setCurrent){setCurrentColor(col,cal.get(0))}}})}},destroy:function(col,setCurrent){$("#"+$(this).data("colpickId")).remove()}}}();var hexToRgb=function(hex){hex=parseInt(((hex.indexOf("#")>-1)?hex.substring(1):hex),16);return{r:hex>>16,g:(hex&65280)>>8,b:(hex&255)}};var hexToHsb=function(hex){return rgbToHsb(hexToRgb(hex))};var rgbToHsb=function(rgb){var hsb={h:0,s:0,b:0};var min=Math.min(rgb.r,rgb.g,rgb.b);var max=Math.max(rgb.r,rgb.g,rgb.b);var delta=max-min;hsb.b=max;hsb.s=max!=0?255*delta/max:0;if(hsb.s!=0){if(rgb.r==max){hsb.h=(rgb.g-rgb.b)/delta}else{if(rgb.g==max){hsb.h=2+(rgb.b-rgb.r)/delta}else{hsb.h=4+(rgb.r-rgb.g)/delta}}}else{hsb.h=-1}hsb.h*=60;if(hsb.h<0){hsb.h+=360}hsb.s*=100/255;hsb.b*=100/255;return hsb};var hsbToRgb=function(hsb){var rgb={};var h=hsb.h;var s=hsb.s*255/100;var v=hsb.b*255/100;if(s==0){rgb.r=rgb.g=rgb.b=v}else{var t1=v;var t2=(255-s)*v/255;var t3=(t1-t2)*(h%60)/60;if(h==360){h=0}if(h<60){rgb.r=t1;rgb.b=t2;rgb.g=t2+t3}else{if(h<120){rgb.g=t1;rgb.b=t2;rgb.r=t1-t3}else{if(h<180){rgb.g=t1;rgb.r=t2;rgb.b=t2+t3}else{if(h<240){rgb.b=t1;rgb.r=t2;rgb.g=t1-t3}else{if(h<300){rgb.b=t1;rgb.g=t2;rgb.r=t2+t3}else{if(h<360){rgb.r=t1;rgb.g=t2;rgb.b=t1-t3}else{rgb.r=0;rgb.g=0;rgb.b=0}}}}}}}return{r:Math.round(rgb.r),g:Math.round(rgb.g),b:Math.round(rgb.b)}};var rgbToHex=function(rgb){var hex=[rgb.r.toString(16),rgb.g.toString(16),rgb.b.toString(16)];$.each(hex,function(nr,val){if(val.length==1){hex[nr]="0"+val}});return hex.join("")};var hsbToHex=function(hsb){return rgbToHex(hsbToRgb(hsb))};$.fn.extend({colpick:colpick.init,colpickHide:colpick.hidePicker,colpickShow:colpick.showPicker,colpickSetColor:colpick.setColor,colpickDestroy:colpick.destroy});$.extend({colpick:{rgbToHex:rgbToHex,rgbToHsb:rgbToHsb,hsbToHex:hsbToHex,hsbToRgb:hsbToRgb,hexToHsb:hexToHsb,hexToRgb:hexToRgb}})})(jQuery);
/* colpick.js end */

;(function(window) {
    function Tablet(container, config) {
        this._init(container, config);
        this._ctxInit();
        this._bindEvent();
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
            // 是否允许选择颜色
            selectColor: true,
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
        // 初始化颜色选择器
        if(this.config.selectColor){
            this.tablet.find(".-color-picker").each(function (){
                var self = this,
                    $self = $(this);
                if($self.hasClass('color-color')){
                    $self.colpick({
                        color: that.config.defaultColor,
                        layout:'hex',
                        submitText: "确定",
                        onSubmit:function(hsb,hex,rgb,el,bySetColor) {
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
                }else if($self.hasClass('bg-color')){
                     $self.colpick({
                        color: that.config.defaultBackgroundColor,
                        layout:'hex',
                        submitText: "确定",
                        onSubmit:function(hsb,hex,rgb,el,bySetColor) {
                            var color = "#" + hex;
                            $(el).css({
                                //color: color,
                                "border-color": color
                            }).colpickHide();
                            el.selectedColor = color;
                            that.bgColor = color;
                        }
                    }); 
                     $self.css({
                        "border-color": that.config.defaultBackgroundColor
                    });
                }
            });
        }

        if(typeof this.config.width === "function"){
            this.width = this.config.width();
        }else{
            this.width = this.config.width;
        }
        if(typeof this.config.height === "function"){
            this.width = this.config.height();
        }else{
            this.width = this.config.height;
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
    /* 内部使用，给按钮绑定事件 */
    Tablet.prototype._bindEvent = function (){
        var that = this;
        this.tablet.find(".clear-canvas").on("click", function (){
            if (that.config.onBeforeClear && (typeof that.config.onBeforeClear === "function")){
                var flag = that.config.onBeforeClear.call(this);
                if(flag === false){
                    return;
                }       
            }
            that.clear();
            that.config.onBeforeClear && (typeof that.config.onBeforeClear === "function") && that.config.onBeforeClear.call(this);
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
            html += '    <div class="tablet-btns">';
            if(this.config.selectColor){
                html += '   <input class="-color-picker color-color" type="text" value="字体色" readonly />';
               // html += '   <input class="-color-picker bg-color" type="text" value="背景色(无)" readonly />';  
            }
            html += '        <div class="clear-canvas">';
            html += this.config.clearBtnHtml ? this.config.clearBtnHtml : '清屏';
            html += '        </div>';
            //html += '        <div class="save-canvas-to-img">';
            //html += this.config.saveBtnHtml ? this.config.saveBtnHtml : '保存图片';
            //html += '        </div>';

            if(typeof this.config.otherHtml === "string" && this.config.otherHtml.length > 0){
                html += this.config.otherHtml;
            }

            html += '    </div>';
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