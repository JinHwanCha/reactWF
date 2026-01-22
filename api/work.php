<?php
require_once __DIR__ . '/config.php';

// 인증 확인
if (!isAuthenticated()) {
    errorResponse('인증이 필요합니다.', 401);
}

$dataFile = DATA_DIR . '/work.json';

// GET - 데이터 조회
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        $data = json_decode(file_get_contents($dataFile), true);
        jsonResponse($data ?: []);
    } else {
        jsonResponse([]);
    }
}

// POST - 데이터 추가
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // 기존 데이터 로드
    $data = [];
    if (file_exists($dataFile)) {
        $data = json_decode(file_get_contents($dataFile), true) ?: [];
    }
    
    // 새 항목 추가
    $newItem = [
        'id' => time() . mt_rand(1000, 9999),
        'title' => $input['title'] ?? '',
        'description' => $input['description'] ?? '',
        'category' => $input['category'] ?? 'worship',
        'date' => $input['date'] ?? date('Y년 m월'),
        'image' => $input['image'] ?? '',
        'group' => $input['group'] ?? 'fishermen',
        'createdAt' => date('c')
    ];
    
    array_unshift($data, $newItem); // 최신 항목을 맨 앞에 추가
    
    // 파일 저장
    if (file_put_contents($dataFile, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT))) {
        successResponse(['data' => $newItem], 'Work 항목이 등록되었습니다!');
    } else {
        errorResponse('데이터 저장에 실패했습니다.');
    }
}

// PUT - 데이터 수정
elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;
    
    if (!$id) {
        errorResponse('ID가 필요합니다.');
    }
    
    if (file_exists($dataFile)) {
        $data = json_decode(file_get_contents($dataFile), true) ?: [];
        $found = false;
        
        foreach ($data as &$item) {
            if ($item['id'] == $id) {
                $item['title'] = $input['title'] ?? $item['title'];
                $item['description'] = $input['description'] ?? $item['description'];
                $item['category'] = $input['category'] ?? $item['category'];
                $item['date'] = $input['date'] ?? $item['date'];
                $item['image'] = $input['image'] ?? $item['image'];
                $item['group'] = $input['group'] ?? $item['group'];
                $item['updatedAt'] = date('c');
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            errorResponse('해당 ID의 항목을 찾을 수 없습니다.');
        }
        
        if (file_put_contents($dataFile, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT))) {
            successResponse([], '수정되었습니다.');
        } else {
            errorResponse('데이터 저장에 실패했습니다.');
        }
    } else {
        errorResponse('데이터 파일이 존재하지 않습니다.');
    }
}

// DELETE - 데이터 삭제
elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // URL에서 ID 추출 (예: /api/work.php?id=123)
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        errorResponse('ID가 필요합니다.');
    }
    
    if (file_exists($dataFile)) {
        $data = json_decode(file_get_contents($dataFile), true) ?: [];
        $data = array_filter($data, function($item) use ($id) {
            return $item['id'] != $id;
        });
        
        // 배열 인덱스 재정렬
        $data = array_values($data);
        
        if (file_put_contents($dataFile, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT))) {
            successResponse([], '삭제되었습니다.');
        } else {
            errorResponse('데이터 저장에 실패했습니다.');
        }
    } else {
        errorResponse('데이터 파일이 존재하지 않습니다.');
    }
}

else {
    errorResponse('Invalid request method', 405);
}
?>
