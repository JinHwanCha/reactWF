import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// ── 리소스 정의 ─────────────────────────────────────────────
const GROUPS = [
  { value: 'fishermen', label: '청년부 (Fishermen)' },
  { value: 'witness', label: '대학부 (Witness)' }
]

const RESOURCES = {
  work: {
    label: '사역',
    endpoint: '/api/work',
    columns: [
      { key: 'title', label: '제목' },
      { key: 'category', label: '분류' },
      { key: 'date', label: '날짜' }
    ],
    fields: [
      { key: 'title', label: '제목', type: 'text', required: true },
      {
        key: 'category',
        label: '분류',
        type: 'select',
        options: [
          { value: 'worship', label: '예배' },
          { value: 'event', label: '행사' },
          { value: 'mission', label: '선교' },
          { value: 'service', label: '봉사' }
        ]
      },
      { key: 'date', label: '날짜 (예: 2026년 1월)', type: 'text' },
      { key: 'description', label: '내용', type: 'textarea' },
      { key: 'image', label: '이미지 경로 (예: images/foo.jpg)', type: 'text' },
      { key: 'group', label: '소속', type: 'group' }
    ]
  },
  news: {
    label: '소식',
    endpoint: '/api/news',
    columns: [
      { key: 'title', label: '제목' },
      { key: 'category', label: '분류' },
      { key: 'date', label: '날짜' }
    ],
    fields: [
      { key: 'title', label: '제목', type: 'text', required: true },
      {
        key: 'category',
        label: '분류',
        type: 'select',
        options: [
          { value: 'announcement', label: '공지' },
          { value: 'event', label: '행사' },
          { value: 'testimony', label: '간증' },
          { value: 'mission', label: '선교' }
        ]
      },
      { key: 'date', label: '날짜 (예: 2026.01.15)', type: 'text' },
      { key: 'excerpt', label: '요약', type: 'text' },
      { key: 'description', label: '내용', type: 'textarea' },
      { key: 'image', label: '이미지 경로 (예: images/foo.jpg)', type: 'text' },
      { key: 'group', label: '소속', type: 'group' }
    ]
  },
  people: {
    label: '부원',
    endpoint: '/api/people',
    columns: [
      { key: 'name', label: '이름' },
      { key: 'position', label: '직분' }
    ],
    fields: [
      { key: 'name', label: '이름', type: 'text', required: true },
      { key: 'position', label: '직분', type: 'text' },
      { key: 'bio', label: '소개', type: 'textarea' },
      { key: 'image', label: '이미지 경로 (예: images/foo.jpg)', type: 'text' },
      { key: 'group', label: '소속', type: 'group' }
    ]
  }
}

const GROUP_LABEL = { fishermen: '청년부', witness: '대학부' }

// ── 공통 스타일 ─────────────────────────────────────────────
const card = {
  background: 'white',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
}
const primaryBtn = {
  padding: '10px 18px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 600
}
const ghostBtn = {
  padding: '8px 14px',
  background: '#f1f1f4',
  color: '#333',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: 600
}
const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '2px solid #e0e0e0',
  borderRadius: '8px',
  fontSize: '14px',
  boxSizing: 'border-box',
  fontFamily: 'inherit'
}

