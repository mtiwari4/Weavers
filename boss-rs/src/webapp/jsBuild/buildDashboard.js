var compile = require('./compile.js');

// Reference the libs, CREX directory
var sourcePath = 'src/dashboard',
	output = 'dashboard.min.js';

compile.run(
	sourcePath,
	output
);