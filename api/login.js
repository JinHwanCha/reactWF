import { createToken, setAuthCookie } from './_lib/auth.js'

const USER = process.env.ADMIN_USERNAME
const PASS = process.env.ADMIN_PASSWORD

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Invalid request method' })
  }

  if (!USER || !PASS) {
    return res.status(500).json({ success: false, message: '서버에 관리자 계정이 설정되지 않았습니다. (환경 변수 확인)' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }
  if (!body) body = {}

  const { username, password } = body

  if (username === USER && password === PASS) {
    const secure = String(req.headers['x-forwarded-proto'] || '').includes('https')
    setAuthCookie(res, createToken(username), secure)
    return res.status(200).json({ success: true, message: '로그인 성공!' })
  }

  return res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다.' })
}
