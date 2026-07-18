import { getAuth } from './_lib/auth.js'

export default function handler(req, res) {
  return res.status(200).json({ isAuthenticated: !!getAuth(req) })
}
