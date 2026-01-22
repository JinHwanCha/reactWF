// ===========================
// Common JavaScript for All Pages
// 모든 페이지에서 공통으로 사용되는 기능
// ===========================

// ===========================
// Group Configuration Data
// ===========================
const GROUP_CONFIG = {
    witness: {
        theme: 'witness-theme',
        logo: 'WITNESS',
        hero: {
            image: `<img src="./images/witness.png" alt="Witness Logo" style="width: 200px; margin:0 auto 20px; border-radius: 100%;">`,
            lines: ['성령의 권능으로', '세상의 증인이 되는', 'Witness'],
            subtitle: '내수동교회 대학부와 함께 믿음의 여정을 시작하세요'
        },
        ceo: {
            header: '담당사역자 메시지 메시지',
            quote: '"오직 성령이 너희에게 임하시면 너희가 권능을 받고... 땅 끝까지 이르러 내 증인이 되리라" (사도행전 1:8)',
            paragraphs: [
                'Witness는 사도행전 1장 8절 말씀처럼, 성령의 권능을 받아 이 땅에서 그리스도의 증인으로 살아가고자 하는 대학생들의 공동체입니다.',
                '우리는 함께 예배하고, 말씀을 나누며, 서로 사랑하고 격려합니다. 대학생으로서 캠퍼스와 사회 속에서 복음을 증거하며, 각자의 달란트를 발견하고 개발하여 하나님 나라를 위해 사용합니다.',
                '내수동교회 대학부 Witness와 함께 믿음의 여정을 시작하시길 초대합니다. 주님 안에서 함께 성장하고, 서로를 세우며, 땅 끝까지 복음을 전하는 대학부 공동체가 되기를 소망합니다.'
            ],
            blockquote: '"땅 끝까지 이르러 내 증인이 되리라"',
            signature: '내수동교회 대학부 목사'
        },
        sections: {
            companyInfo: '대학부 소개',
            businessAreas: '대학부 사역',
            memberTitle: '대학부원'
        },
        footer: {
            title: 'Witness',
            description: '내수동교회 대학부 - 땅 끝까지 이르러 내 증인이 되리라',
            copyright: '© 2026 Witness 내수동교회 대학부. All Rights Reserved.',
            followUs: '소통채널',
            social: {
                instagram: 'https://www.instagram.com/witnessofchrist/',
                youtube: 'https://youtube.com/@naesoo_witness?si=Wtpkn_RkcNlRV-rk',
                kakao: 'https://pf.kakao.com/_qZZbxb'
            }
        },
        contact: {
            description: '내수동교회 대학부 Witness가 여러분을 환영합니다'
        },
        stats: {
            year: '1973',
            members: '175',
            groups: '6',
            events: '15'
        }
    },
    fishermen: {
        theme: '',
        logo: 'FISHERMEN',
        hero: {
            image: `<img src="./images/fishermen.png" alt="Fishermen Logo" style="filter: brightness(0) invert(1); width: 200px; margin:0 auto 20px;">`,
            lines: ['사람을 낚는', '어부가 되리라', 'Fishermen'],
            subtitle: '내수동교회 청년부와 함께 믿음의 여정을 시작하세요'
        },
        ceo: {
            header: '담당사역자 메시지 메시지',
            quote: '"나를 따라오라 내가 너희를 사람을 낚는 어부가 되게 하리라" (마태복음 4:19)',
            paragraphs: [
                'Fishermen은 예수님의 이 말씀처럼, 주님의 부르심에 응답하여 세상 속에서 빛과 소금의 역할을 감당하고자 하는 청년들의 공동체입니다.',
                '우리는 함께 예배하고, 말씀을 나누며, 서로 사랑하고 격려합니다. 각자의 달란트를 발견하고 개발하여 하나님 나라를 위해 사용하며, 이 시대의 청년으로서 복음을 전하는 삶을 살아갑니다.',
                '내수동교회 청년부 Fishermen과 함께 믿음의 여정을 시작하시길 초대합니다. 주님 안에서 함께 성장하고, 서로를 세우며, 세상을 변화시키는 청년 공동체가 되기를 소망합니다.'
            ],
            blockquote: '"사람을 낚는 어부가 되리라"',
            signature: '내수동교회 청년부 목사'
        },
        sections: {
            companyInfo: '청년부 소개',
            businessAreas: '청년부 사역',
            memberTitle: '청년부원'
        },
        footer: {
            title: 'Fishermen',
            description: '내수동교회 청년부 - 사람을 낚는 어부가 되리라',
            copyright: '© 2026 Fishermen 내수동교회 청년부. All Rights Reserved.',
            followUs: 'Follow Us',
            social: {
                instagram: 'https://www.instagram.com/naesoofishermen/',
                youtube: 'https://youtube.com/@naesoofishermen?si=ok791-vDT4c4XJIC',
                kakao: 'https://pf.kakao.com/_xibZxhC'
            }
        },
        contact: {
            description: '내수동교회 청년부 Fishermen이 여러분을 환영합니다'
        },
        stats: {
            year: '1979',
            members: '213',
            groups: '8',
            events: '17'
        }
    }
};

