<?php
// ===========================
// 관리자 페이지 설정
// ===========================

// 세션 시작
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// 관리자 계정 정보
define('ADMIN_USERNAME', 'fisherman');
define('ADMIN_PASSWORD', 'ns7076351!');

// 데이터 디렉토리
define('DATA_DIR', __DIR__ . '/../data');
define('UPLOAD_DIR', __DIR__ . '/../images/uploads');

// 업로드 설정
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'webp']);

// JSON 응답 헤더
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS 요청 처리 (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 디렉토리 생성 (없으면)
if (!file_exists(DATA_DIR)) {
    mkdir(DATA_DIR, 0755, true);
}
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

// 인증 확인 함수
function isAuthenticated() {
    return isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true;
}

// JSON 응답 함수
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// 에러 응답 함수
function errorResponse($message, $statusCode = 400) {
    jsonResponse(['error' => $message, 'success' => false], $statusCode);
}

// 성공 응답 함수
function successResponse($data = [], $message = 'Success') {
    jsonResponse(array_merge(['success' => true, 'message' => $message], $data));
}
?>
