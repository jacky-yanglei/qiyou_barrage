jQuery.fn.extend({
    QiYouBarrage: function () {
        // 添加一个弹幕层
        $(this).addClass('qiyou_barrage');
        $(this).append('<div class="qiyou_barrage_content">' +
            '</div>');
        // 添加弹幕
        this.addBarrage = function (obj) {
            // 参数配置默认值
            var params = {
                id: 'qiyou_barrage_' + new Date().getTime() + parseInt(Math.random()*200),
                info: obj.info || '', // 弹幕内容
                stayTime: obj.stayTime || 10, // 弹幕在屏中移动的时间
                top: obj.top || 10
            };
            $(this).find('.qiyou_barrage_content').append(
                '<div class="qiyou_barrage_child" id="' + params.id + '">' +
                '<div class="qiyou_barrage_info"></div>' +
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
            console.log(screen[0].offsetLeft);
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