CREX.slingshot.controlPanel.app.factory('Analytics', function(){
	var ga = window.ga || {};

	// https://developers.google.com/analytics/devguides/collection/analyticsjs/events
	function gaSendEvent( category, action, opt_label, opt_value, opt_noninteraction){

		try{
			var opts = [];
			[].push.apply(opts, arguments);

			opts.unshift('send', 'event');

			window.ga.apply(window, opts);
		}catch(e){
			window.console && window.console.error('error sending event', e&&(e.message||e.messages), e);
		}
	}

	return {
		sendEvent : gaSendEvent
	}
});