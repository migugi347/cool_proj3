@echo off
pushd .\ejs
start /min node index.js
popd
pushd .\managerproj
start "frontend" /min cmd.exe /C "npm start & exit"
popd
echo Press ENTER to kill web servers
pause >nul
taskkill /f /im node.exe > nul
GOTO :EOF