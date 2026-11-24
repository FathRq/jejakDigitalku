// ============================================================================
// Jejak Digitalku — upload story images to Supabase Storage
//
// Creates the public `stories` bucket (if missing) and uploads every file under
// ./images/ to the matching path (e.g. images/s1-penipuan/001.jpg ->
// s1-penipuan/001.jpg in the bucket).
//
// Requires the SERVICE-ROLE key (the publishable/anon key cannot create
// buckets or upload files). Provide it via the SUPABASE_SERVICE_ROLE_KEY env
// var, or put it in .env, or in a local service-role.txt file.
//
//   node scripts/upload-images.mjs
//
// The service-role key is a secret: it is never committed (see .gitignore) and
// is never written into the client bundle.
// ============================================================================
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = resolve(__dirname, '..')

const SUPABASE_URL = 'https://bqlriyqyqxtjzpafdsjt.supabase.co'
const BUCKET = 'stories'

// --- Resolve the service-role key ------------------------------------------
function readEnvFile(path) {
  try {
    return readFileSync(path, 'utf8')
  } catch {
    return ''
  }
}

function resolveServiceKey() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) return process.env.SUPABASE_SERVICE_ROLE_KEY
  for (const f of [join(ROOT, '.env'), join(ROOT, 'service-role.txt')]) {
    const txt = readEnvFile(f)
    const m = txt.match(/^\s*SUPABASE_SERVICE_ROLE_KEY\s*=\s*(\S+)\s*$/m)
    if (m) return m[1]
    // service-role.txt may hold the bare key
    if (f.endsWith('.txt')) {
      const bare = txt.trim().match(/^(sb_[a-z]+_[A-Za-z0-9_-]+)$/m)
      if (bare) return bare[1]
    }
  }
  return null
}

const KEY = resolveServiceKey()
if (!KEY) {
  console.error(
    'Service-role key not found. Set SUPABASE_SERVICE_ROLE_KEY (env), ' +
      'add SUPABASE_SERVICE_ROLE_KEY=... to .env, or put the bare key in service-role.txt.',
  )
  process.exit(2)
}

// --- Collect local image files ----------------------------------------------
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

const imagesDir = join(ROOT, 'images')
let files
try {
  files = walk(imagesDir)
} catch {
  console.error(`No ./images directory at ${imagesDir}. Put the story frames there first.`)
  process.exit(2)
}
if (files.length === 0) {
  console.error(`./images is empty (${imagesDir}).`)
  process.exit(2)
}

// --- Supabase Storage calls (service-role) ----------------------------------
async function storage(path, method, body) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1${path}`, {
    method,
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
    },
    body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
  })
  const text = await res.text()
  let json = null
  try {
    json = JSON.parse(text)
  } catch {}
  return { status: res.status, json, text }
}

async function main() {
  // 1. Create the bucket (public) if it does not exist.
  const list = await storage('/bucket', 'GET')
  const exists = Array.isArray(list.json) && list.json.some((b) => b.name === BUCKET)
  if (!exists) {
    const created = await storage('/bucket', 'POST', {
      id: BUCKET,
      name: BUCKET,
      public: true,
    })
    if (created.status >= 300) {
      console.error(`Failed to create bucket ${BUCKET}: ${created.status} ${created.text}`)
      process.exit(2)
    }
    console.log(`Created public bucket "${BUCKET}"`)
  } else {
    console.log(`Bucket "${BUCKET}" already exists`)
  }

  // 2. Upload each file to its relative path.
  let ok = 0
  let failed = 0
  for (const file of files) {
    const rel = relative(imagesDir, file).split('\\').join('/')
    const buf = readFileSync(file)
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${rel}`, {
      method: 'POST',
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'image/jpeg',
      },
      body: buf,
    })
    if (res.status >= 200 && res.status < 300) {
      ok++
      console.log(`  ok  ${rel}`)
    } else {
      failed++
      const t = await res.text()
      console.error(` FAIL ${rel} -> ${res.status} ${t.slice(0, 160)}`)
    }
  }

  console.log(`\n${ok} uploaded, ${failed} failed (bucket: ${BUCKET})`)
  if (failed > 0) process.exit(1)
  console.log('Public URL base: ' + `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`)
}

main().catch((e) => {
  console.error('crash', e)
  process.exit(2)
})
