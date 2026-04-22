#!/usr/bin/env bash
# Exit on error
set -e

echo "--- Starting Build Process ---"

# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Install Node dependencies and build assets
npm install
npm run build

# Run migrations (Optional: better to run manually first time or use --force)
# php artisan migrate --force

echo "--- Build Completed Successfully ---"
