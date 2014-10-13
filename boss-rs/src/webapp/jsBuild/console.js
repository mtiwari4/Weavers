/*
 * This is to make the compiler happy, not wanted in development
 */
// from https://github.com/mrdoob/three.js/blob/master/src/Three.js
// except self.console didn't work

var console = console || {}; // show all occurances of console usage
/*/
var console = {				 // ignore console usage
	info: function () {},
	log: function () {},
	debug: function () {},
	warn: function () {},
	error: function () {}
};//*/