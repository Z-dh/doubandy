/**
 * Created by Administrator on 2017/11/28.
 */
;'use strict';
(function (angular) {
	var module = angular.module('movie_detail', ['ngRoute','http']);

	module.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/detail/:id', {
			templateUrl: 'movie_detail/view.html',
			controller: 'movie_detailCtrl'
		});
	}]);
	module.controller('movie_detailCtrl', ['$scope','httpservice','$routeParams','Appconfig',function ($scope,httpservice,$routeParams,Appconfig) {
		$scope.movie='';
		$scope.title='Loading...';
		$scope.loadshow=true;
		$scope.id=$routeParams.id;
		httpservice.jsonp(Appconfig.detailapiads+$routeParams.id,{},function(data){
			$scope.movie=data;
			$scope.loadshow=false;
			$scope.$apply();
		})
	}]);
})(angular);
