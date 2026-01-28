// 인증 확인
fetch('/api/check-auth.php')
    .then(res => res.json())
    .then(data => {
        if (!data.isAuthenticated) {
            window.location.href = '/admin/index.html';
        }
    });

// 탭 전환
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // 탭 버튼 활성화
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // 탭 컨텐츠 활성화
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        // 데이터 로드
        loadData(tabName);
    });
});

// 로그아웃
function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        fetch('/api/logout.php', { method: 'POST' })
            .then(() => {
                window.location.href = '/admin/index.html';
            });
    }
}

// 로딩 표시
function showLoading() {
    document.getElementById('loadingOverlay').classList.add('show');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('show');
}

// 알림 표시
function showAlert(section, message, type = 'success') {
    const alertDiv = document.getElementById(`${section}Alert`);
    alertDiv.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        alertDiv.innerHTML = '';
    }, 3000);
}

// ==================== 이미지 업로드 ====================
function setupImageUpload(section) {
    const uploadDiv = document.getElementById(`${section}ImageUpload`);
    const input = document.getElementById(`${section}ImageInput`);
    const preview = document.getElementById(`${section}ImagePreview`);
    const pathInput = document.getElementById(`${section}ImagePath`);
    
    // 클릭으로 파일 선택
    uploadDiv.addEventListener('click', () => input.click());
    
    // 드래그 앤 드롭
    uploadDiv.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadDiv.classList.add('dragging');
    });
    
    uploadDiv.addEventListener('dragleave', () => {
        uploadDiv.classList.remove('dragging');
    });
    
    uploadDiv.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadDiv.classList.remove('dragging');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            uploadImage(file, section);
        }
    });
    
    // 파일 선택 시
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImage(file, section);
        }
    });
}

