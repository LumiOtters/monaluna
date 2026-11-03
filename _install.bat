@echo off
REM Dependency installer, called by start-dev.cmd
cd /d "%~dp0"

set "DSH_DEP=%USERPROFILE%\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies"
set "PNPM_JS=%DSH_DEP%\pnpm\bin\pnpm.mjs"
set "DSH_NODE=%DSH_DEP%\node\bin\node.exe"

for /f "delims=" %%i in ('where pnpm 2^>nul') do (
    call pnpm install
    exit /b
)

for /f "delims=" %%i in ('where npm 2^>nul') do (
    call npm install
    exit /b
)

if exist "%PNPM_JS%" (
    if exist "%DSH_NODE%" (
        "%DSH_NODE%" "%PNPM_JS%" install
        exit /b
    )
)

echo  [ERROR] No npm or pnpm found. Install Node.js LTS: https://nodejs.org/
exit /b 1