// ===========================
// Home Page JavaScript (index.html)
// 메인 페이지 전용 기능
// ===========================

// ===========================
// Parallax Effect for Hero
// ===========================
const hero = document.querySelector('.hero');
if (hero) {
    const heroContent = hero.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        // Apply transform only to hero-content, not the entire hero section
        if (heroContent) {
            heroContent.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// ===========================
// Counter Animation
// ===========================
const counterSpeed = 200;

const countUp = (counter) => {
    const target = counter.textContent.replace(/[^0-9]/g, '');
    const increment = parseInt(target) / counterSpeed;
    let count = 0;
    
    const updateCount = () => {
        count += increment;
        if (count < parseInt(target)) {
            counter.textContent = Math.ceil(count).toLocaleString();
            requestAnimationFrame(updateCount);
        } else {
            counter.textContent = target.toLocaleString();
        }
    };
    
    updateCount();
};

// Function to trigger counter animation
function triggerCounterAnimation() {
    const counters = document.querySelectorAll('.big-number');
    counters.forEach(counter => {
        if (counter.classList.contains('counted')) {
            countUp(counter);
        }
    });
}

// Observe counters on scroll
const counters = document.querySelectorAll('.big-number');
if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                countUp(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===========================
// Mouse Follow Effect for Cards
// ===========================
const cards = document.querySelectorAll('.info-card, .business-card');

cards.forEach(card => {
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

// ===========================
// Recent Work Section
// ===========================
async function renderRecentWork() {
    const recentWorkGrid = document.getElementById('recentWorkGrid');
    if (!recentWorkGrid) {
        return;
    }
    
    // Category display names (use from work.js if available)
    const categoryNames = {
        worship: '예배',
        event: '행사',
        mission: '선교',
        service: '봉사'
    };
    
    // Get current group
    const urlParams = new URLSearchParams(window.location.search);
    const currentGroup = urlParams.get('group') || 
                        (document.body.classList.contains('witness-theme') ? 'witness' : 'fishermen');
    
    // Load work data from JSON
    let workData = [];
    if (typeof loadJSONData !== 'undefined') {
        workData = await loadJSONData('work.json');
    } else {
        workData = window.workData || [];
    }
    
    // Filter by current group and get latest 3 items
    const recentItems = workData
        .filter(item => item.group === currentGroup)
        .slice(0, 3);
    
    // Render items
    recentWorkGrid.innerHTML = recentItems.map(item => `
        <div class="work-item" 
             data-title="${item.title}"
             data-category="${item.category}"
             data-date="${item.date || item.createdAt || ''}"
             data-description="${item.description}">
            <div class="work-image">
                ${item.image ? `<img src="/${item.image}" alt="${item.title}" onerror="this.src='/images/placeholder.jpg'">` : ''}
            </div>
            <div class="work-info">
                <h3>${item.title}</h3>
                <p>${item.date || item.createdAt || ''}</p>
            </div>
        </div>
    `).join('');
    
    // Attach click event to work items
    attachWorkItemListeners(categoryNames);
}

function attachWorkItemListeners(categoryNames) {
    const workItems = document.querySelectorAll('#recentWorkGrid .work-item');
    const modal = document.getElementById('projectModal');
    
    if (!modal) return;
    
    const modalTitle = modal.querySelector('#modalTitle');
    const modalCategory = modal.querySelector('#modalCategory');
    const modalDate = modal.querySelector('#modalDate');
    const modalDescription = modal.querySelector('#modalDescription');
    const closeModal = modal.querySelector('.close-modal');
    
    // Close modal function
    function closeModalFunc() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    // Close button
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunc();
        }
    });
    
    workItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const category = item.getAttribute('data-category');
            const date = item.getAttribute('data-date');
            const description = item.getAttribute('data-description');
            
            if (modalTitle) modalTitle.textContent = title;
            if (modalCategory) modalCategory.textContent = categoryNames[category] || category;
            if (modalDate) modalDate.textContent = date;
            if (modalDescription) modalDescription.textContent = description;
            
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    });
}

// Initialize recent work on page load
document.addEventListener('DOMContentLoaded', () => {
    // Delay rendering to ensure work.js is fully loaded
    setTimeout(() => {
        renderRecentWork();
    }, 100);
});

// Listen for group change events from common.js toggle
document.addEventListener('groupChanged', (e) => {
    renderRecentWork();
    
    // Trigger counter animation when toggle is clicked
    // Add delay to allow DOM update first
    setTimeout(() => {
        triggerCounterAnimation();
    }, 50);
});
