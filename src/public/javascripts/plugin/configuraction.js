import confjson from './json/config'
import style from '../../stylesheets/base.min.css'
import app from './app'

sessionStorage.setItem('_e',JSON.stringify(confjson));

ym.init = {
	plugin:{
		fn:function(){},
		bool:false,
		loading:`<div class="k-ball7a"></div><div class="k-ball7b"></div><div class="k-ball7c"></div><div class="k-ball7d"></div>`,
		ui:function(){
			return this.arguments;
		}
	},
	XML:function(ent){
		/* 封装ajax函数
			* {string} ent.type http连接的方式，包括POST和GET两种方式
		  	* {string} ent.url 发送请求的url
		  	* {boolean} ent.async 是否为异步请求，true为异步的，false为同步的
		  	* {object} ent.data 发送的参数，格式为对象类型
		  	* {function} ent.success ajax发送并接收成功调用的回调函数
		*/
		ent = ent || {};
		ent.method = ent.method.toUpperCase() || "POST";
		ent.uri = ent.uri || '';
		ent.async = ent.async || true;
		ent.xmldata = ent.xmldata || {};
		ent.success = ent.success || function(){};
		var xml = null, params = [], postData;
		if(window.XMLHttpRequest){
			xml = new XMLHttpRequest();
		}else{
			xml = new ActiveXObject("Microsoft.XMLHTTP");
		};
		for(let key in ent.xmldata){
			params.push(key + '=' + ent.xmldata[key]);
		}
		postData = params.join('&');
		if(ent.method.toUpperCase() === "POST"){
			xml.open(ent.method, ent.uri, ent.async);
			xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
			xml.send(postData);
		}else if(ent.method.toUpperCase() === "GET"){
			xml.open(ent.method, ent.uri + '?' + postData, ent.async);
			xml.send(null);
		}
		xml.onreadystatechange = function(){
			if(xml.readyState == 4 && xml.status == 200){
				ent.done(JSON.parse(xml.responseText));
			}
		}
	},
	GETURI:function(){
		var req = new RegExp("(^|&)" + arguments[0] + "=([^&]*)(&|$)", "i") ,res = window.location.search.substr(1).match(req);
		if(res != null) return decodeURI(res[2]);
		return null;
	},
	GETRANDOM:function(n){
		n = arguments[0] || 12;
		var m = "", i = 0, str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		for(let i = 0; i < n; i++){
			m += str.charAt(Math.floor(Math.random() * str.length));
		}
		return m;
	},
	ERROR:function(){
		var code = {};
		if( typeof arguments[0] === 'function' ){
			code = {
				start:200,
				msg:arguments[0].msg
			}
		}else{
			code = {
				start:400,
				msg:'状态错误'
			}
		}
		return code;
	},
	LOADING:function(){
		//  按钮动画  
		//  模态四角动画  
		switch(typeof arguments[0]){
			case 'object':
				jQuery(arguments[0].tap).html(`<div class="k-ball-holder" style="${arguments[0].style}">${ym.init.plugin.loading}<div style="margin-left:60%;">${arguments[0].select}</div></div>`);  //改变提交的方式
				break;
			default:
				console.log(2);
		}
	},
	getDateTime:function(data){
			var date = new Date(data);   //如果date为10位不需要乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());

			return Y + M + D + h + m + s;
	},
	MBOX:function(){
		if(arguments[0].redom){
			jQuery(arguments[0].redom).html(arguments[0].resetdom.inner);
			jQuery(arguments[0].resetdom.tag).html(arguments[0].resetdom.inner);
		}
		var dom = `<div class="module">${arguments[0].msg}</div>`;
		jQuery('body').append(dom);
		jQuery('.module').css({
			'marginLeft':'-' + jQuery('.module').innerWidth() / 2+ 'px',
			'marginTop':'-' + jQuery('.module').innerWidth() / 2 + 'px',
		})
		setTimeout(function(){
			jQuery('.module').remove();
		},arguments[0].dely);
	},
	COMPILESTR:{
		encryption:function(_e){
			var c = String.fromCharCode(_e.charCodeAt(0) + _e.length);
		    for(var i = 1;i < _e.length; i++){
		        c += String.fromCharCode(_e.charCodeAt(i) + _e.charCodeAt(i - 1));
		    }
		     return escape(c);
		},
		decrypt:function(_e){
			_e = unescape(_e);
		    var c = String.fromCharCode(_e.charCodeAt(0)-_e.length);
		    for(var i=1;i<_e.length;i++){
		        c+=String.fromCharCode(_e.charCodeAt(i)-c.charCodeAt(i-1));
		    }
		    return c;
		}
	},
	_COLUMN:{
			template:function(template){
				const evalExpr = /<%=(.+?)%>/g; //解码
				const expr = /<%([\s\S]+?)%>/g; //解码
				template = template
				.replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`') //echo
				.replace(expr, '`); \n $1 \n  echo(`'); //expr
				
	
				template = 'echo(`' + template + '`);';
				let script =
					`(function parse(data){
			    		let output = "";
			
					    function echo(html){
					      output += html;
					    }
			    		${ template }
			
			    	return output;
			  	})`;
				return script;
			},
			varel:function(_e,column){
				let template = `
					<ul>
					  	<% for(let i = 0; i < data.supplies.length; i++) { %>
						    <% for(let key in data.supplies[i]) { %>
						    	<% if((data.supplies[i][key]).constructor === Object){ %>
										<% for(let o in data.supplies[i][key]){ %>
											<li><%= data.supplies[i][key][o] %></li>
										<% } %>
								<% }else{ %>
									<li><%= data.supplies[i][key] %></li>
								<% } %>
						    <% } %>
					  	<% } %>
						<% if(data.ace){ %>
							<li><%= data.ace %></li>
						<% } %>
					</ul>
				`;
				var parse = eval(ym.init._COLUMN.template(template));
				document.getElementById(column)
				.innerHTML = parse({
					supplies: _e,
					ace: column
				});
			}
	},
	RegCode(e){
		return new RegExp(e);
	}
};

//<% for(let i=0; i < data.supplies.length; i++) { %>
//					    <% for(let j = 0; j < 12; j++) {%>
//					    	<td><%= data.supplies[i] %></td>
//					    <% } %>
//					  <% } %>


// function Foo () {  //Foo的函数
//     getName = function () { console.log(1) } 
//     return this
//   }
//   Foo.getName = function () { console.log(2) }//静态属性存储了一个匿名函数
  
//   Foo.prototype.getName = function () { console.log(3) } //Foo的原型对象新创建了一个叫getName的匿名函数

//   var getName = function () { console.log(4) } //函数变量表达式

//   function getName () { console.log(5) } //声明一个叫getName函数

// //输入的值
//   	Foo.getName();  //直接访问静态属性
// 	  getName();	//	
//   	Foo().getName(); //
//   	getName();	//	
//   	new Foo.getName();	//
//   	new Foo().getName();
// 		new new Foo().getName();

