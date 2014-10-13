CREX.slingshot.controlPanel.app.factory(
	'ServerCommunication',
	[
		'$http', '$window',
		function($http, $window){
			var baseUrl = '/api/0.2/';
			
			var commonErrorHandler = function(data, status, headers, config){
				//console.log( 'common error', '[data, status, headers, config]', arguments );
				if( status === 401 ){
					$window.location.href = '/login';
				}
			};
			
			var fillString = function ( str, data ){
				if( ! (str && data) ){
					//TODO error message
					return false;
				}
				if( (typeof str !== 'string') || (typeof data !== 'object')){
					//TODO error message
					return false;
				}
				
				for(var n in data){
					if( ! data.hasOwnProperty(n) ){
						continue;
					}
					str = str.replace(new RegExp('\:'+n,'g'), data[n]);
				}
				return str;
			};
			
			return {
				fillString : fillString,
				getAccounts : function(){

					return $http
						.get(baseUrl + 'user/accounts' )
						.error( commonErrorHandler );
				},
				getTemplates : function(accountId){
					if( ! accountId ){
						//console.error('invalid accountId', accountId);
						return;
					}

					return $http
						.get(baseUrl + fillString('account/:accountId/templates', { accountId : accountId} ) )
						.error( commonErrorHandler );
				},
				getSelectedTemplate : function(accountId){
					if( ! accountId ){
						//console.error('invalid accountId', accountId);
						return;
					}

					return $http
						.get(baseUrl + fillString('account/:accountId/templates/selected', {accountId:accountId}) )
						.error( commonErrorHandler );
				},
				
				uploadTemplate : function(accountId, file){
					if( ! (accountId&&file) ){
						//console.error('invalid accountId or file', accountId, file);
						return;
					}
					// help from http://jsfiddle.net/winduptoy/QhA3q/
					var formData = new FormData();
					formData.append('uploadfile', file);
					formData.append('data', angular.toJson({name:file.name}));
					//console.log( 'formData', formData );
					return $http({
						method: 'POST', 
						url: baseUrl + fillString('account/:accountId/templates/template/external/upload', { accountId : accountId} ),
						data: formData, 
						headers: {'Content-Type': undefined}, 
						transformRequest: angular.identity
					})
					.error( commonErrorHandler );
					
				},
				
				getTemplateUploadProgress : function(accountId){
					if( ! accountId ){
						//console.error('invalid accountId', accountId);
						return;
					}

					return $http
						.get(
							baseUrl +
							fillString(
								'account/:accountId/templates/template/external/upload',
								{ accountId : accountId }
							)
						)
						.error( commonErrorHandler );
					// data of form `{ "import": { "progress": 100 } }`
				},
				
				importSelectedTemplate : function(accountId, templateId){
					if( ! (accountId&&templateId) ){
						//console.error('invalid accountId or templateId', accountId, templateId);
						return;
					}

					return $http
						.post(
							baseUrl +
							fillString(
								'account/:accountId/templates/template/:templateId/import',
								{
									accountId	: accountId,
									templateId	: templateId,
								}
							)
						)
						.error( commonErrorHandler );
				},
				getTemplateImportProgress : function(accountId, templateId){
					if( ! (accountId&&templateId) ){
						//console.error('invalid accountId or templateId', accountId, templateId);
						return;
					}

					return $http
						.get(
							baseUrl +
							fillString(
								'account/:accountId/templates/template/:templateId/import',
								{
									accountId	: accountId,
									templateId	: templateId,
								}
							)
						)
						.error( commonErrorHandler );
					// data of form `{ "import": { "progress": 100 } }`
				},
				
				importExternalTemplate : function(accountId, url){
					if( ! (accountId&&url) ){
						//console.error('invalid accountId or url', accountId, url);
						return;
					}
					
					//http://localhost:8080/api/0.2/account/accountId/templates/template/external/import
					return $http({
						method: 'POST', 
						url: baseUrl + fillString('account/:accountId/templates/template/external/import', { accountId : accountId} ),
						data: angular.toJson({ url : url })
					})
					.error( commonErrorHandler );
					
				},
				
				getExternalTemplateImportProgress : function(accountId){
					if( ! accountId ){
						//console.error('invalid accountId', accountId);
						return;
					}

					return $http
						.get(
							baseUrl +
							fillString(
								'account/:accountId/templates/template/external/import',
								{ accountId : accountId }
							)
						)
						.error( commonErrorHandler );
					// data of form `{ "import": { "progress": 100 } }`
				},


				// `skip` is first index?
				getRevisions : function(accountId, skip, maxCount){
					if( ! accountId ){
						//console.error('invalid accountId', accountId);
						return;
					}

					/*
					skip = 'number' === typeof skip ? skip : 0;
					maxCount = 'number' === typeof maxCount ? Math.abs(maxCount) : 10;
					if(maxCount > 10){
						maxCount = 10;
					}//*/

					var params = [],
						url = 'account/:accountId/revision';
					if(maxCount){
						params.push('maxCount=:maxCount');
					}
					if(skip){
						params.push('skip=:skip');
					}

					if(params.length){
						url += '?' + params.join('&');
					}

					return $http
						.get(baseUrl + fillString(
							url,
							{
								accountId : accountId,
								skip : skip,
								maxCount : maxCount
							})
						)
						.error( commonErrorHandler );
				},

				moveToRevision : function(accountId, revisionName){
					if( ! (accountId && revisionName)){
						//console.error('invalid accountId', accountId);
						return;
					}

					return $http({
						method: 'POST', // should be 'PUT', waiting for server to be fixed
						url: baseUrl + fillString('account/:accountId/revision/:revisionId', { accountId : accountId, revisionId : revisionName} ),
					})
					.error( commonErrorHandler );
				}
				
			};
		}
	]
);