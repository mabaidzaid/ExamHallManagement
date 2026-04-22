<?php

// Vercel Environment Setup
putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');
putenv('SESSION_DRIVER=cookie');
putenv('APP_DEBUG=true');
putenv('APP_ENV=production');
putenv('LOG_CHANNEL=stderr');

// Create required directories in /tmp
if (!is_dir('/tmp/storage/framework/views')) {
    mkdir('/tmp/storage/framework/views', 0755, true);
}

// Forward Vercel requests to the public/index.php file
require __DIR__ . '/../public/index.php';
