CREX.slingshot.controlPanel.app.controller(
	'Main',
	[
		'$scope', '$rootScope', '$route', '$routeParams', '$location', '$window','ServerCommunication',
		function($scope, $rootScope, $route, $routeParams, $location, $window, ServerCommunication){
		
			$scope.account = null;
			
			$scope.accounts = [];
			ServerCommunication.getAccounts()
				.success(function(data, status, headers, config){
					$scope.accounts = data;
					
					var host = $location.host();
					angular.forEach($scope.accounts, function(account){
						if(account.publishTime){
							account.accountSiteUrl = '//' + account.accountId + '.'+host;
						}
					});
				});
			
			$scope.settings = {};
			
			$rootScope.importTimers = {};
			$rootScope.uploadTimers = [];
		}
	]
);