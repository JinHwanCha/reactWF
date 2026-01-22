<?php
require_once __DIR__ . '/config.php';

// 로그아웃 처리
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_destroy();
    successResponse([], '로그아웃 되었습니다.');
} else {
    errorResponse('Invalid request method', 405);
}
?>
