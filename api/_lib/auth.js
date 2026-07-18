import crypto from 'crypto'

const SECRET = process.env.ADMIN_SECRET || 'fisherman-default-secret-change-me'
const COOKIE_NAME = 'admin_token'
const MAX_AGE = 60 * 60 * 8 // 8시간(초)

function sign(payload) {
  return crypto.createHmac('sha256', SECRET).update(payload).digest('base64url')
}

export function createToken(username) {
  const payload = Buffer.from(
    JSON.stringify({ u: username, exp: Date.now() + MAX_AGE * 1000 })
  ).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string') return null
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return null

  const expected = sign(payload)
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (!data.exp || data.exp < Date.now()) return null
    return data
  } catch {
    return null
  }
}

function parseCookies(req) {
  const header = req.headers.cookie || ''
  const out = {}
  header.split(';').forEach((part) => {
    const idx = part.indexOf('=')
    if (idx > -1) {
      const k = part.slice(0, idx).trim()
      out[k] = decodeURIComponent(part.slice(idx + 1).trim())
    }
  })
  return out
}

export function getAuth(req) {
  return verifyToken(parseCookies(req)[COOKIE_NAME])
}

export function setAuthCookie(res, token, secure = true) {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax;${secure ? ' Secure;' : ''} Max-Age=${MAX_AGE}`
  )
}

export function clearAuthCookie(res, secure = true) {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax;${secure ? ' Secure;' : ''} Max-Age=0`
  )
}

export { COOKIE_NAME }
