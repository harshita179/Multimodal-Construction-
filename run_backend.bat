@echo off
title Multimodal Construction AI - Backend
echo ========================================================
echo  Starting FastAPI Backend (Port 8000)
echo ========================================================
cd /d "%~dp0backend"
"venv\Scripts\uvicorn.exe" app.main:app --host 127.0.0.1 --port 8000 --reload
pause
