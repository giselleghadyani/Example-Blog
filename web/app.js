'use strict';


angular.module('blogApp', ['ui.router', 'ngMaterial', 'ngResource'])

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
	$scope.sidebarNav = sidebarNavService;
	$scope.sideNav = {};
	$scope.sideNav.toggle = function(componentId) {
		$mdSidenav(componentId).toggle();
	};
	$scope.sideNav.close = function(componentId) {
		$mdSidenav(componentId).close();
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
		templateUrl: 'site-nav.html',
		replace: true
	};
})

// Directive testing for Sidenav R

.directive('sidebarNav', function() {
	return {
		templateUrl: 'sidebar-nav.html',
		replace: true
	};
})

.service('sidebarNavService', function() {
	this.pages = [
		{
			name: 'Link 1',
			state: 'test'
		},
		{
			name: 'Link 2',
			state: 'test'
		},
		{
			name: 'Link 3',
			state: 'test'
		},
		{
			name: 'Link 4',
			state: 'test'
		}
	];
	this.activeClass = 'navigation-link--active';
	this.class = 'navigation-link';
})

// Post template testing

.factory('contentFactory', function($resource) {
	return $resource('/content/:jsonFilename.json',
		{jsonFilename: 'blog'},
		{});
})

.controller('contentController', function($scope, $state, contentFactory) {
	contentFactory.get({jsonFilename: $state.current.name}).$promise.then(function(data) {
		$scope.content = data
	})
})
