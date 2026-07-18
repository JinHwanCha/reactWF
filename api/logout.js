import { clearAuthCookie } from './_lib/auth.js'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Invalid request method' })
  }
  const secure = String(req.headers['x-forwarded-proto'] || '').includes('https')
  clearAuthCookie(res, secure)
  return res.status(200).json({ success: true, message: '로그아웃 되었습니다.' })
}
