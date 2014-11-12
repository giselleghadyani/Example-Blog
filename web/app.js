'use strict';


angular.module('blogApp', ['ui.router'])

.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/404');
	$stateProvider.state('blog', {
		url: '/',
		templateUrl: 'blog.html'
	}).state('404', {
		url: '/404',
		templateUrl: '404.html'
	}).state('about', {
		url: '/about',
		templateUrl: 'about.html',
	});
});