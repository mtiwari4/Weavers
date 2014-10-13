CREX.slingshot.controlPanel.app.directive(
	'templateExternal',
	[
		'$rootScope', '$route', '$window', '$timeout', 'ServerCommunication',
		function($rootScope, $route, $window, $timeout, ServerCommunication){
					
			return {
				restrict: 'E',
				templateUrl: '/static/partials/templateExternal.html',
				replace: true,
				link: function (scope, elem, attr) {
					
					elem.find('button').on('click', function(){
						//console.log('button clicked!', this , arguments);
						// first get the URL the user is requesting
						var siteUrl = elem.find('#externalSiteUrl').val();
						// TODO we probably need to format it (add http:// etc just in case
						//importExternalTemplate
						//getExternalTemplateImportProgress
						
						//console.log( 'siteUrl', siteUrl );
						
						if( ! confirm("Overwrite current site and import template?") ){
							return false;
						}
						
						angular.element('#template-import-modal').modal();
						

						var importTimer = {
								request : null,
								data : null,
								requestCameBack : true,
								timer : null
						};
						$rootScope.uploadTimers.push(importTimer);
						
						var waitForImport = function(){
							//console.log( 'importTimers', id, this, arguments );
							
							if( importTimer.requestCameBack ){
							
								var done = false;
								
								if( ((importTimer.data||{}).upload||{}).progress > 99 ){
									//console.log( 'progress > 99 so we\'re done!' );
									done = true;
								}
								
								if( done ){
									//console.log( 'canceling timeout, hiding modal' );
									angular.element('#template-import-modal')
										.on('hidden.bs.modal', function(){
											// take them directly to the builder!
											$window.location.href = '/builder';
										})
										.modal('hide');
									return;
								}else{
									//console.log('server still working, poll again');
									// start a new request
									importTimer.requestCameBack = false;
									importTimer = ServerCommunication.getExternalTemplateImportProgress($route.current.params.accountId)
										.success(function(data, status, headers, config){
											//console.log('template import progress success fired', this, arguments);
											importTimer.data = data;
											importTimer.requestCameBack = true;
										})
										.error(function(data, status, headers, config){
											$timeout.cancel( importTimer.timer );
											//console.error('Error importing template!!');
											angular.element('#template-import-modal').modal('hide');
											alert('There was an error importing the url.');
										});
								}
							}else{
								//console.log( 'still waiting for response to come back (not starting another)' );
							}
							
							importTimer.timer = $timeout( waitForImport, 950 );
						};
						
						

						ServerCommunication.importExternalTemplate($route.current.params.accountId, siteUrl)
							.success(function(data, status, headers, config){
								//console.log('success function fired', this, arguments);
								// TODO poll the server for status
								//$window.location.href = '/builder';
								importTimer.timer = $timeout( waitForImport, 250 );
							})
							.error(function(data, status, headers, config){
								//console.error('Error uploading template!!', this, arguments);
								//show error message to user
								angular.element('#template-import-modal').modal('hide');
								alert('There was an error uploading the template.');
							});
						
					});
					
				}
			};
		}
	]
);