: # http://stackoverflow.com/a/382312/2770309
: # http://stackoverflow.com/a/4824637/2770309

@echo off
cd ../static/js

echo Dashboard
node ../../jsBuild/buildDashboard.js %* $@

echo Register
node ../../jsBuild/buildRegister.js %* $@

pause