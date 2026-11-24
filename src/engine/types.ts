export type NodeType = 'scene' | 'choice' | 'consequence' | 'end'

export type ScoreKey = 'privasi' | 'reputasi' | 'keamanan'
export type Scores = Partial<Record<ScoreKey, number>>

/** Fixed display order + labels for the three tracked scores. */
export const SCORE_ORDER: ScoreKey[] = ['privasi', 'reputasi', 'keamanan']
export const SCORE_LABEL: Record<ScoreKey, string> = {
  privasi: 'Privasi',
  reputasi: 'Reputasi',
  keamanan: 'Keamanan',
}

export interface SceneNode {
  type: 'scene'
  id: string
  image: string
  alt: string
  next: string
  controlsY: number
}

export interface ChoiceOption {
  id: string
  text: string
  next: string
  scores: Scores
}

export interface ChoiceNode {
  type: 'choice'
  id: string
  image: string
  narration: string
  options: ChoiceOption[]
}

export interface ConsequenceNode {
  type: 'consequence'
  id: string
  optionId: string
  headline: string
  body: string
  image: string
  next: string
}

export interface EndNode {
  type: 'end'
  id: string
}

export type StoryNode = SceneNode | ChoiceNode | ConsequenceNode | EndNode

export interface Story {
  id: string
  title: string
  /** Optional prefix shown before the title (e.g. "Skenario 1"). */
  subtitle?: string
  totalSteps: number
  startId: string
  nodes: Record<string, StoryNode>
}

export interface StoryState {
  story: Story
  currentId: string
  /** History stack of visited node ids; the last entry is the current node. */
  history: string[]
  /** The confirmed option from the most recent choice (source of score deltas). */
  chosenOption: ChoiceOption | null
}

export interface ChoicePayload {
  nodeId: string
  firstChoice: string
  finalChoice: string
}

/** A saved position used to resume a story (node + history stack). */
export interface ResumePosition {
  currentId: string
  history: string[]
}
