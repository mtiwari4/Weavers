var fs = require('fs'),
	exec = require('child_process').exec,
	os = require('os');

var argsArray = [],
	argFlags = {
		// https://developers.google.com/closure/compiler/docs/compilation_levels
		whitespaceOnly : false,
		advancedOptimizations : false,
		// default is to set window.console to false, this provided for debugging
		allowConsole : false
	};
// print process.argv
process.argv.forEach(function (val, index, array) {
	// remove trailing \r
	val = val.replace(/\r$/,'');
	// ignore `node script.js` bit
	if(index > 1){
		if(val !== '$@' && val !== '%*'){
			var valFormatted = (''+val).replace(/^-/, '');
			argsArray.push(valFormatted);
			if(argFlags.hasOwnProperty(valFormatted)){
				argFlags[valFormatted] = true;
			}
		}
	}
});

//console.log('argsArray', argsArray);
//console.log('argFlags', argFlags);




	
// http://stackoverflow.com/a/5827895/2770309
// with an added depth param so that files nested deeper are added later
var walk = function walk(dir, done, depth) {
  var results = [];
  depth = depth || 0;
  
  var buildResults = function buildResults(results){
    if(depth){
		return results;
	}
	resultsArray = [];
	results.sort(function(a,b){ return a.depth - b.depth; });
	results.forEach(function(res){ resultsArray.push(res.file); });
	return resultsArray;
  };
  
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, buildResults(results));
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          }, depth + 1);
        } else {
          results.push({
		    depth : depth,
			file : file
		  });
          next();
        }
      });
    })();
  });
};


module.exports.run = function run(sourcePath, output, extraSources, shellCommand, manualSources){

	//{{sourceList}} and {{output}}
	shellCommand = shellCommand || "java -jar ../../jsBuild/closure-compiler/compiler.jar --warning_level=VERBOSE --jscomp_off=globalThis --jscomp_off=checkTypes --language_in=ECMASCRIPT5_STRICT --js {{sourceList}} --js_output_file {{output}} --create_source_map {{output_map}} --source_map_format=V3";
	extraSources = extraSources || [];
	
	if(argFlags.whitespaceOnly){
		shellCommand += " --compilation_level WHITESPACE_ONLY";
	}
	if(argFlags.advancedOptimizations ){
		shellCommand += " --compilation_level ADVANCED_OPTIMIZATIONS";
	}
	
	if(!argFlags.allowConsole){
		shellCommand += " --define='console=false'";
		shellCommand += " --define='window.console=false'";
	}
	
	
	walk(sourcePath, function(err, arrayOfFiles){
		var fileList = extraSources.concat([]);
		
		if(manualSources){
			fileList = fileList.concat(manualSources);
		}else{		
			//console.log('sourcePath walk', arrayOfFiles);
			arrayOfFiles.forEach(function(fileName, index, arr){
				//console.log('fileName', fileName);
				if( fileName.match(/\.js$/) ){
					//console.log('adding '+fileName);
					fileList.push(fileName);
				}
			});
		}
		//console.log('fileList', fileList);
		var sourceList = fileList.join(' ');

		var output_map = output+'.map';
		
		var fullShellCommand = shellCommand
			.replace('{{sourceList}}', sourceList)
			.replace('{{output}}', output)
			.replace('{{output_map}}', output_map);
			
		//console.log("shellCommand: "+fullShellCommand);
		
		//*
		exec(fullShellCommand, function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
			
			if(~os.type().toLowerCase().indexOf('windows')){
				// change windows '\\' path to web '/'
				fs.readFile(output_map, {encoding : "utf8"}, function(err, data){
					if(err){
						console.error('Error opening output map file');
					}else{
						data = data.replace(/\\\\/g, '/');
						//data = data + "\n\n" + '// generated ' + new Date() + '('+Date.now()+')';
						fs.writeFile(output_map, data);
					}
				});
			}
			
			// add map file comment at the end of minified script
			fs.readFile(output, {encoding : "utf8"}, function(err, data){
				if(err){
					console.error('Error opening output map file');
				}else{
					data = data + "\n\n" + '// ('+Date.now()+')';
					data = data + "\n\n" + '//# sourceMappingURL=/static/js/'+output_map;
					fs.writeFile(output, data);
				}
			});
			
		});//*/
	});
	
};