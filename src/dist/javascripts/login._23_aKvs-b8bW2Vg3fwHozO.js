/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/public/javascripts/login.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/public/javascripts/login.js":
/*!*****************************************!*\
  !*** ./src/public/javascripts/login.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// import 'vue'\nvar _ref = ['', .1, document.getElementById('login').getAttribute('data-uri')],\n    ecode = _ref[0],\n    _timeOpatiy = _ref[1],\n    uri = _ref[2]; //登陆\n\nnew Vue({\n  el: '#app',\n  data: function data() {\n    return {\n      loading: false,\n      remember: false,\n      loginData: {\n        name: '',\n        pwd: '',\n        ecode: ''\n      },\n      rules: {\n        name: [{\n          required: true,\n          message: '请输入用户名',\n          trigger: 'blur'\n        }, {\n          min: 3,\n          max: 8,\n          message: '长度在 4 到 11 个字符',\n          trigger: 'blur'\n        }],\n        pwd: [{\n          required: true,\n          message: '请输入密码',\n          trigger: 'blur'\n        }, {\n          min: 3,\n          max: 8,\n          message: '长度在 6 到 18 个字符',\n          trigger: 'blur'\n        }],\n        ecode: [{\n          required: true,\n          message: '请输入验证码',\n          trigger: 'blur'\n        }]\n      }\n    };\n  },\n  created: function created() {\n    var _this = this;\n\n    document.addEventListener('DOMContentLoaded', function () {\n      if (location.href.split('?')[1] == 'hash:ix') sessionStorage.removeItem(\"token\"); //box position\n\n      ym().css('login', {\n        'left': window.innerWidth / 2 - 250,\n        'top': window.innerHeight / 2 - 185\n      });\n\n      if (sessionStorage.getItem('remember')) {\n        //历史账号回显\n        _this.remember = true;\n        _this.loginData.name = ym.init.COMPILESTR.decrypt(JSON.parse(sessionStorage.getItem('remember')).name);\n        _this.loginData.pwd = ym.init.COMPILESTR.decrypt(JSON.parse(sessionStorage.getItem('remember')).pwd);\n      }\n\n      document.onkeyup = function (event) {\n        var e = event ? event : window.event ? window.event : null;\n\n        if (e.keyCode == 13) {\n          _this.login(_this.loginData);\n        }\n      };\n\n      if (/(Android)/i.test(navigator.userAgent) || /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {\n        document.getElementById('login').css({\n          width: \"100%\",\n          position: 'inherit'\n        });\n      }\n    });\n  },\n  methods: {\n    IError: function IError(err) {\n      this.$message.error('错了哦，' + err);\n      this.loading = false;\n    },\n    login: function login(e) {\n      var _this = this,\n          _data = {};\n\n      _this.loading = true;\n\n      if (_this.loginData.ecode.toUpperCase() != ecode) {\n        _this.IError('验证码错误');\n\n        throw '收集到错误：\\n\\n' + ecode;\n      }\n\n      _data['account'] = e.name;\n      _data['pwd'] = e.pwd;\n      ym.init.XML({\n        method: 'POST',\n        uri: JSON.parse(sessionStorage.getItem('_e')).URLS.Development_Server_ + uri,\n        async: false,\n        xmldata: _data,\n        done: function done(_e) {\n          if (_e.state == 200) {\n            if (!_this.remember) {\n              sessionStorage.removeItem('remember');\n            } else {\n              sessionStorage.setItem(\"remember\", JSON.stringify({\n                name: ym.init.COMPILESTR.encryption(e.name),\n                pwd: ym.init.COMPILESTR.encryption(e.pwd)\n              }));\n            }\n\n            ;\n            localStorage.setItem('uri', JSON.stringify({\n              uri: '../index.htm?hash:ix',\n              title: '首页'\n            }));\n            sessionStorage.setItem(\"token\", JSON.stringify({\n              secret: _e.data.secret\n            }));\n            setTimeout(function () {\n              location.href = \"./views/common/index.htm?hash:\" + ym.init.GETRANDOM(8);\n            }, 500);\n          } else {\n            _this.IError(_e.msg);\n\n            setTimeout(function () {\n              _this.loading = false;\n            }, 500);\n          }\n\n          ;\n        }\n      });\n    }\n  }\n}); //login \n\nvar vcode = new Vercode({\n  lineWidth: 1,\n  lineNum: 3,\n  fontSize: 100\n});\nvcode.draw(document.querySelector('#fs-code'), function (c) {\n  ecode = c.toUpperCase();\n});\nvar time = setInterval(function () {\n  //登陆显示\n  _timeOpatiy = _timeOpatiy + .1;\n  document.getElementById('loginShow').style.opacity = _timeOpatiy;\n  if (_timeOpatiy > 1) clearInterval(time);\n}, 50);\n\n//# sourceURL=webpack:///./src/public/javascripts/login.js?");

/***/ })

/******/ });