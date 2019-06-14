// import 'vue'

var [
    ecode,
    _timeOpatiy,
    uri
] = ['',
        .1,
        document.getElementById('login').getAttribute('data-uri')
    ]
//登陆
new Vue({
    el: '#app',
    data: function () {
        return {
            loading: false,
            remember: false,
            loginData:{
                name:'',
                pwd: '',
                ecode:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 4 到 11 个字符', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                ecode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            }
        }
    },
    created: function () {
        const _this = this;
        document.addEventListener('DOMContentLoaded', function () {
            if(location.href.split('?')[1] == 'hash:ix') sessionStorage.removeItem("token");
            //box position
            ym().css('login', {
                'left': window.innerWidth / 2 - 250,
                'top': window.innerHeight / 2 - 185
            });

            if (sessionStorage.getItem('remember')) {  //历史账号回显
                _this.remember = true;
                _this.loginData.name = ym.init.COMPILESTR.decrypt(JSON.parse(sessionStorage.getItem('remember')).name);
                _this.loginData.pwd = ym.init.COMPILESTR.decrypt(JSON.parse(sessionStorage.getItem('remember')).pwd);
            }

            document.onkeyup = function (event) {
                var e = event ? event : (window.event ? window.event : null);
                if (e.keyCode == 13) {
                    _this.login(_this.loginData);
                }
            }
            
            if (/(Android)/i.test(navigator.userAgent) || /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                document.getElementById('login').css({
                    width: "100%",
                    position: 'inherit'
                });
            }
        });

    },
    methods: {
        IError(err) {
            this.$message.error('错了哦，' + err);
            this.loading = false;
        },
        login(e) {
            const _this = this, _data = {};
            _this.loading = true;
            if(_this.loginData.ecode.toUpperCase() != ecode) {
                _this.IError('验证码错误')
                throw '收集到错误：\n\n' + ecode
            }
            _data['account'] = e.name;
            _data['pwd'] = e.pwd;
            ym.init.XML({
                method: 'POST',
                uri: JSON.parse(sessionStorage.getItem('_e')).URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (_e) {
                    if (_e.state == 200) {
                        if (!_this.remember) {
                            sessionStorage.removeItem('remember')
                        } else {
                            sessionStorage.setItem("remember", JSON.stringify({ name: ym.init.COMPILESTR.encryption(e.name), pwd: ym.init.COMPILESTR.encryption(e.pwd) }));
                        };
                        localStorage.setItem('uri', JSON.stringify({ uri: '../index.htm?hash:ix', title: '首页' }));
                        sessionStorage.setItem("token", JSON.stringify({ secret: _e.data.secret }));
                        setTimeout(() => {
                            location.href = "./views/common/index.htm?hash:" + ym.init.GETRANDOM(8);
                        }, 500);
                    }
                    else {
                        _this.IError(_e.msg);
                        setTimeout(() => {
                            _this.loading = false;
                        }, 500)
                    };
                }
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
    ecode = c.toUpperCase();
});
let time = setInterval(() => {  //登陆显示
    _timeOpatiy = _timeOpatiy + .1;
    document.getElementById('loginShow').style.opacity = _timeOpatiy;
    if (_timeOpatiy > 1) clearInterval(time)
}, 50)