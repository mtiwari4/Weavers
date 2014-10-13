CREX.slingshot.controlPanel.app.controller(
	'TemplateSelection',
	[
		'$scope', '$rootScope', '$route', '$location', 'ServerCommunication', '$timeout', '$window', 'Analytics',
		function($scope, $rootScope, $route, $location, ServerCommunication, $timeout, $window, Analytics){

			//console.log( 'TemplateSelection run!' );
			var numberPreviewed = 0;
			
			$scope.importError = false;
			
			$scope.$watch( '$route.current.params.accountId' , function(newAccountId){
				// for some reason the value isn't set by angular (?!?)
				newAccountId = $route.current.params.accountId;
				if( ! newAccountId ){
					return;
				}
				// retrieve available templates
				//console.log( 'retrieveing templates', newAccountId );
				ServerCommunication.getTemplates(newAccountId)
					.success(function(data, status, headers, config){
						//console.log( 'template get success, data', data );
						// fill in some calculated details
						var locationDetails = {
							host: $location.host(),
							port: $location.port()
						};
						// TODO there has GOT to be a cleaner way to do this :'(
						if( 80 === locationDetails.port ){
							locationDetails.port = '';
						}else{
							locationDetails.port = ':'+locationDetails.port;
						}// I feel dirty
						
						data.forEach(function(val){
							var obj = angular.extend(locationDetails, val);
							val.url = ServerCommunication.fillString( '//:name.:host:port/', obj );
							val.previewUrl = ServerCommunication.fillString( '//:name.:host:port/preview.png', obj );
						});
						$scope.templates = data;
					});
			});
			
			$scope.importTemplate = function( $event, template ){
				var id = template.id;
				//console.log( 'importTemplate', this, arguments );
				
				// don't follow the link
				$event.stopPropogation && $event.stopPropogation();
				$event.preventDefault && $event.preventDefault();

				Analytics.sendEvent('importTemplate', 'askOverwrite', template.name, id);
				
				if( ! confirm("Overwrite current site, all contents of your existing site will be erased!") ){
					Analytics.sendEvent('importTemplate', 'declineOverwrite', template.name, id);
					return false;
				}
				$scope.importError = false;
				angular.element('#template-import-modal').modal();
				
				Analytics.sendEvent('importTemplate', 'confirmOverwrite', template.name, id);
				
				
				//$rootScope.importTimers[id] = new CREX.slingshot.controlPanel.importTimer();
				//$rootScope.importTimers[id].start();
				
				
				var timerFunction = function(){
					//console.log( 'importTimers', id, this, arguments );
					
					if( $rootScope.importTimers[id].requestCameBack ){
					
						var done = false;
						
						if( (($rootScope.importTimers[id].data||{}).import||{}).progress > 99 ){
							//console.log( 'progress > 99 so we\'re done!' );
							done = true;
						}
						
						if( done ){
							//console.log( 'canceling timeout, hiding modal' );
							//$timeout.cancel( $rootScope.importTimers[id].timer );
							// TODO: don't hide if another import popped it up
							angular.element('#template-import-modal')
								.on('hidden.bs.modal', function(){
									//$location.path('/editSite');// TODO: if original modal still active
									//$scope.$apply(); //$location methods do not fire this on their own
									// take them directly to the builder!
									$window.location.href = '/builder';
								})
								.modal('hide');
							return;
						}else{
							//console.log('server still working, poll again');
							// start a new request
							$rootScope.importTimers[id].requestCameBack = false;
							$rootScope.importTimers[id].request = ServerCommunication.getTemplateImportProgress($route.current.params.accountId, id)
								.success(function(data, status, headers, config){
									//console.log('template import progress success fired', this, arguments);
									$rootScope.importTimers[id].data = data;
									$rootScope.importTimers[id].requestCameBack = true;
								})
								.error(function(data, status, headers, config){
									$timeout.cancel( $rootScope.importTimers[id].timer );
									//console.error('Error importing template!!');
									$scope.importError = true;
								});
						}
					}else{
						//console.log( 'still waiting for response to come back (not starting another)' );
					}
					
					$rootScope.importTimers[id].timer = $timeout( timerFunction, 950 );
				};
				
				
				$rootScope.importTimers[id] = {
						request : null,
						data : null,
						requestCameBack : true,
						timer : null
				};

				ServerCommunication.importSelectedTemplate($route.current.params.accountId, id)
					.success(function(data, status, headers, config){
						$rootScope.importTimers[id].timer = $timeout( timerFunction, 250 );
					})
					.error(function(data, status, headers, config){
						//console.error('Error importing template!!');
						//TODO: show error message to user
					});
				
				// closes the modal (for reference)
				//angular.element('#template-import-modal').modal('hide');
			};

			$scope.previewTemplate = function($event, template){
				Analytics.sendEvent('previewTemplate', 'openInNewWindow', template.name, ++numberPreviewed);
			};
		}
	]
);