<?php
require_once __DIR__ . '/config.php';

// 인증 확인
if (!isAuthenticated()) {
    errorResponse('인증이 필요합니다.', 401);
}

// 이미지 업로드 처리
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['image'])) {
        errorResponse('파일이 업로드되지 않았습니다.');
    }
    
    $file = $_FILES['image'];
    
    // 파일 에러 체크
    if ($file['error'] !== UPLOAD_ERR_OK) {
        errorResponse('파일 업로드 중 오류가 발생했습니다.');
    }
    
    // 파일 크기 체크
    if ($file['size'] > MAX_FILE_SIZE) {
        errorResponse('파일 크기는 5MB를 초과할 수 없습니다.');
    }
    
    // 확장자 체크
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, ALLOWED_EXTENSIONS)) {
        errorResponse('허용되지 않는 파일 형식입니다. (JPG, PNG, GIF, WEBP만 가능)');
    }
    
    // 파일명 생성 (중복 방지)
    $filename = time() . '-' . mt_rand(100000, 999999) . '.' . $ext;
    $uploadPath = UPLOAD_DIR . '/' . $filename;
    
    // 파일 이동
    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        $relativePath = 'images/uploads/' . $filename;
        successResponse([
            'filename' => $filename,
            'path' => '/' . $relativePath,
            'url' => $relativePath
        ], '이미지가 업로드되었습니다!');
    } else {
        errorResponse('파일 저장에 실패했습니다.');
    }
} else {
    errorResponse('Invalid request method', 405);
}
?>
