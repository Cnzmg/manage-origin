
//登陆
function goLogin(name, callback = function () { }) {
    let login = Object.assign({
        id: '#login',
        timer: 400,
        content: ['admin', 'admin']
    }, name);
    Object.keys(login).forEach(e => {
        this[e] = login[e];
    });
    this.callback = callback;
    this.ui = null;
}
var ecode = '';
new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            loading: false,
            show: false
        }
    },
    created: function () {
        var itself = this;
        $(function () {
            $('-login').css({
                left: window.innerWidth / 2 - document.getElementById('login').offsetWidth / 2 + 'px',
                top: window.innerHeight / 2 - document.getElementById('login').offsetHeight / 2 + 'px'
            }).animate({
                opacity: 100
            }, 1500);
            document.onkeyup = function (event) {
                var e = event ? event : (window.event ? window.event : null);
                if (e.keyCode == 13) {
                    login();
                }
            }
            $('-coffeeLogin').click(function () {
                login();
            });
            if (/(Android)/i.test(navigator.userAgent) || /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                $('=login-container').css({
                    width: "100%",
                    position: 'inherit'
                });
            }
        });
        function login() {
            if($('-user').elements[0].value == '' || $('-pwd').elements[0].value == '' || $('-ecode').elements[0].value == ''){
                if($('-user').elements[0].value == ''){
                    itself.errMessage('用户名 is Null...');
                    return;
                };
                if($('-pwd').elements[0].value == ''){
                    itself.errMessage('密码 is Null...');
                    return;
                };
                if($('-ecode').elements[0].value == ''){
                    itself.errMessage('验证码 Is Null');
                    return;
                }
            }else{
                if($('-user').elements[0].value != new goLogin().content[0] || $('-pwd').elements[0].value != new goLogin().content[1]){
                    itself.errMessage('用户名或者密码错误 Error ~');
                    return false;
                }
                if($('-ecode').elements[0].value != ecode.toLowerCase()){
                    itself.errMessage('验证码错误 Error code ~');
                    return false;
                }
                itself.loading = true;

                setTimeout(() => {
                    location.href = './src/views/common/index.html?u_ready=0220';
                },1000);

                setTimeout(() => {
                    itself.loading = false;
                }, 2000);
            } 
            // ym.init.XML({
            //     method: 'POST',
            //     uri: "http://mapi.cbcoffee.cn/find_formula_list",
            //     async: false,
            //     xmldata: {
            //         id: 72,
            //         token: "3083e728e098d76aa91730f0dfa2739b",
            //         url: "/manage/formulaList.html",
            //         page: 1
            //     },
            //     done: function (res) {
            //         setTimeout(() => {
            // location.href = './src/views/common/index.html?u_ready=0220';
            //         },1000);
            //     }
            // });
        }
    },
    methods: {
        tipMessage(e) {
            this.$message(e);
        },
        errMessage(e) {
            this.$message.error(e);
        },
        gohref: function (e) {  //ifarme 路由变化
            $('-htmlhref').attr('src',e.uri);
            $('-htmlhref').elements[0].style.marginTop = "45px";
            localStorage.getItem('uri') ? localStorage.setItem('uri',(() => {
                let c = [];
                for(let i = 0; i < localStorage.getItem('uri').split(',').length; i++){
                    if(localStorage.getItem('uri').split(',')[i] == e.uri){
                        c.push(localStorage.getItem('uri'));
                        return c;
                    }
                }
                c.push(e.uri);
                c.push(localStorage.getItem('uri'));
                return c;
            })() ) : localStorage.setItem('uri',e.uri);
            
            $('-tag_menu').append({
                node:'div',
                cla:'class',
                val:'tag-con-div rl',
                calssNode:'tag_menu',
                type:'Node',
                text:e.name
            })

        }
    }
})
//login 
const vcode = new Vercode({
    lineWidth: 1,
    lineNum: 3,
    fontSize: 100
});
vcode.draw(document.querySelector('#fs-code'), c => {
    ecode = c;
});
