import { getAuth } from './_lib/auth.js'
import { reseedAll } from './_lib/store.js'

// 시드(더미) 데이터를 KV에 강제 복원
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Invalid request method' })
  }
  if (!getAuth(req)) {
    return res.status(401).json({ success: false, error: '인증이 필요합니다.' })
  }
  try {
    const counts = await reseedAll()
    return res.status(200).json({ success: true, counts, message: '시드 데이터가 복원되었습니다.' })
  } catch (err) {
    if (err.code === 'KV_UNAVAILABLE') {
      return res.status(503).json({ success: false, error: err.message })
    }
    return res.status(500).json({ success: false, error: '복원 중 오류가 발생했습니다.' })
  }
}
