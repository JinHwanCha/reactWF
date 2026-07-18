import { handleResource } from './_lib/resource.js'

export default function handler(req, res) {
  return handleResource('people', req, res)
}
