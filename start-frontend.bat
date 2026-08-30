@echo off
echo Starting SmartKart Frontend...
cd /d "%~dp0frontend"
if not exist node_modules (
    echo Installing dependencies...
    npm install
)
npm run dev
