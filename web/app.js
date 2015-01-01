'use strict';


angular.module('blogApp', ['ui.router', 'ngMaterial', 'ngResource'])

.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/404');
	$stateProvider.state('blog', {
		url: '/',
		templateUrl: 'blog.html',
		controller: 'postsController',
	}).state('404', {
		url: '/404',
		templateUrl: '404.html',
	}).state('page', {
		url: '/page/:pageId',
		templateUrl: 'page.html',
		controller: 'pageController',
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

.service('siteNavService', function($stateParams, $state) {
	this.pages = [
		{
			name:'Home',
			slug: '',
			type: 'blog',
			id: '',
		},
		{
			name: 'About',
			slug: 'about',
			type: 'page',
			id: 'pageId',
		},
		{
			name: 'Tutorials',
			slug: 'tutorials',
			type: 'page',
			id: 'pageId',
		},
		{
			name: 'Contact',
			slug: 'contact',
			type: 'page',
			id: 'pageId',
		},
		{
			name: 'Test',
			slug: 'test',
			type: 'page',
			id: 'pageId',
		}
	];
	// this.activeClass = 'navigation-link--active';
	// this.class = 'navigation-link';
	this.getClass = function(id, slug) {
		var classes = 'navigation-link';
		
		if(slug == $stateParams[id]) {
			classes += ' navigation-link--active'
		}

		return classes;
	};
	this.getLink = function(id, slug, type) {
		var params = {};
		
		params[id] = slug;

		return $state.href(type, params);
	};
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

.service('contentService', function($resource) {
	this.posts = $resource('//qa-checklist.badmarkup.com/wp-json/posts/:postId',
		{
			postId: ''
		}
	);
	this.pages = $resource('//qa-checklist.badmarkup.com/wp-json/pages/:pageId',
		{
			pageId: ''
		// },
		// {
		// 	transformResponse: function(data, headersGetter) {
		// 		console.log(data);
		// 		console.log(headersGetter);
		// 	}
		}
	);
})

.controller('contentController', function($scope, $state, $sce, contentService) {

})

.controller('pageController', function($scope, $state, $stateParams, $sce, contentService) {
	contentService.pages.get({pageId: $stateParams.pageId}).$promise.then(function(data) {
		data.content = $sce.trustAsHtml(data.content);
		$scope.page = data;
	}, function() {
		$state.go('404');
	});
})

.controller('postsController', function($scope, $state, $stateParams, $sce, contentService) {
	contentService.posts.query().$promise.then(function(data) {
		for(var i = 0; i < data.length; i++) {
			data[i].content = $sce.trustAsHtml(data[i].content);
		};
		$scope.posts = data;
	}, function() {
		$state.go('404');
	});
})