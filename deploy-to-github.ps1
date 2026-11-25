# ====================================================================
# AUTOMATED GITHUB PAGES DEPLOYMENT POWERSHELL SCRIPT
# PROJECT: FOAM CUTTING 2-AXIS DEVICE
# SANJIVANI UNIVERSITY - DEPARTMENT OF MECHANICAL ENGINEERING
# ====================================================================

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  FOAM CUTTING 2-AXIS DEVICE - GITHUB PAGES DEPLOYMENT" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Check Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Git was not found in your system PATH." -ForegroundColor Red
    Write-Host "Please download Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# 2. Check if GitHub CLI is installed and authenticated
$ghInstalled = [bool](Get-Command gh -ErrorAction SilentlyContinue)

# 3. Initialize Git repository
if (-not (Test-Path ".git")) {
    Write-Host "Initializing local Git repository..." -ForegroundColor Green
    git init
    git branch -M main
}

# 4. Stage and commit
Write-Host "Staging and committing files..." -ForegroundColor Green
git add .
git commit -m "Deploy FOAM CUTTING 2-AXIS DEVICE website with interactive 3D WebGL simulator"

# 5. Push / Create repo
if ($ghInstalled) {
    Write-Host "GitHub CLI detected. Checking authentication status..." -ForegroundColor Green
    gh auth status
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Creating/linking public GitHub repository 'foam-cutting-3-axis-device'..." -ForegroundColor Cyan
        gh repo create foam-cutting-3-axis-device --public --source=. --remote=origin --push
        Write-Host "Enabling GitHub Pages..." -ForegroundColor Cyan
        gh api -X POST "repos/:owner/foam-cutting-3-axis-device/pages" -F "source[branch]=main" -F "source[path]=/"
    }
} else {
    $user = Read-Host "Enter your GitHub username (e.g. krushna-jamdar)"
    if ($user) {
        $repoUrl = "https://github.com/$user/foam-cutting-3-axis-device.git"
        git remote remove origin 2>$null
        git remote add origin $repoUrl
        Write-Host "Pushing to $repoUrl..." -ForegroundColor Green
        git push -u origin main
        Write-Host "`nRepository pushed! To enable Pages:" -ForegroundColor Cyan
        Write-Host "1. Visit: https://github.com/$user/foam-cutting-3-axis-device/settings/pages"
        Write-Host "2. Set Source to 'Deploy from a branch' -> 'main' -> '/ (root)'"
        Write-Host "3. Your site will be published at: https://$user.github.io/foam-cutting-3-axis-device/" -ForegroundColor Green
    }
}