// ===========================
// DOM Update Utilities
// ===========================
const DOMUpdater = {
    updateText(selector, text) {
        const el = document.querySelector(selector);
        if (el) el.textContent = text;
    },
    
    updateHTML(selector, html) {
        const el = document.querySelector(selector);
        if (el) el.innerHTML = html;
    },
    
    updateAll(selector, callback) {
        document.querySelectorAll(selector).forEach(callback);
    },
    
    updateByCondition(selector, condition, text) {
        this.updateAll(selector, el => {
            if (condition(el)) el.textContent = text;
        });
    }
};

// ===========================
// Group Toggle (Witness / Fishermen)
// ===========================
function initGroupToggle() {
    const urlParams = new URLSearchParams(window.location.search);
    const group = urlParams.get('group') || 'fishermen';
    const toggle = document.getElementById('groupToggle');
    const logo = document.querySelector('.logo-text');
    const witnessLabel = document.querySelector('.witness-label');
    const fishermenLabel = document.querySelector('.fishermen-label');
    
    function updateTheme(selectedGroup) {
        const config = GROUP_CONFIG[selectedGroup];
        const isWitness = selectedGroup === 'witness';
        
        // Theme & Logo
        document.body.classList.toggle('witness-theme', isWitness);
        toggle?.classList.toggle('active', !isWitness);
        if (logo) logo.textContent = config.logo;
        witnessLabel?.classList.toggle('inactive', !isWitness);
        fishermenLabel?.classList.toggle('inactive', isWitness);
        
        // Hero Section
        const heroLines = document.querySelectorAll('.hero-title .line');
        if (heroLines.length >= 4) {
            heroLines[0].innerHTML = config.hero.image;
            config.hero.lines.forEach((text, i) => {
                if (heroLines[i + 1]) heroLines[i + 1].textContent = text;
            });
        }
        DOMUpdater.updateText('.hero-subtitle', config.hero.subtitle);
        
        // CEO/Leader Section
        DOMUpdater.updateText('.ceo-message .section-header h2', config.ceo.header);
        DOMUpdater.updateText('.ceo-text .large-text', config.ceo.quote);
        
        const ceoParagraphs = document.querySelectorAll('.ceo-text p:not(.large-text)');
        config.ceo.paragraphs.forEach((text, i) => {
            if (ceoParagraphs[i]) ceoParagraphs[i].textContent = text;
        });
        
        DOMUpdater.updateText('.ceo-text blockquote', config.ceo.blockquote);
        DOMUpdater.updateText('.ceo-signature strong', config.ceo.signature);
        
        // Section Headers
        DOMUpdater.updateText('.company-info .section-header h2', config.sections.companyInfo);
        DOMUpdater.updateText('.business-areas .section-header h2', config.sections.businessAreas);
        DOMUpdater.updateText('.business-areas .section-header p', '다양한 사역을 통해 함께 성장합니다');
        DOMUpdater.updateText('.featured-work .section-header h2', '최근 활동');
        
        // Info Cards & Navigation
        const oldMemberTitle = isWitness ? '청년부원' : '대학부원';
        const newMemberTitle = config.sections.memberTitle;
        
        DOMUpdater.updateByCondition('.info-card h3', 
            el => el.textContent === oldMemberTitle, 
            newMemberTitle
        );
        
        DOMUpdater.updateAll('.nav-menu a', link => {
            if (link.getAttribute('href') === '/people/') {
                link.textContent = newMemberTitle;
            }
        });
        
        // Footer
        const footerTitle = document.querySelector('.footer-col h4');
        const oldFooterTitle = isWitness ? 'Fishermen' : 'Witness';
        if (footerTitle && footerTitle.textContent === oldFooterTitle) {
            footerTitle.textContent = config.footer.title;
        }
        
        const footerDesc = document.querySelector('.footer-col p');
        if (footerDesc && footerDesc.textContent.includes(isWitness ? '청년부' : '대학부')) {
            footerDesc.textContent = config.footer.description;
        }
        
        DOMUpdater.updateByCondition('.footer-col ul li a',
            el => el.textContent === oldMemberTitle,
            newMemberTitle
        );
        
        const footerBottom = document.querySelector('.footer-bottom p');
        if (footerBottom && footerBottom.textContent.includes(oldFooterTitle)) {
            footerBottom.textContent = config.footer.copyright;
        }
        
        DOMUpdater.updateByCondition('.footer-col h4',
            el => el.textContent === (isWitness ? 'Follow Us' : '소통채널'),
            config.footer.followUs
        );
        
        // Update social links
        if (config.footer.social) {
            const socialLinks = document.querySelectorAll('.social-links a');
            socialLinks.forEach(link => {
                const text = link.textContent.trim();
                if (text === 'Instagram' && config.footer.social.instagram) {
                    link.href = config.footer.social.instagram;
                } else if (text === 'YouTube' && config.footer.social.youtube) {
                    link.href = config.footer.social.youtube;
                } else if (text === 'KakaoTalk' && config.footer.social.kakao) {
                    link.href = config.footer.social.kakao;
                }
            });
        }
        
        // Contact Section
        DOMUpdater.updateText('.contact-content h2', '함께하고 싶으신가요?');
        const contactDesc = document.querySelector('.contact-content p');
        if (contactDesc && contactDesc.textContent.includes(isWitness ? '청년부' : '대학부')) {
            contactDesc.textContent = config.contact.description;
        }
        
        // Statistics
        DOMUpdater.updateText('[data-stat="year"]', config.stats.year);
        DOMUpdater.updateText('[data-stat="members"]', config.stats.members);
        DOMUpdater.updateText('[data-stat="member-title"]', newMemberTitle);
        DOMUpdater.updateText('[data-stat="groups"]', config.stats.groups);
        DOMUpdater.updateText('[data-stat="events"]', config.stats.events);
        
        // Filter content by group
        filterContentByGroup(selectedGroup);
        
        // Dispatch custom event for other scripts to listen
        document.dispatchEvent(new CustomEvent('groupChanged', { detail: { group: selectedGroup } }));
    }
    
    // Combined filter function
    function filterContentByGroup(group) {
        filterWorkByGroup(group);
        filterNewsByGroup(group);
        filterPeopleByGroup(group);
    }
    
    // ===========================
    // Generic Filter Function
    // ===========================
    function filterByGroup(selectors, group, options = {}) {
        const {
            displayType = 'block',
            withTransform = false,
            delay = 50,
            transitionDuration = 300
        } = options;
        
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                const itemGroup = element.getAttribute('data-group');
                const matches = itemGroup === group;
                
                if (matches) {
                    element.style.display = displayType;
                    setTimeout(() => {
                        element.style.opacity = '1';
                        if (withTransform) element.style.transform = 'translateY(0)';
                    }, delay);
                } else {
                    element.style.opacity = '0';
                    if (withTransform) element.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        element.style.display = 'none';
                    }, transitionDuration);
                }
            });
        });
    }
    
    // Filter work gallery by group
    function filterWorkByGroup(group) {
        const galleryItems = document.querySelectorAll('.gallery-item[data-group]');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const activeFilter = document.querySelector('.filter-btn.active');
        const currentFilter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        
        galleryItems.forEach(item => {
            const itemGroup = item.getAttribute('data-group');
            const itemCategory = item.getAttribute('data-category');
            const matchesGroup = itemGroup === group;
            const matchesFilter = currentFilter === 'all' || itemCategory === currentFilter;
            
            item.style.display = matchesGroup && matchesFilter ? 'block' : 'none';
            item.style.opacity = matchesGroup && matchesFilter ? '1' : '0';
            item.style.transform = matchesGroup && matchesFilter ? 'scale(1)' : '';
        });
        
        // Reset filter to "all" when switching groups
        if (filterButtons.length > 0) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            const allButton = document.querySelector('.filter-btn[data-filter="all"]');
            if (allButton) allButton.classList.add('active');
        }
    }
    
    // Filter news by group
    function filterNewsByGroup(group) {
        // Filter featured articles
        const featuredArticles = document.querySelectorAll('.featured-article[data-group]');
        featuredArticles.forEach(article => {
            const itemGroup = article.getAttribute('data-group');
            article.style.display = itemGroup === group ? 'grid' : 'none';
        });
        
        // Filter news cards
        const newsCards = document.querySelectorAll('.news-card[data-group]');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const activeFilter = document.querySelector('.filter-btn.active');
        const currentFilter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        
        newsCards.forEach(card => {
            const itemGroup = card.getAttribute('data-group');
            const itemCategory = card.getAttribute('data-category');
            const matchesGroup = itemGroup === group;
            const matchesFilter = currentFilter === 'all' || itemCategory === currentFilter;
            
            card.style.display = matchesGroup && matchesFilter ? 'block' : 'none';
            card.style.opacity = matchesGroup && matchesFilter ? '1' : '0';
            card.style.transform = matchesGroup && matchesFilter ? 'translateY(0)' : '';
        });
        
        // Reset filter to "all" when switching groups
        if (filterButtons.length > 0) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            const allButton = document.querySelector('.filter-btn[data-filter="all"]');
            if (allButton) allButton.classList.add('active');
        }
        
        // Trigger pagination update if on news page
        if (typeof showPage === 'function') {
            currentPage = 1;
            showPage();
        }
    }
    
    // Filter people by group
    function filterPeopleByGroup(group) {
        filterByGroup(['.header-content[data-group]'], group, { displayType: 'block' });
        filterByGroup(['.culture-content[data-group]'], group, { displayType: 'grid' });
        filterByGroup(['.team-member[data-group]', '.department-card[data-group]'], group, { 
            displayType: 'block', 
            withTransform: true 
        });
        filterByGroup(['.careers-text[data-group]'], group, { displayType: 'block' });
    }
    
    // Initialize theme
    updateTheme(group);
    
    // Toggle click handler
    if (toggle) {
        toggle.addEventListener('click', () => {
            // 클릭 시마다 현재 URL에서 group 파라미터를 새로 읽음
            const currentUrlParams = new URLSearchParams(window.location.search);
            const currentGroup = currentUrlParams.get('group') || 'fishermen';
            const newGroup = currentGroup === 'witness' ? 'fishermen' : 'witness';
            
            // Update URL without reload
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('group', newGroup);
            window.history.pushState({}, '', newUrl);
            
            updateTheme(newGroup);
        });
    }
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const group = urlParams.get('group') || 'fishermen';
        updateTheme(group);
    });
}