function emptyForm(resourceKey) {
  const obj = {}
  RESOURCES[resourceKey].fields.forEach((f) => {
    obj[f.key] = f.type === 'group' ? 'fishermen' : f.type === 'select' ? f.options[0].value : ''
  })
  return obj
}

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('work')
  const [items, setItems] = useState([])
  const [listLoading, setListLoading] = useState(false)
  const [editing, setEditing] = useState(null) // null=닫힘, 'new'=추가, 객체=수정
  const [form, setForm] = useState(emptyForm('work'))
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null) // { type, text }
  const navigate = useNavigate()

  // 인증 확인
  useEffect(() => {
    fetch('/api/check-auth')
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAuthenticated) navigate('/admin')
        else setIsAuthenticated(true)
      })
      .catch(() => navigate('/admin'))
      .finally(() => setLoading(false))
  }, [navigate])

  const loadItems = useCallback((resourceKey) => {
    setListLoading(true)
    fetch(RESOURCES[resourceKey].endpoint)
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setListLoading(false))
  }, [])

  useEffect(() => {
    if (isAuthenticated) loadItems(tab)
  }, [isAuthenticated, tab, loadItems])

  const flash = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' })
    } catch {
      /* noop */
    }
    navigate('/admin')
  }

  const switchTab = (key) => {
    setTab(key)
    setEditing(null)
  }

  const openNew = () => {
    setForm(emptyForm(tab))
    setEditing('new')
  }

  const openEdit = (item) => {
    const base = emptyForm(tab)
    RESOURCES[tab].fields.forEach((f) => {
      if (item[f.key] !== undefined && item[f.key] !== null) base[f.key] = item[f.key]
    })
    setForm(base)
    setEditing(item)
  }

  const closeForm = () => setEditing(null)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const { endpoint } = RESOURCES[tab]
    const isNew = editing === 'new'
    try {
      const res = await fetch(endpoint, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isNew ? form : { ...form, id: editing.id })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        flash('success', data.message || '저장되었습니다.')
        setEditing(null)
        loadItems(tab)
      } else {
        flash('error', data.error || data.message || '저장에 실패했습니다.')
      }
    } catch {
      flash('error', '저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      const res = await fetch(`${RESOURCES[tab].endpoint}?id=${encodeURIComponent(item.id)}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (res.ok && data.success) {
        flash('success', '삭제되었습니다.')
        loadItems(tab)
      } else {
        flash('error', data.error || '삭제에 실패했습니다.')
      }
    } catch {
      flash('error', '삭제 중 오류가 발생했습니다.')
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <p>로딩 중...</p>
      </div>
    )
  }
  if (!isAuthenticated) return null

  const resource = RESOURCES[tab]

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700 }}>🐟 관리자 대시보드</h1>
          <button onClick={handleLogout} style={{ ...ghostBtn, background: '#ff6b35', color: 'white' }}>
            로그아웃
          </button>
        </div>

        {/* 알림 */}
        {message && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px',
              background: message.type === 'success' ? '#e6f7ec' : '#fdecec',
              color: message.type === 'success' ? '#1a7f43' : '#c0392b'
            }}
          >
            {message.text}
          </div>
        )}

        {/* 탭 */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {Object.entries(RESOURCES).map(([key, r]) => (
            <button
              key={key}
              onClick={() => switchTab(key)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                background: tab === key ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                color: tab === key ? 'white' : '#555',
                boxShadow: tab === key ? 'none' : '0 1px 4px rgba(0,0,0,0.08)'
              }}
            >
              {r.label} 관리
            </button>
          ))}
        </div>

        {/* 목록 */}
        <div style={{ ...card, padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{resource.label} 목록 ({items.length})</h2>
            <button onClick={openNew} style={primaryBtn}>+ 새 {resource.label} 추가</button>
          </div>

          {listLoading ? (
            <p style={{ color: '#888', padding: '20px 0' }}>불러오는 중...</p>
          ) : items.length === 0 ? (
            <p style={{ color: '#888', padding: '20px 0' }}>등록된 항목이 없습니다.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left', color: '#666' }}>
                    <th style={{ padding: '10px 8px' }}>소속</th>
                    {resource.columns.map((c) => (
                      <th key={c.key} style={{ padding: '10px 8px' }}>{c.label}</th>
                    ))}
                    <th style={{ padding: '10px 8px', textAlign: 'right' }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '10px 8px' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            background: item.group === 'witness' ? '#eef2ff' : '#fff2ec',
                            color: item.group === 'witness' ? '#4a5bd0' : '#e0662f'
                          }}
                        >
                          {GROUP_LABEL[item.group] || item.group || '-'}
                        </span>
                      </td>
                      {resource.columns.map((c) => (
                        <td key={c.key} style={{ padding: '10px 8px', maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {String(item[c.key] ?? '')}
                        </td>
                      ))}
                      <td style={{ padding: '10px 8px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button onClick={() => openEdit(item)} style={{ ...ghostBtn, marginRight: '6px' }}>수정</button>
                        <button onClick={() => handleDelete(item)} style={{ ...ghostBtn, background: '#fdecec', color: '#c0392b' }}>삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 추가/수정 모달 */}
      {editing && (
        <div
          onClick={closeForm}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ ...card, width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', padding: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
              {editing === 'new' ? `새 ${resource.label} 추가` : `${resource.label} 수정`}
            </h2>
            <form onSubmit={handleSave}>
              {resource.fields.map((field) => (
                <div key={field.key} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '13px', color: '#333' }}>
                    {field.label}{field.required && <span style={{ color: '#e74c3c' }}> *</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={form[field.key] ?? ''}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  ) : field.type === 'select' ? (
                    <select value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} style={inputStyle}>
                      {field.options.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  ) : field.type === 'group' ? (
                    <select value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} style={inputStyle}>
                      {GROUPS.map((g) => (
                        <option key={g.value} value={g.value}>{g.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={form[field.key] ?? ''}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      required={field.required}
                      style={inputStyle}
                    />
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                <button type="submit" disabled={saving} style={{ ...primaryBtn, flex: 1, opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}>
                  {saving ? '저장 중...' : '저장'}
                </button>
                <button type="button" onClick={closeForm} style={{ ...ghostBtn, flex: 1, padding: '10px 18px' }}>취소</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
