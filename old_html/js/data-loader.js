// ===========================
// Data Loader Utility
// JSON 파일에서 데이터를 로드하는 공통 유틸리티
// ===========================

/**
 * JSON 데이터 로드 함수
 * @param {string} filename - 로드할 JSON 파일명 (work.json, news.json, people.json)
 * @returns {Promise<Array>} - 로드된 데이터 배열
 */
async function loadJSONData(filename) {
    try {
        const response = await fetch(`/data/${filename}`);
        if (!response.ok) {
            console.warn(`${filename} 파일을 찾을 수 없습니다. 빈 배열을 반환합니다.`);
            return [];
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`${filename} 로드 중 오류:`, error);
        return [];
    }
}

/**
 * 날짜 포맷 함수
 * @param {string} dateString - ISO 날짜 문자열
 * @returns {string} - 포맷된 날짜 (YYYY.MM.DD)
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

/**
 * HTML 엔티티 이스케이프 (XSS 방지)
 * @param {string} str - 이스케이프할 문자열
 * @returns {string} - 이스케이프된 문자열
 */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
