/**
 * Created by Administrator on 2017/11/24.
 */
;'use strict';
(function(angular){
	angular.module('movie_outo_foucs',[])
		.directive('outoFocus',['$location',function($location){
			//var path = $location.path();
			return{
				restrict:'A',
				link:function($scope,iElm,iAtrrs,controller){
					$scope.$location=$location;
					$scope.$watch('$location.path()',function(now){
						var alink = iElm.children().attr('href');
						var type = alink.replace(/#!(\/.+?)\/\d+/,'$1');
						if($location.path().startsWith(type)){
							iElm.parent().children().removeClass('active');
							iElm.addClass('active');
						}
					})

				}
			}
		}])
})(angular);
