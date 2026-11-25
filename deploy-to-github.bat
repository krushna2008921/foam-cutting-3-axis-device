@echo off
REM ====================================================================
REM AUTOMATED GITHUB PAGES DEPLOYMENT SCRIPT
REM PROJECT: FOAM CUTTING 2-AXIS DEVICE
REM SANJIVANI UNIVERSITY - DEPARTMENT OF MECHANICAL ENGINEERING
REM ====================================================================

echo [1/5] Checking Git installation...
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed or not in PATH.
    echo Please install Git from https://git-scm.com/download/win and rerun this script.
    pause
    exit /b 1
)

echo [2/5] Initializing local Git repository...
if not exist ".git" (
    git init
    git branch -M main
)

echo [3/5] Staging and committing all project files...
git add .
git commit -m "Deploy FOAM CUTTING 2-AXIS DEVICE website with interactive 3D WebGL simulator"

echo.
echo [4/5] GitHub Remote Setup
echo Please enter your GitHub username (e.g. krushna-jamdar):
set /p GH_USER=Username: 

if "%GH_USER%"=="" (
    echo [ERROR] Username cannot be empty.
    pause
    exit /b 1
)

set REPO_URL=https://github.com/%GH_USER%/foam-cutting-3-axis-device.git
echo Setting remote to %REPO_URL%...

git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo [5/5] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ====================================================================
echo SUCCESS! Your code is pushed to GitHub.
echo.
echo NEXT STEP TO ACTIVATE GITHUB PAGES:
echo 1. Open: https://github.com/%GH_USER%/foam-cutting-3-axis-device/settings/pages
echo 2. Under 'Build and deployment' -> 'Source', select 'Deploy from a branch'
echo 3. Choose branch 'main' and folder '/ (root)' -> Click Save.
echo.
echo In 1-2 minutes, your website will be live at:
echo https://%GH_USER%.github.io/foam-cutting-3-axis-device/
echo ====================================================================
pause
