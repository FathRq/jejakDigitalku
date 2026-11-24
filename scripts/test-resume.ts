import {
  advance,
  applyChoice,
  back,
  createInitialState,
  nextImagePaths,
} from '../src/engine/story'
import type { Story } from '../src/engine/types'

// Synthetic story: s1 -> c1 (choice A/B/C) -> kA/kB/kC -> s2 -> end
const story: Story = {
  id: 't',
  title: 'T',
  totalSteps: 7,
  startId: 's1',
  nodes: {
    s1: { type: 'scene', id: 's1', image: '001.png', alt: '', next: 'c1', controlsY: 0 },
    c1: {
      type: 'choice',
      id: 'c1',
      image: '025.png',
      narration: '?',
      options: [
        { id: 'a', text: 'A', next: 'kA', scores: { privasi: -10 } },
        { id: 'b', text: 'B', next: 'kB', scores: { privasi: 5 } },
        { id: 'c', text: 'C', next: 'kC', scores: { privasi: 10 } },
      ],
    },
    kA: {
      type: 'consequence',
      id: 'kA',
      optionId: 'a',
      headline: 'h',
      body: 'b',
      image: '026.png',
      next: 's2',
    },
    kB: {
      type: 'consequence',
      id: 'kB',
      optionId: 'b',
      headline: 'h',
      body: 'b',
      image: '027.png',
      next: 's2',
    },
    kC: {
      type: 'consequence',
      id: 'kC',
      optionId: 'c',
      headline: 'h',
      body: 'b',
      image: '028.png',
      next: 's2',
    },
    s2: { type: 'scene', id: 's2', image: '002.png', alt: '', next: 'end', controlsY: 0 },
    end: { type: 'end', id: 'end' },
  },
}

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

// 1. Fresh start
{
  const s = createInitialState(story)
  check('fresh: currentId = startId', s.currentId === 's1')
  check('fresh: history = [startId]', s.history.length === 1 && s.history[0] === 's1')
  check('fresh: chosenOption null', s.chosenOption === null)
}

// 2. Walk to the choice, confirm option A, land on kA
{
  let s = createInitialState(story)
  s = advance(s) // s1 -> c1
  check('walk: at choice c1', s.currentId === 'c1')
  s = applyChoice(s, 'a')
  check('walk: at consequence kA', s.currentId === 'kA')
  check('walk: history reset to [kA]', s.history.length === 1 && s.history[0] === 'kA')
  check('walk: chosenOption = a', s.chosenOption?.id === 'a')
}

// 3. Resume on a consequence node: chosenOption must be restored
{
  const s = createInitialState(story, { currentId: 'kA', history: ['kA'] })
  check('resume@kA: currentId', s.currentId === 'kA')
  check('resume@kA: chosenOption restored to a', s.chosenOption?.id === 'a')
  check('resume@kA: option text matches', s.chosenOption?.text === 'A')
  check('resume@kA: back blocked (history len 1)', back(s).currentId === 'kA')
  const s2 = advance(s)
  check('resume@kA: advance -> s2', s2.currentId === 's2')
  check('resume@kA: history [kA, s2]', s2.history.join(',') === 'kA,s2')
  const s3 = back(s2)
  check('resume@kA: back from s2 -> kA keeps chosenOption', s3.currentId === 'kA' && s3.chosenOption?.id === 'a')
}

// 4. Resume on a scene with a full history prefix
{
  const s = createInitialState(story, { currentId: 's2', history: ['kC', 's2'] })
  check('resume@s2: currentId', s.currentId === 's2')
  check('resume@s2: history kept', s.history.join(',') === 'kC,s2')
  check('resume@s2: chosenOption null', s.chosenOption === null)
  check('resume@s2: back -> kC', back(s).currentId === 'kC')
}

// 5. Resume with a stale/unknown current id -> fall back to start
{
  const s = createInitialState(story, { currentId: 'nope', history: ['nope'] })
  check('resume@unknown: falls back to start', s.currentId === 's1' && s.history[0] === 's1')
}

// 6. Resume with a stale id inside the history -> filtered, current appended
{
  const s = createInitialState(story, { currentId: 's2', history: ['ghost', 's2'] })
  check('resume@stale-history: filtered to [s2]', s.history.join(',') === 's2')
  const s2 = createInitialState(story, { currentId: 's2', history: ['ghost'] })
  check('resume@stale-history: current appended', s2.history.join(',') === 's2')
}

// 7. Preload still works from a resumed position
{
  const paths = nextImagePaths(story, 's2', 2)
  check('preload from s2: [002? no -> end has no image]', paths.length === 0)
  const paths2 = nextImagePaths(story, 's1', 2)
  check('preload from s1: c1 image', paths2.includes('025.png'))
}

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed === 0 ? 0 : 1)
