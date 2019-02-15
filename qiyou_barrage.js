jQuery.fn.extend({
    QiYouBarrage: function (option) {
        this.option = {
            colorStyle: [
                '#FFFFFF',
                '#FF0000',
                '#FF7D00',
                '#FFFF00',
                '#00FF00',
                '#00FFFF',
                '#0000FF',
                '#FF00FF'
            ]
        };
        if (option&&option.colorStyle instanceof Array) {
            // 默认字体颜色 必须是一个数组
            this.option.colorStyle = option.colorStyle;
        }
        // 添加一个弹幕层
        $(this).addClass('qiyou_barrage');
        $(this).append('<div class="qiyou_barrage_content">' +
            '</div>');
        // 添加弹幕
        this.addBarrage = function (obj) {
            if (typeof obj.fontColor === 'string') {

            }else if (typeof obj.fontColor === 'number') {
                obj.fontColor = this.option.colorStyle[obj.fontColor];
            }else {
                obj.fontColor = false;
            }
            // 参数配置默认值
            var params = {
                id: 'qiyou_barrage_' + new Date().getTime() + parseInt(Math.random()*10000000),
                info: obj.info || '', // 弹幕内容
                stayTime: obj.stayTime || 10, // 弹幕在屏中存在的时间
                top: obj.top || 10, // 距离顶部高度
                fontColor: obj.fontColor || this.option.colorStyle[0],  // 弹幕字体颜色，可根据默认颜色数组顺序输入数字对应可能是VIP等级用户弹幕颜色
                backgroundColor: obj.backgroundColor || 'rgba(51, 51, 51, 0.7)' // 弹幕背景色
            };
            $(this).find('.qiyou_barrage_content').append(
                '<div class="qiyou_barrage_child" id="' + params.id + '">' +
                '<div class="qiyou_barrage_info" style="color: ' + params.fontColor + ';background-color: ' + params.backgroundColor + '"></div>' +
                '</div>');
            var screen = $(this);
            var box = $('#' + params.id);
            var infoDom = $('#' + params.id + ' .qiyou_barrage_info');
            infoDom.text(params.info);
            box.css({'top': params.top + 'px', right: '-' + (infoDom.outerWidth() + 10) + 'px'});
            // 获取屏幕宽度
            var ScreenWidth = screen.width();
            box.css({
                'transform': 'translateX(-' + (ScreenWidth + infoDom.outerWidth() + 20) + 'px)',
                'transition': 'transform ' + params.stayTime + 's linear'
            });
            var timer = setTimeout(function () {
                box.remove();
            }, params.stayTime * 1000);
            box.mouseover(function (e) {
                var obj;
                if(infoDom[0].currentStyle){
                    obj = infoDom[0].currentStyle
                }
                else{
                    obj = document.defaultView.getComputedStyle(infoDom[0],null)
                }
                box.css({
                    'transform': 'translateX(-' + (ScreenWidth + screen[0].offsetLeft - e.clientX + e.offsetX + parseInt(obj.paddingLeft || 0 ) + parseInt(obj.borderLeft || 0)) + 'px)',
                    'transition': 'transform ' + 0 + 's linear'
                });
                clearTimeout(timer);
            });
            box.mouseout(function () {
                box.css({
                    'transform': 'translateX(-' + (ScreenWidth + infoDom.outerWidth() + 20) + 'px)',
                    'transition': 'transform ' + params.stayTime + 's linear'
                });
                timer = setTimeout(function () {
                    box.remove();
                }, params.stayTime * 1000);
            })
        };
        // 清除所有弹幕
        this.removeAll = function () {
            $('.qiyou_barrage_content').html('');
        };
        return this;
    }
});