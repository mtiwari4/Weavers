var $ = window['$'];
$(document).ready(function(){
	var registerForm		= $('#registerForm'),
		submitBtn			= registerForm.find('[type="submit"]'),
		
		firstName			= $('[name="fName"]'),
	 	lastName			= $('[name="lName"]'),
	 	email				= $('[name="email"]'),
	 	password			= $('[name="password"]'),
	 	confirmPassword		= $('[name="confirmPassword"]'),

	 	firstNameRow        = $('#firstnamerow'),
	 	lastNameRow			= $('#lastnamerow'),
	 	emailRow			= $('#emailrow'),
	 	passwordRow			= $('#passwordrow'),


	 	alertServerSending	= $('#alert-server-sending'),
	 	alertServerError	= $('#alert-server-error');
	
	var talkingToServer = false,
		originalAlertServerErrorMessage = alertServerError.html();



	// hide confirmPassword, parent?
	confirmPassword.type = 'hidden';
	if( ! confirmPassword.parents('.form-group').is( password.parents('.form-group'))){
		confirmPassword.parents('.form-group').hide();
	}


	
	// https://developers.google.com/analytics/devguides/collection/analyticsjs/events
	function gaSendEvent(category, action, opt_label, opt_value, opt_noninteraction){

		try{
			var opts = [];
			[].push.apply(opts, arguments);

			opts.unshift('send', 'event');

			window.ga.apply(window, opts);
		}catch(e){
			window.console && window.console.error('error sending event', e&&(e.message||e.messages), e);
		}
	}


	//*
	var messages = {};
	function showErrorMessage(element, message, opts){
		var newRef = $(element);
		//console.log('showErrorMessage', newRef.selector, message);
		if(message){
			
			newRef.attr('data-content', message);

			var showFunc = function(){
				//console.log('hidden');
				var that=this;
				setTimeout(function(){
					//console.log('showing');
					$(that)
						.popover('destroy')
						.popover(options)
						.popover('show');
				}, 300);
				$(this).off('hidden.bs.popover', showFunc);
				//console.log( 'off' );
			};
			
			// TODO maybe use id's instead? (& set one if non-existant)
			messages[newRef.selector] = message;

			var options = $.extend(
				opts,
				{
					// this is the only way to update the content (popover keeps the reference to the function, but inside we can reference changing variables *whew*
					content : function(){
						return messages[newRef.selector];
					},
					trigger  : 'manual'
				}
			);

			// newRef.popover(options)
			// .on('hidden.bs.popover', showFunc);
			newRef.on('hidden.bs.popover', showFunc);
		}
		//newRef.popover('destroy');
		newRef.popover('hide');
	}
	function hideErrorMessage(element){
		element && element.popover && element.popover('hide');
	}

	var showErrorBox_server_handle = null;
	function showErrorBox_server(message){

		if(showErrorBox_server_handle){
			showErrorBox_server_handle = clearTimeout(showErrorBox_server_handle);
			alertServerError.removeClass('hinge rotateInUpLeft');
		}

		if( true === message ){
			message = originalAlertServerErrorMessage;
		}

		if( message ){
			// show message to the user
			// TODO: design currently only accomidates one message, write out message when design is more tolerant
			//alertServerError.html( message );
		}

		alertServerError.show();

		alertServerSending.hide();

	}

	var showServerSendingBox_time = null;
	function showServerSendingBox(){
		alertServerSending.show();
		alertServerError.hide();
		showServerSendingBox_time = Date.now();
	}

	function hideServerSendingBox(){
		var timeDiff = Date.now() - showServerSendingBox_time;
		if(timeDiff < 1000){
			setTimeout(hideServerSendingBox, timeDiff);
			return;
		}

		alertServerSending
			.removeClass('bounceInLeft')
			.addClass('slideOutRight');

		setTimeout(function(){
			alertServerSending
				.hide()
				.removeClass('slideOutRight');
		}, 1000)
	}

	
	// Validators
	function firstNameValidate(){
		var value = firstName.val();
		if( !value || ('string' !== typeof value)){
			showErrorMessage(
				firstNameRow,
				'First Name is required.',
				{}
			);
			return false;
		}else{
			showErrorMessage(firstNameRow);
		}

		return true;
	}

	function lastNameValidate(){
		var value = lastName.val();
		if( !value || ('string' !== typeof value)){
			// FIXME: testing message opts - not for production!
			//showErrorMessage(lastName, 'Last Name is required.');
			showErrorMessage(
				lastNameRow,
				'Last Name is required.',
				{}
			);
			return false;
		}else{
			showErrorMessage(lastNameRow);
		}

		return true;
	}

	function emailValidate(){
		var emailText = email.val();
		if( ! emailText.length ){
			showErrorMessage(emailRow, 'Email address is required.');
			return false;
		}
		if( ! emailText.match(/^[\w-\._\+%]+@(?:[\w-]+\.)+[\w]{2,6}$/) ){
			showErrorMessage(
				emailRow,
				'Email address "'+emailText+'" is not valid.',
				{}
			);
			return false;
		}
		hideErrorMessage(emailRow);
		checkEmailAvailable(emailText);

		return true;
	}
	function checkEmailAvailable(emailText){
		if( ! emailText ){
			return null;
		}
		return $.get( '/api/register/checkuser/'+emailText)
			.done(function(data, status, jqXHR){
				//console.log('email check', data);
				data = data || {};
				if(data.customerExists || data.CustomerExists){
					showErrorMessage(
						emailRow,
						'Email address "'+emailText+'" is already registered.',
						{
							placement : 'left'
						}
					);
				}else{
					showErrorMessage(emailRow);
				}
			})
			.fail(function(jqXHR, textStatus, errorThrown){
				//console.error(errorThrown, textStatus, jqXHR);
				showErrorBox_server(true);
			});
	}

	function passwordValidate(){
		if( ! password.val().length ){
			showErrorMessage(passwordRow, 'Password is required.');
			return false;
		}

		hideErrorMessage(passwordRow);
		return true;
	}

	// form element validation
	firstName.on('blur', firstNameValidate);
	lastName.on('blur', lastNameValidate);
	email.on('blur', emailValidate);
	password.on('blur', passwordValidate);
	

	function showRegisterErrors(errorList){
		var otherErrors = [],
			selector,
			fieldOfError;
		$.each(errorList, function(index, error){
			selector = '[name="'+error.field+'"]';
			fieldOfError = $(selector).not('[type="hidden"]').parents('.form-row');
			fieldOfError.selector = selector;
			if(fieldOfError.length){
				showErrorMessage( fieldOfError, error.message );
			}else{
				otherErrors.push( (error.field ? error.field+': ' : '') + error.message );
			}
		});

		if(otherErrors.length){
			showErrorBox_server(otherErrors.join('\n<br>'));
		}
	}

	// form submission
	registerForm.on('submit', function(event){
		
		event.preventDefault();

		if( talkingToServer ){
			// already have a request out, but its not back yet
			// TODO: disable button (visual indicator)
			return false;
		}

		var allValidated = true;
		allValidated &= firstNameValidate();
		allValidated &= lastNameValidate();
		allValidated &= emailValidate();
		allValidated &= passwordValidate();
		if( ! allValidated ){
			return false;
		}

		
		talkingToServer = true;
		submitBtn.prop('disabled', true);
		
		// feedback to the user of the action we're taking
		showServerSendingBox();
		
		// for now don't require confirmPassword from the user
		confirmPassword.val(password.val());

		// send to server
		$.post( '/api/register', registerForm.serialize() )
			.done(function(data, status, jqXHR){
				//console.log('done, args', arguments);
				data = data || {};
				
				if(data.errors){
					gaSendEvent('register', 'signup', 'invalid credentials', jqXHR.status);
					showRegisterErrors(data.errors);

					return;
				}

				if(jqXHR.status >= 400){
					gaSendEvent('register', 'signup', 'fail', jqXHR.status);
					showErrorBox_server();
					return;
				}

				if((2 === (jqXHR.status/100|0)) || (false === data.errors) || (true == data.registrationSuccess)){
					gaSendEvent('register', 'signup', 'success');
					window.location = '/login';
					return;
				}

				gaSendEvent('register', 'signup', 'unhandled');
			})
			.fail(function(jqXHR, status, errorType){
				//console.log('fail, args', arguments);

				// if there is no response, it's seen as an error
				// but that was the original "no errors" message
				if('' === jqXHR.responseText){
					// handle this situation if it happens
					gaSendEvent('register', 'signup', 'success');
					window.location = '/login';
					return;
				}

				if(jqXHR.responseJSON && jqXHR.responseJSON.errors){
					gaSendEvent('register', 'signup', 'invalid credentials', jqXHR.status);
					showRegisterErrors(jqXHR.responseJSON.errors);
				}else{
					gaSendEvent('register', 'signup', 'fail', jqXHR.status);
					showErrorBox_server();
				}
				
			})
			.always(function(a, textStatus, c){
				talkingToServer = false;
				submitBtn.removeProp('disabled');
				hideServerSendingBox();
				//console.log( 'always, data|jqXHR, textStatus, jqXHR|errorThrown', a, textStatus, c);
			});
		
		return false;
	});
});
