@echo off
title Launch Multimodal Construction Intelligence Platform
echo ========================================================
echo  AI-Powered Multimodal Construction Intelligence Platform
echo  Full Stack Decision Support System (FastAPI + React)
echo ========================================================
echo.
echo [1/2] Launching Backend Server in new window...
start "Multimodal Construction - Backend" cmd /c "%~dp0run_backend.bat"

echo [2/2] Launching Frontend Server in new window...
start "Multimodal Construction - Frontend" cmd /c "%~dp0run_frontend.bat"

echo.
echo --------------------------------------------------------
echo Platform URLs:
echo  - Frontend Web UI:  http://localhost:5173
echo  - Backend API Docs: http://localhost:8000/docs
echo --------------------------------------------------------
echo.
echo Both servers are starting up. Enjoy!
timeout /t 5
