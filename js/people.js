// ===========================
// People Page JavaScript (people.html)
// 피플 페이지 전용 기능
// ===========================

// People 데이터
let peopleData = [];

// ===========================
// Render People Grid
// ===========================
function renderPeopleGrid() {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid || peopleData.length === 0) return;
    
    teamGrid.innerHTML = peopleData.map(person => `
        <div class="team-member" data-group="${person.group || 'fishermen'}">
            <div class="member-photo">
                ${person.image ? `<img src="/${person.image}" alt="${person.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;">` : ''}
            </div>
            <h3>${person.name}</h3>
            <p class="member-role">${person.position || ''}</p>
            <p class="member-bio">${person.bio || ''}</p>
        </div>
    `).join('');
    
    // Re-initialize interactions
    initializeTeamMemberInteractions();
}

// ===========================
// Team Member Interactions
// ===========================
function initializeTeamMemberInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');

    if (teamMembers.length > 0) {
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', () => {
                member.style.transform = 'translateY(-10px)';
            });
            
            member.addEventListener('mouseleave', () => {
                member.style.transform = 'translateY(0)';
            });
            
            member.addEventListener('click', () => {
                const memberName = member.querySelector('h3');
                if (memberName) {
                    // Member clicked event could be handled here
                }
            });
        });
    }
}

// ===========================
// Department Cards Hover Effect
// ===========================
const departmentCards = document.querySelectorAll('.department-card');

if (departmentCards.length > 0) {
    departmentCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ===========================
// Initialize on Page Load
// ===========================
document.addEventListener('DOMContentLoaded', async () => {
    // 기존 HTML에 있는 team members 초기화
    initializeTeamMemberInteractions();
    
    // JSON 데이터 로드
    if (typeof loadJSONData !== 'undefined') {
        const jsonData = await loadJSONData('people.json');
        if (jsonData && jsonData.length > 0) {
            peopleData = jsonData;
            renderPeopleGrid();
        }
    }
});