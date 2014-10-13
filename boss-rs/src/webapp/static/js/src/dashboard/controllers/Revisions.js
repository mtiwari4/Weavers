CREX.slingshot.controlPanel.app.controller(
	'Revisions',
	[
		'$scope', '$rootScope', '$route', '$location', 'ServerCommunication', '$compile', '$window', 'Analytics',
		function($scope, $rootScope, $route, $location, ServerCommunication, $compile, $window, Analytics){

			Analytics.sendEvent('revisions', 'view', '??', $route.current.params.accountId);

			$scope.loading = true;

			var changeModal = angular.element('#revision-change-modal');

			$scope.changeSiteToRev = function(revName){
				if(!revName){
					return;
				}
				if(!window.confirm('Revert site back to revision '+revName+'?')){
					return false;
				}

				// TODO: work
				// show modal
				$scope.changeError = false;
				changeModal.modal({
					//??
				});
				// initiate request
				ServerCommunication.moveToRevision($route.current.params.accountId, revName)
					.success(function(){
						//console.log('success!', arguments);
						// go to builder
						changeModal
							.on('hidden.bs.modal', function(){
								// take them directly to the builder!
								$window.location.href = '/builder';
							})
							.modal('hide');
					})
					.error(function(){
						//console.error('error!!', arguments);
						$scope.changeError = true;
					});
			};

			$scope.changeSiteToFocusedRev = function(){
				if(!$scope.focusRev){
					return;
				}
				$scope.changeSiteToRev($scope.focusRev.id)
			};

			var revs = {},
				roots;

			function formatData(data){

				// add each revision node in an addressable way
				angular.forEach(data, function(node){
					if(revs[node.id]){
						//console.error(node.id+' already set!', revs[node.id]);
						return;
					}

					revs[node.id] = node;

					if(node.timestamp){
						node.when = new Date(node.timestamp);
					}
				});

				// parent <-> child linking
				$scope.revArray = [];
				angular.forEach(revs, function(child){
					var parent = revs[child.parentId],
					childsParents = (child.parents = child.parents || []);

					if(parent){
						// link parent to its children
						parent.children = parent.children || [];


						if(!~parent.children.indexOf(child)){
							parent.children.push(child);
						}

						// link child to its parent (if not already)
						if(!~childsParents.indexOf(parent)){
							childsParents.push(parent);
						}
					}

					$scope.revArray.push(child);
				});

				// discover root commits
				var roots = [];
				angular.forEach(revs, function(node){
					if(!node.parents.length){
						roots.push(node);
					}
				});

				if(roots.length > 1){
					//console.warn('More than one root element!!');
					return {
						children : roots,
						// d3 requires one and only one root element
						// indicate that this one root element isn't real
						__pseudo : true
					};
				}
				// only one root, we're happy!
				return roots[0];
			}

			function ensureMomentAddedToPage(){
				if(window.moment){
					//console.log('moment already exists', window.moment);
					return;
				}

				var tag = angular.element('<script src="/static/js/moment.min.js"></script>'),
					needToInsert = true;
				// find all <script>, see if it's ours
				angular.forEach(angular.element('script'), function(scriptTag){
					if(tag.src === scriptTag.src){
						needToInsert = false;
						//console.log('found <script> for moment', scriptTag);
					}
				});

				if(needToInsert){
					angular.element(document.body).append(tag);
					//console.log('appended new moment <script>', tag);
				}
			}
			ensureMomentAddedToPage();

			var requestOut = false,
				revisionsSkip = 0,
				numberAtATime = 10;
			function getMoreRevs(){
				if(requestOut){
					return;
				}

				requestOut = true;
				ServerCommunication.getRevisions($route.current.params.accountId, revisionsSkip, numberAtATime)
					.success(function(data, status, headers, config){
						var length = data.length;
						revisionsSkip += length;

						//console.log('getRevisions', 'now all through', revisionsSkip, 'data', data, 'status', status, 'headers', headers, 'config', config);
						//revs = new RevisionHistory(data);
						roots = formatData(data);
						$scope.loading = false;
						
						//debugger;

						// load all in a deffered manner
						// TODO: load smartly, upon need from user
						if(length >= numberAtATime){
							if(document.documentElement.scrollHeight <= document.documentElement.clientHeight){
								setTimeout(getMoreRevs, 250);
							}
						}

						requestOut = false;
					})
					.error(function(){
						window.console.error('error loading revisions', arguments);
						requestOut = false;
					});
			} // end of getMoreRevs
			getMoreRevs();


			$scope.handleScroll = function(){
				var element = document.documentElement;
				var distanceFromBottom = Math.abs( (element.scrollHeight - window.scrollY) - element.clientHeight);
				if(distanceFromBottom < 200){
					getMoreRevs();
				}
			}
			// from https://github.com/sroze/ngInfiniteScroll/blob/master/build/ng-infinite-scroll.js#L79
			angular.element(window).bind('scroll', $scope.handleScroll);
			$scope.$on('$destroy', function() {
				return angular.element(window).off('scroll', $scope.handleScroll);
			});

			


		}
	]
);