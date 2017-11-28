'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
    'ngRoute',
	'movie_outo_foucs',
	'movie_detail',
	'movie_list'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}]).controller('SearchController',['$scope','$route',function($scope,$route){
	$scope.input='';
	$scope.search=function(){
		//console.log($scope.input)
		$route.updateParams({q:$scope.input,listtype:'search'})

	}
}]).constant('Appconfig',{
		pageSize:10,
		listapiads:'https://api.douban.com/v2/movie/',
		detailapiads:'https://api.douban.com/v2/movie/subject/'
	})