async function uploadImage(file, section) {
    const preview = document.getElementById(`${section}ImagePreview`);
    const pathInput = document.getElementById(`${section}ImagePath`);
    
    // 미리보기
    const reader = new FileReader();
    reader.onload = (e) => {
        preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
    
    // 서버 업로드
    showLoading();
    const formData = new FormData();
    formData.append('image', file);
    
    try {
        const response = await fetch('/api/upload-image.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            pathInput.value = data.url;
            showAlert(section, '이미지가 업로드되었습니다!', 'success');
        } else {
            throw new Error(data.error || '업로드 실패');
        }
    } catch (error) {
        showAlert(section, '이미지 업로드 실패: ' + error.message, 'error');
        preview.innerHTML = '';
        pathInput.value = '';
    } finally {
        hideLoading();
    }
}

// ==================== Work ====================
setupImageUpload('work');

let editingWorkId = null;

// 취소 버튼
function cancelEditWork() {
    editingWorkId = null;
    document.getElementById('workEditId').value = '';
    document.getElementById('workEditMode').classList.remove('show');
    document.getElementById('workSubmitBtn').textContent = '등록하기';
    document.getElementById('workForm').reset();
    document.getElementById('workImagePreview').innerHTML = '';
    document.getElementById('workImagePath').value = '';
}

// 수정 버튼 클릭
function editWork(id) {
    fetch('/api/work.php')
        .then(res => res.json())
        .then(data => {
            const item = data.find(i => i.id == id);
            if (item) {
                editingWorkId = id;
                document.getElementById('workEditId').value = id;
                document.getElementById('workEditMode').classList.add('show');
                document.getElementById('workSubmitBtn').textContent = '수정하기';
                
                // 폼에 데이터 채우기
                const form = document.getElementById('workForm');
                form.querySelector('[name="title"]').value = item.title || '';
                form.querySelector('[name="description"]').value = item.description || '';
                form.querySelector('[name="category"]').value = item.category || 'worship';
                form.querySelector('[name="date"]').value = item.date || '';
                form.querySelector('[name="group"]').value = item.group || 'fishermen';
                document.getElementById('workImagePath').value = item.image || '';
                
                // 이미지 미리보기
                if (item.image) {
                    document.getElementById('workImagePreview').innerHTML = 
                        `<img src="/${item.image}" alt="Preview">`;
                }
                
                // 폼으로 스크롤
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
}

document.getElementById('workForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // editId 제거
    delete data.editId;
    
    showLoading();
    
    try {
        let response;
        
        if (editingWorkId) {
            // 수정 모드
            data.id = editingWorkId;
            response = await fetch('/api/work.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            // 등록 모드
            response = await fetch('/api/work.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('work', editingWorkId ? 'Work 항목이 수정되었습니다!' : 'Work 항목이 등록되었습니다!', 'success');
            cancelEditWork();
            loadData('work');
        }
    } catch (error) {
        showAlert('work', '처리 실패: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
});

async function loadWorkData() {
    try {
        const response = await fetch('/api/work.php');
        const data = await response.json();
        
        const listDiv = document.getElementById('workList');
        
        if (data.length === 0) {
            listDiv.innerHTML = '<p style="text-align: center; color: #999;">등록된 항목이 없습니다.</p>';
            return;
        }
        
        // 카테고리 이름 매핑
        const categoryNames = {
            worship: '예배',
            event: '행사',
            mission: '선교',
            service: '봉사'
        };
        
        listDiv.innerHTML = data.map(item => `
            <div class="item-card">
                ${item.image ? `<img src="/${item.image}" alt="${item.title}" onerror="this.style.display='none'">` : ''}
                <h3>${item.title}</h3>
                <p>${item.description || ''}</p>
                ${item.category ? `<span class="meta">카테고리: ${categoryNames[item.category] || item.category}</span><br>` : ''}
                ${item.date ? `<span class="meta">날짜: ${item.date}</span><br>` : ''}
                ${item.group ? `<span class="meta">그룹: ${item.group === 'witness' ? 'Witness' : 'Fishermen'}</span><br>` : ''}
                <div class="meta">${new Date(item.createdAt).toLocaleDateString('ko-KR')}</div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editWork(${item.id})">수정</button>
                    <button class="btn-delete" onclick="deleteWork(${item.id})">삭제</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Work 데이터 로드 실패:', error);
    }
}

async function deleteWork(id) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    showLoading();
    try {
        await fetch(`/api/work.php?id=${id}`, { method: 'DELETE' });
        showAlert('work', '삭제되었습니다.', 'success');
        loadData('work');
    } catch (error) {
        showAlert('work', '삭제 실패: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// ==================== News ====================
setupImageUpload('news');

let editingNewsId = null;

// 취소 버튼
function cancelEditNews() {
    editingNewsId = null;
    document.getElementById('newsEditId').value = '';
    document.getElementById('newsEditMode').classList.remove('show');
    document.getElementById('newsSubmitBtn').textContent = '등록하기';
    document.getElementById('newsForm').reset();
    document.getElementById('newsImagePreview').innerHTML = '';
    document.getElementById('newsImagePath').value = '';
    document.querySelector('#newsForm input[name="date"]').value = 
        new Date().toLocaleDateString('ko-KR');
}

// 수정 버튼 클릭
function editNews(id) {
    fetch('/api/news.php')
        .then(res => res.json())
        .then(data => {
            const item = data.find(i => i.id == id);
            if (item) {
                editingNewsId = id;
                document.getElementById('newsEditId').value = id;
                document.getElementById('newsEditMode').classList.add('show');
                document.getElementById('newsSubmitBtn').textContent = '수정하기';
                
                // 폼에 데이터 채우기
                const form = document.getElementById('newsForm');
                form.querySelector('[name="title"]').value = item.title || '';
                form.querySelector('[name="content"]').value = item.description || item.content || '';
                form.querySelector('[name="category"]').value = item.category || '';
                form.querySelector('[name="date"]').value = item.date || '';
                form.querySelector('[name="group"]').value = item.group || 'fishermen';
                document.getElementById('newsImagePath').value = item.image || '';
                
                // 이미지 미리보기
                if (item.image) {
                    document.getElementById('newsImagePreview').innerHTML = 
                        `<img src="/${item.image}" alt="Preview">`;
                }
                
                // 폼으로 스크롤
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
}

// 현재 날짜 자동 입력
document.querySelector('#newsForm input[name="date"]').value = 
    new Date().toLocaleDateString('ko-KR');

document.getElementById('newsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // editId 제거
    delete data.editId;
    
    showLoading();
    
    try {
        let response;
        
        if (editingNewsId) {
            // 수정 모드
            data.id = editingNewsId;
            response = await fetch('/api/news.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            // 등록 모드
            response = await fetch('/api/news.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('news', editingNewsId ? 'News 항목이 수정되었습니다!' : 'News 항목이 등록되었습니다!', 'success');
            cancelEditNews();
            loadData('news');
        }
    } catch (error) {
        showAlert('news', '처리 실패: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
});

async function loadNewsData() {
    try {
        const response = await fetch('/api/news.php');
        const data = await response.json();

        const listDiv = document.getElementById('newsList');

        if (data.length === 0) {
            listDiv.innerHTML = '<p style="text-align: center; color: #999;">등록된 항목이 없습니다.</p>';
            return;
        }

        // 카테고리 이름 매핑
        const categoryNames = {
            notice: '공지',
            announcement: '공지',
            event: '행사',
            testimony: '간증',
            mission: '선교'
        };

        listDiv.innerHTML = data.map(item => `
            <div class="item-card">
                ${item.image ? `<img src="/${item.image}" alt="${item.title}" onerror="this.style.display='none'">` : ''}
                <h3>${item.title}</h3>
                <p>${item.excerpt || item.description || item.content || ''}</p>
                ${item.category ? `<span class="meta">카테고리: ${categoryNames[item.category] || item.category}</span><br>` : ''}
                ${item.date ? `<span class="meta">날짜: ${item.date}</span><br>` : ''}
                ${item.group ? `<span class="meta">그룹: ${item.group === 'witness' ? 'Witness' : 'Fishermen'}</span><br>` : ''}
                <div class="meta">${new Date(item.createdAt).toLocaleDateString('ko-KR')}</div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editNews(${item.id})">수정</button>
                    <button class="btn-delete" onclick="deleteNews(${item.id})">삭제</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('News 데이터 로드 실패:', error);
    }
}

async function deleteNews(id) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    showLoading();
    try {
        await fetch(`/api/news.php?id=${id}`, { method: 'DELETE' });
        showAlert('news', '삭제되었습니다.', 'success');
        loadData('news');
    } catch (error) {
        showAlert('news', '삭제 실패: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// ==================== People ====================
setupImageUpload('people');

let editingPeopleId = null;

// 취소 버튼
function cancelEditPeople() {
    editingPeopleId = null;
    document.getElementById('peopleEditId').value = '';
    document.getElementById('peopleEditMode').classList.remove('show');
    document.getElementById('peopleSubmitBtn').textContent = '등록하기';
    document.getElementById('peopleForm').reset();
    document.getElementById('peopleImagePreview').innerHTML = '';
    document.getElementById('peopleImagePath').value = '';
}

// 수정 버튼 클릭
function editPeople(id) {
    fetch('/api/people.php')
        .then(res => res.json())
        .then(data => {
            const item = data.find(i => i.id == id);
            if (item) {
                editingPeopleId = id;
                document.getElementById('peopleEditId').value = id;
                document.getElementById('peopleEditMode').classList.add('show');
                document.getElementById('peopleSubmitBtn').textContent = '수정하기';
                
                // 폼에 데이터 채우기
                const form = document.getElementById('peopleForm');
                form.querySelector('[name="name"]').value = item.name || '';
                form.querySelector('[name="position"]').value = item.position || '';
                form.querySelector('[name="group"]').value = item.group || 'fishermen';
                form.querySelector('[name="bio"]').value = item.bio || '';
                document.getElementById('peopleImagePath').value = item.image || '';
                
                // 이미지 미리보기
                if (item.image) {
                    document.getElementById('peopleImagePreview').innerHTML = 
                        `<img src="/${item.image}" alt="Preview">`;
                }
                
                // 폼으로 스크롤
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
}

document.getElementById('peopleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // editId 제거
    delete data.editId;
    
    showLoading();
    
    try {
        let response;
        
        if (editingPeopleId) {
            // 수정 모드
            data.id = editingPeopleId;
            response = await fetch('/api/people.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            // 등록 모드
            response = await fetch('/api/people.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('people', editingPeopleId ? 'People 항목이 수정되었습니다!' : 'People 항목이 등록되었습니다!', 'success');
            cancelEditPeople();
            loadData('people');
        }
    } catch (error) {
        showAlert('people', '처리 실패: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
});

async function loadPeopleData() {
    try {
        const response = await fetch('/api/people.php');
        const data = await response.json();
        
        const listDiv = document.getElementById('peopleList');
        
        if (data.length === 0) {
            listDiv.innerHTML = '<p style="text-align: center; color: #999;">등록된 항목이 없습니다.</p>';
            return;
        }
        
        listDiv.innerHTML = data.map(item => `
            <div class="item-card">
                ${item.image ? `<img src="/${item.image}" alt="${item.name}" onerror="this.style.display='none'">` : ''}
                <h3>${item.name}</h3>
                ${item.position ? `<p><strong>${item.position}</strong></p>` : ''}
                ${item.group ? `<p class="meta">그룹: ${item.group === 'witness' ? 'Witness' : 'Fishermen'}</p>` : ''}
                <p>${item.bio || ''}</p>
                <div class="meta">${new Date(item.createdAt).toLocaleDateString('ko-KR')}</div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editPeople(${item.id})">수정</button>
                    <button class="btn-delete" onclick="deletePeople(${item.id})">삭제</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('People 데이터 로드 실패:', error);
    }
}

async function deletePeople(id) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    showLoading();
    try {
        await fetch(`/api/people.php?id=${id}`, { method: 'DELETE' });
        showAlert('people', '삭제되었습니다.', 'success');
        loadData('people');
    } catch (error) {
        showAlert('people', '삭제 실패: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// ==================== 데이터 로드 ====================
function loadData(section) {
    switch(section) {
        case 'work':
            loadWorkData();
            break;
        case 'news':
            loadNewsData();
            break;
        case 'people':
            loadPeopleData();
            break;
    }
}

// 초기 로드
loadWorkData();
