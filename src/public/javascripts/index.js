new Vue({
    el: '#app',
    data: () => {
        return {
            loading: false,
            imageShow: false,
        }
    },
    created: function () {
        // $('body').on('click', '.template-skins > a', function (e) {
        //     e.preventDefault();
        //     var skin = $(this).data('skin');
        //     $('body').attr('id', skin);
        //     localStorage.setItem("skin", JSON.stringify({ skin: skin }));
        // });
        //if body not bg
        // if (JSON.parse(localStorage.getItem("skin"))) {
        //     $('body').attr('id', JSON.parse(localStorage.getItem("skin")).skin);
        // };

        localStorage.getItem('uri') ? JSON.parse("[" + localStorage.getItem('uri') + "]").forEach((els, index) => {
            console.log('Testing：\n\n' + JSON.stringify(els.uri.split('?')[1]));
        }) : null;
        if (!sessionStorage.getItem('token')) {
            this.$message.error('登陆已失效');
            setTimeout(() => {
                location.href = '../../app.htm?hash:err(o012)';
            }, 1000);
        };

        //tag 权限列表
        // let tag = JSON.parse(sessionStorage.getItem('tag')), _tag = '', icons = [
        //     'el-icon-s-cooperation',
        //     'el-icon-s-order',
        //     'el-icon-video-camera-solid',
        //     'el-icon-s-data',
        //     'el-icon-user-solid',
        //     'el-icon-s-finance',
        //     'el-icon-s-grid',
        //     'el-icon-s-tools',
        //     'el-icon-s-unfold'
        // ], _lists = {
        //     _admin: [
        //         'tables',
        //         'u_Journal'
        //     ],
        //     _system: [
        //         'formulaList',
        //         'productList',
        //         'detailedList',
        //         'equipmentList',
        //         'equipmentLongUpdate',
        //         'smallLocationConfig',
        //         'advertisementRootList',
        //         'adRootDetailedList',
        //         'chartsActive',
        //         'systemUserList',
        //         'systemUserLvList',
        //         'feedbackList',
        //         'systemUserLvSearch',
        //         'couponList',
        //         'orderList',
        //         'refundOrder',
        //         'orderEverDayList',
        //         'financialManagement',
        //         'RepairPersonnelList',
        //         'materialLog'
        //     ],
        //     _shop: [
        //         'RepairPersonnelList',
        //         'equipmentList',
        //         'equipmentList',
        //         'maintenanceLog',
        //         'smallLocationConfig',
        //         'information',
        //         'chartsFinance',
        //         'orderList',
        //         'orderEverDayList'
        //     ]
        // }, num = 0;
        // for (let i = 0; i < tag.length; i++) {
        //     _tag += `<el-submenu index="${i + 1}">
        //                 <template slot="title">
        //                     <i class="${icons[i]}"></i>
        //                     <span>${tag[i].permissionName}</span>
        //                 </template>
        //                 <el-menu-item-group>`;
        //     for (let j = 0; j < tag[i].pageInfoList.length; j++) {
        //         // _tag += `<el-menu-item @click=Href({'uri':'${tag[i].pageInfoList[j].pageUrl}','title':'${tag[i].pageInfoList[j].pageName}'}) index="${i + 1}-${j}">${tag[i].pageInfoList[j].pageName}</el-menu-item>`;
        //         switch (tag.length) {  //启用本地路由
        //             case 9:
        //                 _tag += `<el-menu-item u="${_lists._system[num]}" @click=Href({'uri':'../${_lists._system[num]}.html?hash:iforx${parseInt(13 * num / j + 2)}','title':'${tag[i].pageInfoList[j].pageName}'}) index="${i + 1}-${j}">${tag[i].pageInfoList[j].pageName}</el-menu-item>`;
        //                 break;
        //             case 2:
        //                 _tag += `<el-menu-item @click=Href({'uri':'../${_lists._admin[num]}.html?hash:iforx${parseInt(13 * num / j + 2)}','title':'${tag[i].pageInfoList[j].pageName}'}) index="${i + 1}-${j}">${tag[i].pageInfoList[j].pageName}</el-menu-item>`;
        //                 break;
        //             default:
        //                 _tag += `<el-menu-item @click=Href({'uri':'../${_lists._shop[num]}.html?hash:iforx${parseInt(13 * num / j + 2)}','title':'${tag[i].pageInfoList[j].pageName}'}) index="${i + 1}-${j}">${tag[i].pageInfoList[j].pageName}</el-menu-item>`;
        //                 break;
        //         };
        //         num++;
        //     };
        //     _tag += `</el-menu-item-group>
        //         </el-submenu>`;
        // };
        // jQuery('.menu').html(_tag);

    },
    methods: {
        Error(err) {
            this.$message.error('错了哦，' + err);
        },
        Href(e) {
            document.getElementById('tagHref').setAttribute('src', e.uri);
            let c = [], local = JSON.parse('[' + sessionStorage.getItem('uri') + ']');
            if (sessionStorage.getItem('uri')) {
                for (let i = 0; i < local.length; i++) {
                    if (local[i].uri == e.uri) {
                        c.push(sessionStorage.getItem('uri'));
                        return c;
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
            tag();  //
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
}