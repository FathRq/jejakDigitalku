import { readFileSync } from 'node:fs'
import {
  advance,
  applyChoice,
  back,
  createInitialState,
  nextImagePaths,
  sceneNumber,
} from '../src/engine/story'
import type { Story } from '../src/engine/types'

// ---------------------------------------------------------------------------
// Walks the REAL story file (src/stories/s1-penipuan.json) with the pure
// engine and verifies the route structure:
//   - start node, total steps, node count
//   - option A jumps from its consequence straight to s1-31
//   - options B/C go through s1-26
//   - the end node is reachable on every route
// ---------------------------------------------------------------------------

// Path to the JSON file: pass STORY_JSON=... when running the bundled CJS
// (the bundle lives outside the project), or fall back to the project path.
const jsonPath =
  process.env.STORY_JSON ??
  '/home/fatkhur/jejak-digitalku/src/stories/s1-penipuan.json'
const raw = JSON.parse(readFileSync(jsonPath, 'utf8'))

// Same normalization the registry applies (src/stories/index.ts).
function normalize(id: string, r: any): Story {
  const nodes: Record<string, any> = {}
  for (const n of r.nodes) nodes[n.id] = n
  return {
    id,
    title: r.title ?? r.name ?? id,
    subtitle: r.subtitle,
    totalSteps: r.totalSteps ?? Object.keys(nodes).length,
    startId: r.startId ?? r.startNodeId ?? Object.keys(nodes)[0] ?? id,
    nodes,
  }
}

const story = normalize('s1-penipuan', raw)

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) {
    passed++
    console.log(`  ok  ${name}`)
  } else {
    failed++
    console.log(` FAIL ${name}`)
  }
}

// 1. Top-level shape
check('startId = s1-01', story.startId === 's1-01')
check('totalSteps = 32', story.totalSteps === 32)
check('subtitle = "Skenario 1"', story.subtitle === 'Skenario 1')
check('35 nodes', Object.keys(story.nodes).length === 35)
check('end node exists (s1-end)', story.nodes['s1-end']?.type === 'end')

// 2. Walk to the choice node (24 scenes first)
let s = createInitialState(story)
for (let i = 0; i < 24; i++) s = advance(s)
check('after 24 advances: at s1-choice', s.currentId === 's1-choice')
check('choice node has 3 options', story.nodes['s1-choice'].type === 'choice' && story.nodes['s1-choice'].options.length === 3)

// 3. Option A: consequence jumps straight to s1-31 (acceptance item 5)
{
  const a = applyChoice(s, 'A')
  check('A: at s1-cons-A', a.currentId === 's1-cons-A')
  const a2 = advance(a)
  check('A: skips s1-26, lands on s1-31', a2.currentId === 's1-31')
  const a3 = advance(a2)
  check('A: then to s1-end', a3.currentId === 's1-end')
  check('A: adegan at s1-31 = 31', sceneNumber(story, story.nodes['s1-31']) === 31)
  check('A: adegan at end = 32 (= totalSteps)', sceneNumber(story, story.nodes['s1-end']) === 32)
}

// 4. Option B: goes through s1-26
{
  const b = applyChoice(s, 'B')
  check('B: at s1-cons-B', b.currentId === 's1-cons-B')
  const b2 = advance(b)
  check('B: goes to s1-26 (not skipped)', b2.currentId === 's1-26')
  let cur = b2
  for (let i = 0; i < 5; i++) cur = advance(cur) // s1-27..s1-31
  check('B: s1-31 after 5 more', cur.currentId === 's1-31')
  const end = advance(cur)
  check('B: reaches s1-end', end.currentId === 's1-end')
  check(
    'B: adegan numbering (choice=25, cons=25, s1-26=26, s1-31=31, end=32)',
    sceneNumber(story, story.nodes['s1-choice']) === 25 &&
      sceneNumber(story, story.nodes['s1-cons-B']) === 25 &&
      sceneNumber(story, story.nodes['s1-26']) === 26 &&
      sceneNumber(story, story.nodes['s1-31']) === 31 &&
      sceneNumber(story, story.nodes['s1-end']) === 32,
  )
}

// 5. Option C: same route as B
{
  const c = applyChoice(s, 'C')
  check('C: at s1-cons-C', c.currentId === 's1-cons-C')
  const c2 = advance(c)
  check('C: goes to s1-26', c2.currentId === 's1-26')
}

// 6. Back navigation: choice is final (history reset at the consequence)
{
  const a = applyChoice(s, 'A')
  check('A: history reset to [s1-cons-A]', a.history.length === 1 && a.history[0] === 's1-cons-A')
  check('A: back blocked at the consequence', back(a).currentId === 's1-cons-A')
  const a2 = advance(a)
  check('A: back from s1-31 -> s1-cons-A', back(a2).currentId === 's1-cons-A')
}

// 7. Image preloading from the start
{
  const paths = nextImagePaths(story, 's1-01', 2)
  check('preload from s1-01: [002.jpg, 003.jpg]', paths.join(',') === 's1-penipuan/002.jpg,s1-penipuan/003.jpg')
  const fromChoice = nextImagePaths(story, 's1-choice', 2)
  check('preload from s1-choice: [025.jpg (cons A), 025? no -> s1-31]', fromChoice.length === 2)
}

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed === 0 ? 0 : 1)
