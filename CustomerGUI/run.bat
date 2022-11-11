@echo off
pushd .\backend
start /min node index.js
popd
pushd .\frontend
start "frontend" /min cmd.exe /C "npm start & exit"
popd
echo Press ENTER to kill web servers
pause >nul
taskkill /f /im node.exe > nul
GOTO :EOF