import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGroup } from '../context/GroupContext'
import Modal from '../components/Modal'
import { useCountUp } from '../hooks/useCountUp'
import { useCardHover } from '../hooks/useCardHover'

function InfoCard({ children, icon }) {
  const cardRef = useCardHover()
  return (
    <div className="info-card" ref={cardRef}>
      {icon && <div className="info-icon">{icon}</div>}
      {children}
    </div>
  )
}

function BusinessCard({ number, title, description }) {
  const cardRef = useCardHover()

  return (
    <div className="business-card scroll-reveal" ref={cardRef}>
      <div className="business-number">
        {number}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const { group, config } = useGroup()
  const [recentWork, setRecentWork] = useState([])
  const [modalData, setModalData] = useState(null)

  // Counter animations
  const yearCounter = useCountUp(config.stats.year, 600)
  const membersCounter = useCountUp(config.stats.members, 600)
  const groupsCounter = useCountUp(config.stats.groups, 600)
  const eventsCounter = useCountUp(config.stats.events, 600)

  useEffect(() => {
    // Load recent work data
    fetch('/data/work.json')
      .then(res => res.json())
      .then(data => {
        // Filter by current group and get latest 6 items
        const filtered = data
          .filter(item => item.group === group)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6)
        setRecentWork(filtered)
      })
      .catch(err => console.error('Error loading work data:', err))
  }, [group])

  const handleViewProject = (item) => {
    setModalData(item)
  }

  const categoryNames = {
    worship: '예배',
    event: '행사',
    mission: '선교',
    service: '봉사'
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="line">
              <img
                src={config.hero.image}
                alt={`${config.logo} Logo`}
                style={{
                  width: '200px',
                  margin: '0 auto 20px',
                  borderRadius: group === 'witness' ? '100%' : '0',
                  filter: group === 'fishermen' ? 'brightness(0) invert(1)' : 'none'
                }}
              />
            </span>
            {config.hero.lines.map((line, index) => (
              <span key={index} className="line">{line}</span>
            ))}
          </h1>
          <p className="hero-subtitle">{config.hero.subtitle}</p>
        </div>
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="ceo-message">
        <div className="container">
          <div className="section-header">
            <h2>{config.ceo.header}</h2>
          </div>
          <div className="ceo-content">
            <div className="ceo-text">
              <p className="large-text">{config.ceo.quote}</p>
              {config.ceo.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <blockquote>{config.ceo.blockquote}</blockquote>
              <div className="ceo-signature">
                <p><strong>{config.ceo.signature}</strong></p>
              </div>
            </div>
            <div className="ceo-image">
              <div className="image-placeholder"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="company-info">
        <div className="container">
          <div className="section-header">
            <h2>{config.sections.companyInfo}</h2>
          </div>
          <div className="info-grid">
            <InfoCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              }
            >
              <h3>설립연도</h3>
              <p className="big-number" ref={yearCounter.elementRef}>
                {yearCounter.count}
              </p>
              <p>년</p>
            </InfoCard>

            <InfoCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              }
            >
              <h3>{config.sections.memberTitle}</h3>
              <p className="big-number" ref={membersCounter.elementRef}>
                {membersCounter.count}
              </p>
              <p>명</p>
            </InfoCard>

            <InfoCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="3"/>
                  <circle cx="6" cy="15" r="2"/>
                  <circle cx="18" cy="15" r="2"/>
                  <circle cx="12" cy="20" r="2"/>
                  <line x1="12" y1="11" x2="12" y2="18"/>
                  <line x1="12" y1="18" x2="6" y2="15"/>
                  <line x1="12" y1="18" x2="18" y2="15"/>
                </svg>
              }
            >
              <h3>마을</h3>
              <p className="big-number" ref={groupsCounter.elementRef}>
                {groupsCounter.count}
              </p>
              <p>개</p>
            </InfoCard>

            <InfoCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              }
            >
              <h3>연간 행사</h3>
              <p className="big-number" ref={eventsCounter.elementRef}>
                {eventsCounter.count}
              </p>
              <p>회 이상</p>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Business Areas Section */}
      <section className="business-areas">
        <div className="container">
          <div className="section-header">
            <h2>{config.sections.businessAreas}</h2>
            <p>다양한 사역을 통해 함께 성장합니다</p>
          </div>
          <div className="business-grid">
            <BusinessCard number="01" title="주일 예배" description="매주 주일 하나님께 드리는 예배를 통해 영적으로 충만함을 경험합니다." />
            <BusinessCard number="02" title="소그룹 모임" description="소그룹 단위로 모여 말씀을 나누고 서로의 삶을 나누며 교제합니다." />
            <BusinessCard number="03" title="찬양 사역" description="찬양팀을 통해 하나님을 찬양하고 예배를 섬깁니다." />
            <BusinessCard number="04" title="전도 및 선교" description="복음을 전하고 지역사회와 해외 선교지를 섬깁니다." />
            <BusinessCard number="05" title="수련회 & 캠프" description="정기적인 수련회와 캠프를 통해 신앙을 재충전하고 교제합니다." />
            <BusinessCard number="06" title="봉사 활동" description="지역사회를 섬기는 다양한 봉사활동에 참여합니다." />
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="featured-work">
        <div className="container">
          <div className="section-header">
            <h2>최근 활동</h2>
            <Link to={`/work/?group=${group}`} className="view-all">View All →</Link>
          </div>
          <div className="work-grid">
            {recentWork.map((item) => (
              <div
                key={item.id}
                className="work-item"
                onClick={() => handleViewProject(item)}
              >
                <div className="work-image">
                  {item.image && (
                    <img src={`/${item.image}`} alt={item.title} />
                  )}
                </div>
                <div className="work-info">
                  <span className="work-category">{categoryNames[item.category]}</span>
                  <h3>{item.title}</h3>
                  <p>{item.date || new Date(item.createdAt).toLocaleDateString('ko-KR')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-content">
            <h2>함께하고 싶으신가요?</h2>
            <p>{config.contact.description}</p>
            <a href="mailto:fishermen@naesoodong.com" className="btn-primary">문의하기</a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalData && (
        <Modal
          isOpen={!!modalData}
          onClose={() => setModalData(null)}
          title={modalData.title}
          category={categoryNames[modalData.category]}
          date={modalData.date || new Date(modalData.createdAt).toLocaleDateString('ko-KR')}
          description={modalData.description}
        />
      )}
    </>
  )
}

export default Home
