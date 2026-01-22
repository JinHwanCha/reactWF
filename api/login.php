<?php
require_once __DIR__ . '/config.php';

// 로그인 처리
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';
    
    if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
        $_SESSION['authenticated'] = true;
        $_SESSION['username'] = $username;
        $_SESSION['login_time'] = time();
        
        successResponse(['username' => $username], '로그인 성공!');
    } else {
        errorResponse('아이디 또는 비밀번호가 잘못되었습니다.', 401);
    }
}
?>
