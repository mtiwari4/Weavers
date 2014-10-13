var compile = require('./compile.js');

// Reference the libs, CREX directory
var sourcePath = 'src/register',
	output = 'register.min.js';

compile.run(
	sourcePath,
	output
);