@echo off
cd server_backend
start /b node index.js 2> nul > nul
cd ../server_frontend
start /b npm start > nul
cd ..
set /p DUMMY=Hit ENTER to continue...
taskkill /f /im node.exe