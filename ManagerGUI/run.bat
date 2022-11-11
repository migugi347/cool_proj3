@echo off
pushd .\ejs
start "backend" /min cmd /C "node index.js"
popd
pushd .\managerproj
start "frontend" /min cmd /C "npm start"
popd
echo Press ENTER to kill web servers
pause >nul
taskkill /f /im node.exe > nul
GOTO :EOF