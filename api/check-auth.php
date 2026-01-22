<?php
require_once __DIR__ . '/config.php';

// 인증 상태 확인
jsonResponse(['isAuthenticated' => isAuthenticated()]);
?>
