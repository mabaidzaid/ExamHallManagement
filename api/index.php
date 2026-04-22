<?php

// Vercel Environment Setup
putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');
putenv('SESSION_DRIVER=cookie');
putenv('LOG_CHANNEL=stderr');
putenv('APP_CONFIG_CACHE=/tmp/config.php');
putenv('APP_ROUTES_CACHE=/tmp/routes.php');
putenv('APP_SERVICES_CACHE=/tmp/services.php');
putenv('APP_PACKAGES_CACHE=/tmp/packages.php');

// Create required directories in /tmp
if (!is_dir('/tmp/storage/framework/views')) {
    mkdir('/tmp/storage/framework/views', 0755, true);
}

// Forward Vercel requests to the public/index.php file
require __DIR__ . '/../public/index.php';
