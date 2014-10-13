CREX.slingshot.controlPanel.app.controller(
	'AccountSelection',
	[
		'$scope', '$location', 'ServerCommunication',
		function($scope, $location, ServerCommunication){
		
			//console.log('AccountSelection', arguments);
			
			$scope.setBuilderAccountId = function(account){
				$scope.$parent.account = account
				window.localStorage.setItem('builderAccountId', account.accountId);
				//console.log( 'id', id, 'storage', localStorage.getItem('builderAccountId') );
			};
			
			
			// send the user to the template picker on their first login
			// first login occurs when they have only one account and it doesn't have a selected template :)
			var sentToTemplatesOnce = false;
			$scope.$watch('accounts.length', function(){
				
				if( ! $scope.accounts){
					return;
				}
				
				if( $scope.accounts && (1 === $scope.accounts.length) && (!$scope.accounts[0].currentTemplate) && (!sentToTemplatesOnce) ){
					$location.path( ServerCommunication.fillString('/account/:accountId/templates', {accountId:$scope.accounts[0].accountId}) );
					sentToTemplatesOnce = true;
				}
			
			});
		}
	]
);