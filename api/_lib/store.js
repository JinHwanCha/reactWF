import { kv } from '@vercel/kv'
import fs from 'fs'
import path from 'path'

// KV 저장 키
const KEYS = {
  work: 'data:work',
  news: 'data:news',
  people: 'data:people'
}

// KV가 비어 있을 때 최초 1회 사용할 시드 데이터 (public/data/*.json)
function seedFor(resource) {
  try {
    const file = path.join(process.cwd(), 'public', 'data', `${resource}.json`)
    return JSON.parse(fs.readFileSync(file, 'utf-8'))
  } catch {
    return []
  }
}

export async function getItems(resource) {
  const key = KEYS[resource]
  let items = await kv.get(key)
  if (items == null) {
    items = seedFor(resource)
    await kv.set(key, items)
  }
  return Array.isArray(items) ? items : []
}

export async function setItems(resource, items) {
  await kv.set(KEYS[resource], items)
}

export { KEYS }
