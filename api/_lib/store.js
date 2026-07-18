import { kv } from '@vercel/kv'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

// KV 저장 키
const KEYS = {
  work: 'data:work',
  news: 'data:news',
  people: 'data:people'
}

// 시드(더미) 데이터 - public/data/*.json 을 번들에 포함
const SEEDS = {
  work: require('../../public/data/work.json'),
  news: require('../../public/data/news.json'),
  people: require('../../public/data/people.json')
}

// KV 스토어 연결 여부 (환경 변수로 판단)
function kvAvailable() {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

export async function getItems(resource) {
  const seed = SEEDS[resource] || []

  // KV 미연결: 시드 데이터로 폴백(읽기 전용)
  if (!kvAvailable()) return seed

  try {
    let items = await kv.get(KEYS[resource])
    // 최초 조회 시 KV가 비어 있으면 시드 데이터로 채움
    if (items == null) {
      items = seed
      await kv.set(KEYS[resource], items)
    }
    return Array.isArray(items) ? items : []
  } catch {
    // KV 오류 시에도 화면이 비지 않도록 시드로 폴백
    return seed
  }
}

export async function setItems(resource, items) {
  if (!kvAvailable()) {
    const err = new Error('KV 스토어가 설정되지 않았습니다. Vercel에서 KV를 연결하세요.')
    err.code = 'KV_UNAVAILABLE'
    throw err
  }
  await kv.set(KEYS[resource], items)
}

// 모든 리소스를 시드 데이터로 강제 복원
export async function reseedAll() {
  if (!kvAvailable()) {
    const err = new Error('KV 스토어가 설정되지 않았습니다. Vercel에서 KV를 연결하세요.')
    err.code = 'KV_UNAVAILABLE'
    throw err
  }
  const result = {}
  for (const [resource, seed] of Object.entries(SEEDS)) {
    await kv.set(KEYS[resource], seed)
    result[resource] = seed.length
  }
  return result
}

export { KEYS }

