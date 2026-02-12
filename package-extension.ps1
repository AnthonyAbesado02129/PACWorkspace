# PAC Workspace Extension Packager
# Creates a ZIP file ready for transfer to another device

$extensionPath = Join-Path $PSScriptRoot "extension"
$zipPath = Join-Path $PSScriptRoot "pac-workspace-extension.zip"

Write-Host "Packaging PAC Workspace Extension..." -ForegroundColor Cyan

if (-not (Test-Path $extensionPath)) {
    Write-Host "Error: Extension folder not found at: $extensionPath" -ForegroundColor Red
    exit 1
}

# Remove existing ZIP if it exists
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
    Write-Host "Removed existing ZIP file." -ForegroundColor Yellow
}

# Create ZIP from extension folder contents
try {
    Compress-Archive -Path "$extensionPath\*" -DestinationPath $zipPath -Force
    Write-Host "✓ Extension packaged successfully!" -ForegroundColor Green
    Write-Host "  Location: $zipPath" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Transfer the ZIP file to another device" -ForegroundColor White
    Write-Host "  2. Extract the ZIP on the other device" -ForegroundColor White
    Write-Host "  3. Load it as an unpacked extension in Chrome/Edge" -ForegroundColor White
    Write-Host "  4. Configure the app URL in extension Options" -ForegroundColor White
} catch {
    Write-Host "Error creating ZIP: $_" -ForegroundColor Red
    exit 1
}