// Add group parameter to all internal links on click
function addGroupToLink(event) {
    const link = event.currentTarget;
    const href = link.getAttribute('href');
    
    // Skip if external
    if (!href || href.startsWith('http')) {
        return;
    }
    
    // Get current group from URL or body class
    const urlParams = new URLSearchParams(window.location.search);
    let currentGroup = urlParams.get('group');
    
    // If no URL param, check body class
    if (!currentGroup) {
        currentGroup = document.body.classList.contains('witness-theme') ? 'witness' : 'fishermen';
    }
    
    // Handle anchor-only links (like #contact on same page)
    if (href.startsWith('#') && !href.startsWith('/#')) {
        event.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
        return;
    }
    
    // Only add if group is witness (fishermen is default)
    if (currentGroup === 'witness' && !href.includes('group=')) {
        event.preventDefault();
        
        // Handle /#contact style links (cross-page anchors)
        if (href.includes('#')) {
            // Split URL and anchor
            const [path, anchor] = href.split('#');
            const separator = path.includes('?') ? '&' : '?';
            // Put group before anchor: /?group=witness#contact
            window.location.href = `${path}${separator}group=${currentGroup}#${anchor}`;
        } else {
            // Regular page link
            const separator = href.includes('?') ? '&' : '?';
            window.location.href = `${href}${separator}group=${currentGroup}`;
        }
    }
}

