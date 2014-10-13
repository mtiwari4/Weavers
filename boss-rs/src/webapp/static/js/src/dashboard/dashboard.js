var angular = window['angular'];
var CREX = CREX || {};
CREX.slingshot = CREX.slingshot || {};
CREX.slingshot.controlPanel = CREX.slingshot.controlPanel || {};

CREX.slingshot.controlPanel.app = angular.module(
	'controlPanel', ['angularMoment'],
	[
		'$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$routeProvider
				.when('/', {
					redirectTo	: '/accounts'
				}).when('/account/:accountId/templates', {
					templateUrl: '../static/partials/template-picker.html',
					controller: 'TemplateSelection'
				}).when('/accounts', {
					templateUrl: '../static/partials/account-picker.html',
					controller: 'AccountSelection'
				}).when('/revisions/:accountId', {
					templateUrl: '../static/partials/revisions.html',
					controller: 'Revisions'
				}).otherwise({
					redirectTo	: '/'
				});
		}
	]
);