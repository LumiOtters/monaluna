@echo off
setlocal
cd /d "%~dp0"
title P5R Portfolio - Local Preview

echo.
echo  ============================================
echo   P5R PORTFOLIO   ///   TAKE YOUR HEART
echo  ============================================
echo.

set "NODE_EXE="
set "NODE_DIR="

REM --- 1. try node already on PATH ---
for /f "delims=" %%i in ('where node 2^>nul') do (
    set "NODE_EXE=%%i"
    goto :have_node
)

REM --- 2. fall back to the DSH bundled runtime ---
set "DSH_NODE=%USERPROFILE%\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe"
if exist "%DSH_NODE%" (
    set "NODE_EXE=%DSH_NODE%"
    goto :have_node
)

echo  [ERROR] Node.js was not found on this machine.
echo.
echo  Install Node.js LTS first:  https://nodejs.org/
echo  Then run this file again.
echo.
pause
exit /b 1

:have_node
REM Make sure the node folder is on PATH, because the dev server itself
REM spawns plain "node" child processes and needs to find it there.
for %%i in ("%NODE_EXE%") do set "NODE_DIR=%%~dpi"
set "PATH=%NODE_DIR%;%PATH%"

echo  Node: %NODE_EXE%
echo.

REM --- install dependencies on first run ---
if not exist "node_modules" (
    echo  [1/2] First run - installing dependencies, please wait...
    echo.
    call "%~dp0_install.bat"
)

echo  [2/2] Starting dev server...
echo.
echo  Open in browser:  http://localhost:3000
echo  Stop server:      press Ctrl+C in this window
echo.

start "" cmd /c "timeout /t 8 >nul & start http://localhost:3000"

set "PNPM_JS=%USERPROFILE%\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs"
if exist "%PNPM_JS%" (
    "%NODE_EXE%" "%PNPM_JS%" dev
) else (
    call npx next dev
)

echo.
echo  Server stopped.
pause