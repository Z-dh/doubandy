;'use strict';
(function (angular) {
	var module = angular.module('movie_list', ['ngRoute','http'])

	module.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/:listtype/:page', {
			templateUrl: 'movie_list/view.html',
			controller: 'movie_listCtrl'
		});
	}])

	module.controller('movie_listCtrl', ['$scope','httpservice','$routeParams','$route',function ($scope,httpservice,$routeParams,$route) {
		//$http.get('date.json').then(function(resp){
		//	$scope.subjects=resp.data.subjects
		//},function(err){
		//	console.log(err)
		//})
		var page = parseInt($routeParams.page);
		var count=10;
		var start=(page-1)*count;
		$scope.loadshow=true;
		httpservice.jsonp('https://api.douban.com/v2/movie/'+$routeParams.listtype,{
			count:count,
			star:start
		},function(data){
			$scope.subjects=data.subjects;
			//console.log(data)
			$scope.gtnumber=data.total;
			$scope.loadshow=false;
			$scope.pagecount=Math.ceil($scope.gtnumber/count);
			$scope.pagecurrent=page;
			$scope.title=data.title;
			$scope.$apply();
		});
		$scope.gopage=function(page){
			if(page>=1&&page<=$scope.pagecount){
				$route.updateParams({page:page})
			}

		}
	}]);
})(angular)
