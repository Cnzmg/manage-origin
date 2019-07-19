new Vue({
    el: '#app',
    data: () => {
        return {
            loading: false,
            imageShow: false,
            menu: true,
            adminName: ym.init.COMPILESTR.decrypt(sessionStorage.getItem('_c'))
        }
    },
    created: function () {
        const it = this;
        localStorage.getItem('uri') ? JSON.parse("[" + localStorage.getItem('uri') + "]").forEach((els, index) => {
            console.log('Testing：\n\n' + JSON.stringify(els.uri.split('?')[1]));
        }) : null;
        if (!sessionStorage.getItem('token')) {
            this.$message.error('登陆已失效');
            setTimeout(() => {
                location.href = '../../app.htm?hash:err(o012)';
            }, 1000);
        };
    },
    methods: {
        IError(err) {
            this.$message.error('错了哦，' + err);
        },
        Href(e) {
            document.getElementById('tagHref').setAttribute('src', e.uri);
            let c = [], local = JSON.parse('[' + sessionStorage.getItem('uri') + ']');
            if (sessionStorage.getItem('uri')) {
                for (let i = 0; i < local.length; i++) {
                    if (local[i].uri == e.uri) {
                        c.push(sessionStorage.getItem('uri'));
                        tag();  // 有相同的存储路径时 直接调用
                        return false;
                    }
                }
                c.push(sessionStorage.getItem('uri'));
                c.push(JSON.stringify({ uri: e.uri, title: e.title }));
                sessionStorage.setItem('uri', c);
            } else {
                sessionStorage.setItem('uri', JSON.stringify({ uri: e.uri, title: e.title }))
            }

            jQuery('#tagMenu ul').append(   //关闭按钮
                `<li data-href="${e.uri}" class="tag_40b8ff">${e.title}<i data-click="${e.uri}"><svg class="icon icon_clone" aria-hidden="true">
                <use xlink:href="#ym-icon-guanbi"></use>
            </svg></i></li>`
            );
            tag();  // 新的click才会执行
        },
        goback() {
            const it = this;
            ym.init.XML({
                method: 'GET',
                uri: JSON.parse(sessionStorage.getItem('_e')).URLS.Development_Server_ + 'admin_logout',
                async: false,
                xmldata: {},
                done: function (res) {
                    try {
                        location.href = '../../app.htm?[hash]:ix';
                    } catch (error) {
                        it.IError(error);
                    }
                }
            });
        }
    }
});

(() => {  //初始化检查是否存在缓存页面
    let local = JSON.parse("[" + sessionStorage.getItem('uri') + "]"), _href = document.getElementById('tagHref');
    for (let i = 0; i < local.length; i++) {  //渲染tag栏
        $('#tagList').append(
            `<li data-href="${local[0] != null ? local[i].uri : '../index.htm?hash:ix'}" class="tag_40b8ff">${local[0] != null ? local[i].title : "首页"}<i data-click="${local[0] != null ? local[i].uri : '../index.htm?hash:ix'}"><svg class="icon icon_clone" aria-hidden="true">
            <use xlink:href="#ym-icon-guanbi"></use>
        </svg></i></li>`);
        if (local.length < 1) {
            _href.setAttribute('src', local[0] != null ? local[i].uri : '../index.htm?hash:ix');  //默认最后一个页面内容
            sessionStorage.getItem('uri') ? null : sessionStorage.setItem('uri', JSON.stringify({ uri: '../index.htm?hash:ix', title: '首页' }));
        }
    }
    tag();
})();
function tag() {
    jQuery('#tagMenu').show();
    let _tag = document.getElementById('tagMenu'), _href = document.getElementById('tagHref');
    try {
        for (let i = 0; i < _tag.childNodes[0].childNodes.length; i++) {
            if (_tag.childNodes[0].childNodes[i].getAttribute('data-href') == _href.getAttribute('src')) {  //显示当前页面的时候tag 的颜色变化
                _tag.childNodes[0].childNodes[i].setAttribute('class', 'tag_40b8ff');
            } else {
                _tag.childNodes[0].childNodes[i].setAttribute('class', '');
            }
            if (!_tag.childNodes[0].childNodes[i].firstElementChild) {  //是否存在 del 标签
                var car = document.createElement('i');
                car.setAttribute('data-click', _tag.childNodes[0].childNodes[i].getAttribute('data-href'));
                car.innerHTML = `<svg class="icon icon_clone" aria-hidden="true">
                                    <use xlink:href="#ym-icon-guanbi"></use>
                                </svg>`;
                _tag.childNodes[0].childNodes[i].appendChild(car);  //执行添加del 标签节点
            }
            _tag.childNodes[0].childNodes[i].childNodes[1].onclick = function (e) {  //del 标签执行方法
                let arr = [];
                JSON.parse("[" + sessionStorage.getItem('uri') + "]").forEach((els, index) => { //删除某些页面
                    if (els.uri != this.getAttribute('data-click')) {  //清除已存地址
                        arr.push(JSON.stringify(els));  //更新数组 重新编码
                        sessionStorage.setItem('uri', arr);  //覆盖
                    };
                });
                _tag.childNodes[0].removeChild(_tag.childNodes[0].childNodes[i]); // 清除tag节点
                if (_tag.childNodes[0].childNodes.length == 0) {  //当前tag 标签只剩一个
                    _href.setAttribute('src', '../index.htm?hash:io');
                    sessionStorage.removeItem('uri');  //清除缓存uri
                    jQuery('#tagMenu').hide();
                } else {
                    _tag.childNodes[0].childNodes[_tag.childNodes.length - 1].setAttribute('class', 'tag_40b8ff');  //执行当前长度 -1 的颜色变换
                    _href.setAttribute('src', _tag.childNodes[0].childNodes[_tag.childNodes.length - 1].childNodes[1].getAttribute('data-click')); //更改属性
                }
                tag(); //删除后重新初始化tag 方法
                e.stopPropagation();  //阻止事件冒泡
            };
            _tag.childNodes[0].childNodes[i].onclick = function (e) { //tag 点击
                let uri = _tag.childNodes[0].childNodes[i].getAttribute('data-href');
                _href.setAttribute('src', uri);  //页面uri更改
                _tag.childNodes[0].childNodes.forEach(element => {
                    element.setAttribute('class', '');  // 兄弟节点切换颜色
                });
                this.setAttribute('class', 'tag_40b8ff');  //当前改变颜色
                e.stopPropagation();  //阻止事件冒泡
            };
        };
    } catch (error) {
        alert(error);
    }
    $('#tagList li').hover(function () {
        jQuery(this).children('i').show(100);
    }, function () {
        jQuery(this).children('i').hide(100);
    })

    document.getElementById('tagList').ondrag = function(params){
        console.log(params)
    }
}
