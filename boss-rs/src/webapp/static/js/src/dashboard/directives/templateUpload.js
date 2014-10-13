CREX.slingshot.controlPanel.app.directive(
	'templateUpload',
	[
		'$rootScope', '$route', '$window', '$timeout', 'ServerCommunication',
		function($rootScope, $route, $window, $timeout, ServerCommunication){

			return {
				restrict: 'E',
				templateUrl: '/static/partials/templateUpload.html',
				replace: true,
				link: function (scope, elem, attr) {
				
					elem.find('button').bind('click', function(){
						//console.log('FIles', elem.find('input')[0].files);
						var fileList = elem.find('input')[0].files;
						if(fileList.length < 1){
							alert("Please select a ZIP format file for template upload.");
							return;
						}
						
						// yay, the user specified (a) file! use only the first
						var toUpload = fileList[0];
						// TODO look at mimetype first?
						if( ! toUpload.name.match(/\.zip$/) ){
							// file needs to be a ZIP
							alert("Please use ZIP format file for template upload.");
							return;
						}
						
						if( ! confirm("Overwrite current site and import template?") ){
							return false;
						}
						
						angular.element('#template-import-modal').modal();
						

						var uploadTimer = {
								request : null,
								data : null,
								requestCameBack : true,
								timer : null
						};
						$rootScope.uploadTimers.push(uploadTimer);
						
						var waitForImport = function(){
							//console.log( 'importTimers', id, this, arguments );
							
							if( uploadTimer.requestCameBack ){
							
								var done = false;
								
								if( ((uploadTimer.data||{}).upload||{}).progress > 99 ){
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
									uploadTimer.requestCameBack = false;
									uploadTimer = ServerCommunication.getTemplateUploadProgress($route.current.params.accountId)
										.success(function(data, status, headers, config){
											//console.log('template import progress success fired', this, arguments);
											uploadTimer.data = data;
											uploadTimer.requestCameBack = true;
										})
										.error(function(data, status, headers, config){
											$timeout.cancel( uploadTimer.timer );
											//console.error('Error importing template!!');
											angular.element('#template-import-modal').modal('hide');
											alert('There was an error importing the template.');
										});
								}
							}else{
								//console.log( 'still waiting for response to come back (not starting another)' );
							}
							
							uploadTimer.timer = $timeout( waitForImport, 950 );
						};
						
						

						ServerCommunication.uploadTemplate($route.current.params.accountId, toUpload)
							.success(function(data, status, headers, config){
								//console.log('success function fired', this, arguments);
								// TODO poll the server for status
								//$window.location.href = '/builder';
								uploadTimer.timer = $timeout( waitForImport, 250 );
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