// Attach click handlers to all internal links
function attachLinkHandlers() {
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], .nav-menu a, .logo a');
    links.forEach(link => {
        link.removeEventListener('click', addGroupToLink); // Remove old listeners
        link.addEventListener('click', addGroupToLink);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initGroupToggle();
    attachLinkHandlers();
    
    // Re-attach handlers when toggle is clicked
    const toggle = document.getElementById('groupToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            setTimeout(attachLinkHandlers, 50);
        });
    }
});

// ===========================
// Navigation
// ===========================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===========================
// Smooth Scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Scroll Reveal Animation
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Add scroll-reveal class to elements
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll(
        '.info-card, .business-card, .work-item, .news-card, .team-member, .department-card, .gallery-item'
    );
    
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
});

// ===========================
// Newsletter Form
// ===========================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simple validation
        if (email && email.includes('@')) {
            alert('구독해 주셔서 감사합니다! 곧 최신 소식을 이메일로 받아보실 수 있습니다.');
            newsletterForm.reset();
        } else {
            alert('올바른 이메일 주소를 입력해주세요.');
        }
    });
}

// ===========================
// Page Load Animation
// ===========================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===========================
// Back to Top Button
// ===========================
const backToTop = document.createElement('button');
backToTop.innerHTML = '↑';
backToTop.className = 'back-to-top';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--accent-color, #ff6b35);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
`;

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Generic Modal System
// ===========================
function initModal(config) {
    const {
        modalId,           // 모달 요소 ID
        triggerSelector,   // 트리거 버튼 선택자 (.view-project, .read-more 등)
        parentSelector,    // 데이터를 가져올 부모 요소 선택자
        titleSelector = 'h3',     // 제목 선택자 (기본값: h3)
        categorySelector,  // 카테고리 선택자
        dateSelector,      // 날짜 선택자
        descriptionAttr = 'data-description'  // 설명 속성명
    } = config;

    const modal = document.getElementById(modalId);
    if (!modal) return;

    const modalTitle = modal.querySelector('#modalTitle');
    const modalCategory = modal.querySelector('#modalCategory');
    const modalDate = modal.querySelector('#modalDate');
    const modalDescription = modal.querySelector('#modalDescription');
    const closeModal = modal.querySelector('.close-modal');

    // Open modal function
    function openModal(triggerBtn) {
        const parent = triggerBtn.closest(parentSelector);
        if (!parent) return;

        const title = parent.querySelector(titleSelector)?.textContent || '';
        const category = categorySelector ? parent.querySelector(categorySelector)?.textContent || '' : '';
        const date = dateSelector ? parent.querySelector(dateSelector)?.textContent || '' : '';
        const description = parent.getAttribute(descriptionAttr) || '';

        if (modalTitle) modalTitle.textContent = title;
        if (modalCategory && category) modalCategory.textContent = category;
        if (modalDate && date) modalDate.textContent = date;
        if (modalDescription) modalDescription.textContent = description;

        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    // Close modal function
    function closeModalFunc() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Attach event listeners
    function attachListeners() {
        const triggers = document.querySelectorAll(triggerSelector);
        
        triggers.forEach(btn => {
            // Remove existing listeners to prevent duplicates
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(newBtn);
            });
        });
    }

    // Initial attachment
    attachListeners();

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
    const escHandler = (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunc();
        }
    };
    document.addEventListener('keydown', escHandler);

    // Return attach function for re-initialization
    return {
        reattach: attachListeners
    };
}
