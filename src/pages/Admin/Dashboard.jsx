import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check authentication
    fetch('/api/check-auth.php')
      .then(res => res.json())
      .then(data => {
        if (!data.isAuthenticated) {
          navigate('/admin')
        } else {
          setIsAuthenticated(true)
        }
      })
      .catch(err => {
        console.error('Auth check error:', err)
        navigate('/admin')
      })
      .finally(() => setLoading(false))
  }, [navigate])

  const handleLogout = async () => {
    try {
      await fetch('/api/logout.php', {
        method: 'POST'
      })
      navigate('/admin')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5'
      }}>
        <p>로딩 중...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '2px solid #eee'
        }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700' }}>관리자 대시보드</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#ff5520'}
            onMouseOut={(e) => e.target.style.background = '#ff6b35'}
          >
            로그아웃
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            padding: '30px',
            background: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '15px', fontSize: '24px' }}>사역 관리</h2>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
              사역 활동 게시글을 추가, 수정, 삭제할 수 있습니다.
            </p>
            <button style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              관리하기
            </button>
          </div>

          <div style={{
            padding: '30px',
            background: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '15px', fontSize: '24px' }}>소식 관리</h2>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
              뉴스 및 공지사항을 추가, 수정, 삭제할 수 있습니다.
            </p>
            <button style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              관리하기
            </button>
          </div>

          <div style={{
            padding: '30px',
            background: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '15px', fontSize: '24px' }}>부원 관리</h2>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
              청년부원 정보를 추가, 수정, 삭제할 수 있습니다.
            </p>
            <button style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              관리하기
            </button>
          </div>
        </div>

        <div style={{
          padding: '20px',
          background: 'white',
          borderRadius: '10px',
          border: '1px solid #e0e0e0'
        }}>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
            💡 <strong>참고:</strong> 이 대시보드는 기본 버전입니다.
            각 관리 섹션을 클릭하면 상세 관리 페이지로 이동하도록 추가 개발이 필요합니다.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
