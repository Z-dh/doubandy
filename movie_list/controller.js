;'use strict';
(function (angular) {
	var module = angular.module('movie_list', ['ngRoute','http'])

	module.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/:listtype/:page', {
			templateUrl: 'movie_list/view.html',
			controller: 'movie_listCtrl'
		});
	}])
	module.controller('movie_listCtrl', ['$scope','httpservice','$routeParams','$route','Appconfig',function ($scope,httpservice,$routeParams,$route,Appconfig) {
		//$http.get('date.json').then(function(resp){
		//	$scope.subjects=resp.data.subjects
		//},function(err){
		//	console.log(err)
		//})
		var page = parseInt($routeParams.page);
		var count=10;
		var start=(page-1)*count;
		$scope.loadshow=true;
		$scope.title="loading...";
		httpservice.jsonp(Appconfig.listapiads+$routeParams.listtype,{
			count:count,
			star:start,
			q:$routeParams.q
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
