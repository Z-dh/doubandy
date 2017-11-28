/**
 * Created by Administrator on 2017/11/23.
 */
(function(angular){
	;'use strict';
	var jsonp = angular.module('http',[]);
	jsonp.service('httpservice',['$window','$document',function($window,$document){
		this.jsonp=function(url,data,callback){
			//1.挂载回调函数
			var cbfuncname = 'my_json_cb'+Math.random().toString().replace('.','');
			//$window[cbfuncname]=callback;
			//2.将data转换成url字符串的形式
			var querystring = url.indexOf('?')==-1? '?':'&';
			for(var key in data){
				querystring += key+ '=' + data[key] + '&'
			}
			//2.处理url中的回调参数
			querystring+='callback='+cbfuncname;
			//3.创建一个script标签
			var scriptElement = $document[0].createElement('script');
			scriptElement.src=url+querystring;
			//4.将script标签放到页面中
			$window[cbfuncname]=function(data){
				callback(data);
				$document[0].body.removeChild(scriptElement);
			}
			$document[0].body.appendChild(scriptElement);
		};
	}])
})(angular);
