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
			slug: '',
			type: 'contact',
			id: '',
		},
		{
			name: 'Test',
			slug: '',
			type: 'test',
			id: '',
		}
	];
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
		restrict: 'E',
		templateUrl: 'site-nav.html',
		replace: true
	};
})

// Post template testing

.service('contentService', function($resource) {
	this.postTypes = $resource('//qa-checklist.badmarkup.com/wp-json/:postType/:postId',
		{
			postId: '',
			postType: '',
		}
	);
})

.controller('contentController', function($scope, $state, $sce, contentService) {

})

.controller('pageController', function($scope, $state, $stateParams, $sce, contentService) {
	$scope.loadingComplete = false;

	contentService.postTypes.get({
		postId: $stateParams.pageId,
		postType: 'pages',
	}).$promise.then(function(data) {
		$scope.loadingComplete = true;

		data.content = $sce.trustAsHtml(data.content);
		$scope.page = data;
	}, function() {
		$state.go('404');
	});
})

.controller('postsController', function($scope, $state, $stateParams, $sce, contentService) {
	$scope.loadingComplete = false;

	contentService.postTypes.query({
		postType: 'posts',
	}).$promise.then(function(data) {
		$scope.loadingComplete = true;

		for(var i = 0; i < data.length; i++) {
			data[i].content = $sce.trustAsHtml(data[i].content);
		};
		$scope.posts = data;
	}, function() {
		$state.go('404');
	});
})

.directive('loadingIcon', function() {
	return {
		restrict: 'E',
		templateUrl: 'loading-icon.html',
		replace: true
	};
})
