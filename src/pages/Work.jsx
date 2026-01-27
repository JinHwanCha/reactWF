import { useState, useEffect } from 'react'
import { useGroup } from '../context/GroupContext'
import Modal from '../components/Modal'

function Work() {
  const { group } = useGroup()
  const [workData, setWorkData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [modalData, setModalData] = useState(null)

  const categoryNames = {
    worship: '예배',
    event: '행사',
    mission: '선교',
    service: '봉사'
  }

  useEffect(() => {
    // Load work data
    fetch('/data/work.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => item.group === group)
        setWorkData(filtered)
        setFilteredData(filtered)
      })
      .catch(err => console.error('Error loading work data:', err))
  }, [group])

  const handleFilter = (filter) => {
    setActiveFilter(filter)
    if (filter === 'all') {
      setFilteredData(workData)
    } else {
      setFilteredData(workData.filter(item => item.category === filter))
    }
  }

  const handleViewProject = (item) => {
    setModalData(item)
  }

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>사역 활동</h1>
          <p className="page-subtitle">함께 만들어가는 신앙 공동체의 발자취</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="work-filter">
        <div className="container">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilter('all')}
            >
              전체
            </button>
            <button
              className={`filter-btn ${activeFilter === 'worship' ? 'active' : ''}`}
              onClick={() => handleFilter('worship')}
            >
              예배
            </button>
            <button
              className={`filter-btn ${activeFilter === 'event' ? 'active' : ''}`}
              onClick={() => handleFilter('event')}
            >
              행사
            </button>
            <button
              className={`filter-btn ${activeFilter === 'mission' ? 'active' : ''}`}
              onClick={() => handleFilter('mission')}
            >
              선교
            </button>
            <button
              className={`filter-btn ${activeFilter === 'service' ? 'active' : ''}`}
              onClick={() => handleFilter('service')}
            >
              봉사
            </button>
          </div>
        </div>
      </section>

      {/* Work Gallery */}
      <section className="work-gallery">
        <div className="container">
          <div className="gallery-grid">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="gallery-item"
                data-category={item.category}
                data-group={item.group}
              >
                <div className="gallery-image">
                  {item.image && (
                    <img
                      src={`/${item.image}`}
                      alt={item.title}
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  )}
                </div>
                <div className="gallery-overlay">
                  <div className="gallery-content">
                    <span className="category">{categoryNames[item.category]}</span>
                    <h3>{item.title}</h3>
                    <p>{item.date || new Date(item.createdAt).toLocaleDateString('ko-KR')}</p>
                    <a
                      href="#"
                      className="view-project"
                      onClick={(e) => {
                        e.preventDefault()
                        handleViewProject(item)
                      }}
                    >
                      자세히 보기 →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="awards-section">
        <div className="container">
          <div className="section-header">
            <h2>Awards & Recognition</h2>
          </div>
          <div className="awards-grid">
            <div className="award-item">
              <h3>2025</h3>
              <p>Director Commissioning</p>
            </div>
            <div className="award-item">
              <h3>2025</h3>
              <p>Community Leaders</p>
            </div>
            <div className="award-item">
              <h3>2025</h3>
              <p>Leaders Installed</p>
            </div>
            <div className="award-item">
              <h3>2025</h3>
              <p>Outstanding Cell Member</p>
            </div>
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

export default Work
