import { getItems, setItems } from './store.js'
import { getAuth } from './auth.js'

// 리소스별 편집 가능한 필드
const FIELDS = {
  work: ['title', 'description', 'category', 'date', 'image', 'group'],
  news: ['title', 'excerpt', 'description', 'category', 'date', 'image', 'group'],
  people: ['name', 'position', 'bio', 'image', 'group']
}

function readBody(req) {
  return new Promise((resolve) => {
    if (req.body != null) {
      if (typeof req.body === 'string') {
        try {
          resolve(JSON.parse(req.body))
        } catch {
          resolve({})
        }
      } else {
        resolve(req.body)
      }
      return
    }
    let raw = ''
    req.on('data', (c) => (raw += c))
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}'))
      } catch {
        resolve({})
      }
    })
  })
}

export async function handleResource(resource, req, res) {
  const fields = FIELDS[resource]

  // GET은 공개 (공개 페이지가 데이터를 읽음)
  if (req.method === 'GET') {
    const items = await getItems(resource)
    return res.status(200).json(items)
  }

  // 나머지(추가/수정/삭제)는 인증 필요
  if (!getAuth(req)) {
    return res.status(401).json({ success: false, error: '인증이 필요합니다.' })
  }

  try {
    const items = await getItems(resource)

    if (req.method === 'POST') {
      const body = await readBody(req)
      const newItem = {
        id: `${Date.now()}${Math.floor(Math.random() * 1000)}`,
        createdAt: new Date().toISOString()
      }
      for (const f of fields) newItem[f] = body[f] ?? ''
      items.unshift(newItem)
      await setItems(resource, items)
      return res.status(200).json({ success: true, data: newItem, message: '등록되었습니다.' })
    }

    if (req.method === 'PUT') {
      const body = await readBody(req)
      if (body.id == null) {
        return res.status(400).json({ success: false, error: 'ID가 필요합니다.' })
      }
      const idx = items.findIndex((i) => String(i.id) === String(body.id))
      if (idx === -1) {
        return res.status(404).json({ success: false, error: '항목을 찾을 수 없습니다.' })
      }
      for (const f of fields) {
        if (body[f] !== undefined) items[idx][f] = body[f]
      }
      items[idx].updatedAt = new Date().toISOString()
      await setItems(resource, items)
      return res.status(200).json({ success: true, data: items[idx], message: '수정되었습니다.' })
    }

    if (req.method === 'DELETE') {
      const id = req.query?.id
      if (id == null) {
        return res.status(400).json({ success: false, error: 'ID가 필요합니다.' })
      }
      const next = items.filter((i) => String(i.id) !== String(id))
      await setItems(resource, next)
      return res.status(200).json({ success: true, message: '삭제되었습니다.' })
    }
  } catch (err) {
    if (err.code === 'KV_UNAVAILABLE') {
      return res.status(503).json({ success: false, error: err.message })
    }
    return res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' })
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE')
  return res.status(405).json({ success: false, error: 'Invalid request method' })
}
