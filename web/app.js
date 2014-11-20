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

.controller('navs', function($scope, $mdSidenav, siteNavService, sidebarNavService) {
	$scope.siteNav = siteNavService;
	$scope.toggleLeft = function() {
		$mdSidenav('left').toggle();
	};
	$scope.sidebarNav = sidebarNavService;
	$scope.toggleRight = function () {
		$mdSidenav('right').toggle();
	};
	$scope.close = function () {
		$mdSidenav('left').close();
		$mdSidenav('right').close();
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
})

// Directive testing for Sidenav R

.directive('sidebarNav', function() {
	return {
		templateUrl: 'sidebar-nav.html'
	};
})

.service('sidebarNavService', function() {
	this.pages = [
		{
			name: 'Link 1',
			state: 'link1'
		},
		{
			name: 'Link 2',
			state: ''
		},
		{
			name: 'Link 3',
			state: ''
		},
		{
			name: 'Link 4',
			state: ''
		}
	];
	this.activeClass = 'navigation-link--active';
	this.class = 'navigation-link';
})