import type {
  ChoiceOption,
  ConsequenceNode,
  ResumePosition,
  Story,
  StoryNode,
  StoryState,
} from './types'

/**
 * Pure story engine — no React imports.
 * All state transitions are expressed as functions that take a `StoryState`
 * and return a new one.
 */

export function getNode(story: Story, id: string): StoryNode {
  const node = story.nodes[id]
  if (!node) throw new Error(`Node tidak ditemukan: ${id}`)
  return node
}

/**
 * The confirmed option that led to a consequence node (the inverse of
 * `applyChoice`), looked up by the consequence's `optionId`.
 */
function findChosenOption(story: Story, consequence: ConsequenceNode): ChoiceOption | null {
  for (const node of Object.values(story.nodes)) {
    if (node.type !== 'choice') continue
    const option = node.options.find((o) => o.id === consequence.optionId)
    if (option) return option
  }
  return null
}

export function createInitialState(story: Story, initial?: ResumePosition): StoryState {
  if (initial && story.nodes[initial.currentId]) {
    const current = story.nodes[initial.currentId]
    // Resuming on a consequence node needs the confirmed option restored,
    // otherwise the screen cannot render (it shows the chosen letter).
    const chosenOption = current.type === 'consequence' ? findChosenOption(story, current) : null
    // Restore the saved history stack, dropping node ids that no longer
    // exist (e.g. if the story file changed since the position was saved).
    const history = initial.history.filter((id) => story.nodes[id])
    if (history[history.length - 1] !== initial.currentId) history.push(initial.currentId)
    return { story, currentId: initial.currentId, history, chosenOption }
  }
  return {
    story,
    currentId: story.startId,
    history: [story.startId],
    chosenOption: null,
  }
}

function transitionTo(state: StoryState, nextId: string): StoryState {
  const nextNode = getNode(state.story, nextId)
  // A confirmed choice is final: reset the history stack at the consequence
  // node so the choice cannot be undone.
  const history =
    nextNode.type === 'consequence' ? [nextId] : [...state.history, nextId]
  return { ...state, currentId: nextId, history }
}

/** Move forward from the current node (scenes and consequences only). */
export function advance(state: StoryState): StoryState {
  const node = getNode(state.story, state.currentId)
  if (node.type === 'scene' || node.type === 'consequence') {
    return transitionTo(state, node.next)
  }
  // choice and end nodes do not advance on their own
  return state
}

/** Step back through the history stack (disabled at the root of the stack). */
export function back(state: StoryState): StoryState {
  if (state.history.length <= 1) return state
  const history = state.history.slice(0, -1)
  return { ...state, currentId: history[history.length - 1], history }
}

/** Confirm a choice: record the option and move to its consequence. */
export function applyChoice(state: StoryState, optionId: string): StoryState {
  const node = getNode(state.story, state.currentId)
  if (node.type !== 'choice') return state
  const option = node.options.find((o) => o.id === optionId)
  if (!option) return state
  return transitionTo({ ...state, chosenOption: option }, option.next)
}

/** The next node id for a given node (used for image preloading). */
function nextIdForPreload(node: StoryNode): string | undefined {
  if (node.type === 'scene' || node.type === 'consequence') return node.next
  if (node.type === 'choice') return node.options[0]?.next
  return undefined
}

/**
 * The "Adegan n" number for a node: the frame number encoded in the node's
 * image file name (e.g. `s1-penipuan/007.jpg` -> 7). This is a property of
 * the node itself, so it works on resume (the history stack is reset at
 * consequence nodes and cannot be used to count scenes). The end node,
 * which has no image, counts as the final step.
 */
export function sceneNumber(story: Story, node: StoryNode): number {
  if (node.type === 'end') return story.totalSteps
  const m = /(\d+)\.[a-z0-9]+$/i.exec(node.image)
  if (m) return parseInt(m[1], 10)
  return Object.keys(story.nodes).indexOf(node.id) + 1
}

/** Image paths of the next `count` nodes along the current route. */
export function nextImagePaths(story: Story, fromId: string, count: number): string[] {
  const paths: string[] = []
  let currentId: string | undefined = fromId
  for (let i = 0; i < count && currentId; i++) {
    const node = story.nodes[currentId]
    if (!node) break
    currentId = nextIdForPreload(node)
    if (!currentId) break
    const next = story.nodes[currentId]
    if (next && 'image' in next) paths.push(next.image)
  }
  return paths
}
