import { useState, useEffect } from 'react'
import { useGroup } from '../context/GroupContext'
import Modal from '../components/Modal'

function News() {
  const { group } = useGroup()
  const [newsData, setNewsData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [featuredNews, setFeaturedNews] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [modalData, setModalData] = useState(null)

  const categoryNames = {
    announcement: '공지',
    event: '행사',
    testimony: '간증',
    mission: '선교'
  }

  useEffect(() => {
    // Load news data
    fetch('/data/news.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => item.group === group)
        setNewsData(filtered)
        setFilteredData(filtered)
        // Set the first item as featured
        if (filtered.length > 0) {
          setFeaturedNews(filtered[0])
        }
      })
      .catch(err => console.error('Error loading news data:', err))
  }, [group])

  const handleFilter = (filter) => {
    setActiveFilter(filter)
    if (filter === 'all') {
      setFilteredData(newsData)
    } else {
      setFilteredData(newsData.filter(item => item.category === filter))
    }
  }

  const handleReadMore = (item) => {
    setModalData(item)
  }

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>News & Insights</h1>
          <p>하나님의 은혜와 청년부의 생생한 이야기를 나눕니다</p>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews && (
        <section className="featured-news">
          <div className="container">
            <div className="featured-article" data-group={featuredNews.group}>
              <div className="featured-image">
                {featuredNews.image && (
                  <img src={`/${featuredNews.image}`} alt={featuredNews.title} />
                )}
              </div>
              <div className="featured-content">
                <span className="news-category">최신 소식</span>
                <h2>{featuredNews.title}</h2>
                <p className="news-date">
                  {featuredNews.date || new Date(featuredNews.createdAt).toLocaleDateString('ko-KR')}
                </p>
                <p className="news-excerpt">{featuredNews.excerpt || featuredNews.content?.substring(0, 150)}</p>
                <a
                  href="#"
                  className="read-more"
                  onClick={(e) => {
                    e.preventDefault()
                    handleReadMore(featuredNews)
                  }}
                >
                  더 보기 →
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="news-grid-section">
        <div className="container">
          <div className="news-filter">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilter('all')}
            >
              전체
            </button>
            <button
              className={`filter-btn ${activeFilter === 'announcement' ? 'active' : ''}`}
              onClick={() => handleFilter('announcement')}
            >
              공지
            </button>
            <button
              className={`filter-btn ${activeFilter === 'event' ? 'active' : ''}`}
              onClick={() => handleFilter('event')}
            >
              행사
            </button>
            <button
              className={`filter-btn ${activeFilter === 'testimony' ? 'active' : ''}`}
              onClick={() => handleFilter('testimony')}
            >
              간증
            </button>
            <button
              className={`filter-btn ${activeFilter === 'mission' ? 'active' : ''}`}
              onClick={() => handleFilter('mission')}
            >
              선교
            </button>
          </div>

          <div className="news-grid">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="news-card"
                data-category={item.category}
                data-group={item.group}
              >
                <div className="news-image">
                  {item.image && (
                    <img src={`/${item.image}`} alt={item.title} />
                  )}
                </div>
                <div className="news-content">
                  <span className="news-tag">{categoryNames[item.category]}</span>
                  <h3>{item.title}</h3>
                  <p className="news-date">{item.date || new Date(item.createdAt).toLocaleDateString('ko-KR')}</p>
                  <p className="news-excerpt">{item.excerpt || item.content?.substring(0, 100)}...</p>
                  <div className="news-meta">
                    <a
                      href="#"
                      className="read-more"
                      onClick={(e) => {
                        e.preventDefault()
                        handleReadMore(item)
                      }}
                    >
                      더 보기 →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>뉴스레터 구독</h2>
            <p>최신 소식과 인사이트를 이메일로 받아보세요</p>
            <form
              className="newsletter-form"
              onSubmit={(e) => {
                e.preventDefault()
                alert('구독해 주셔서 감사합니다!')
                e.target.reset()
              }}
            >
              <input type="email" placeholder="이메일 주소를 입력하세요" required />
              <button type="submit">Subscribe</button>
            </form>
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
          description={modalData.content || modalData.excerpt}
        />
      )}
    </>
  )
}

export default News
