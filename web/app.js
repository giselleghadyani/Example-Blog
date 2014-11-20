'use strict';


angular.module('blogApp', ['ui.router', 'ngMaterial'])

.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/404');
	$stateProvider.state('blog', {
		url: '/',
		templateUrl: 'blog.html',
	}).state('404', {
		url: '/404',
		templateUrl: '404.html',
	}).state('about', {
		url: '/about',
		templateUrl: 'about.html',
	}).state('tutorials', {
		url: '/tutorials',
		templateUrl: 'tutorials.html',
	}).state('contact', {
		url: '/contact',
		templateUrl: 'contact.html',
	}).state('test', {
		url: '/test',
		templateUrl: 'test.html',
	});
})

.controller('navs', function($scope, $mdSidenav, siteNavService) {
	$scope.siteNav = siteNavService;
	$scope.toggleLeft = function() {
		$mdSidenav('left').toggle();
	};
	$scope.close = function () {
		$mdSidenav('left').close();
	};
})

.service('siteNavService', function() {
	this.pages = [
		{
			name:'Home',
			state: 'blog'
		},
		{
			name: 'About',
			state: 'about'
		},
		{
			name: 'Tutorials',
			state: 'tutorials'
		},
		{
			name: 'Contact',
			state: 'contact'
		},
		{
			name: 'Test',
			state: 'test'
		}
	];
	this.activeClass = 'navigation-link--active';
	this.class = 'navigation-link';
})

// Material testing

.controller('buttonCtrl', function($scope) {
	$scope.title1 = 'Button';
})


// Directive testing for nav

.directive('siteNav', function() {
	return {
		templateUrl: 'site-nav.html'
	};
});