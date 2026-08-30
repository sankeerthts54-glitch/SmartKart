@echo off
title SmartKart Backend
echo Starting SmartKart Backend on http://localhost:8000 ...
cd /d "%~dp0backend"
if not exist .env (
    copy .env.example .env
    echo Created .env from template
)
python -m pip install -r requirements.txt -q
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
pause
