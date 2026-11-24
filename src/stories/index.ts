import type { Story, StoryNode } from '../engine/types'

/**
 * Story registry.
 *
 * Every `*.json` file dropped into this folder is picked up automatically and
 * registered under its file name (without extension) — e.g. `s1-penipuan.json`
 * becomes the story id `s1-penipuan`, reachable at `/cerita/s1-penipuan`.
 *
 * The normalizer is intentionally tolerant about the exact top-level shape so
 * the engine keeps working if the JSON uses `name` vs `title`, an array vs an
 * object for `nodes`, or omits `totalSteps` / `startId`.
 */

type RawNode = { type: string; id: string; [key: string]: unknown }
type RawNodes = Record<string, RawNode> | RawNode[]
type RawStory = {
  id?: string
  title?: string
  name?: string
  subtitle?: string
  totalSteps?: number
  startId?: string
  startNodeId?: string
  nodes?: RawNodes
}

function normalizeNodes(raw: RawNodes | undefined): Record<string, StoryNode> {
  if (!raw) return {}
  const entries: [string, RawNode][] = Array.isArray(raw)
    ? raw.map((n): [string, RawNode] => [n.id, n])
    : Object.entries(raw)
  const nodes: Record<string, StoryNode> = {}
  for (const [id, n] of entries) nodes[id] = n as unknown as StoryNode
  return nodes
}

function normalizeStory(id: string, raw: RawStory): Story {
  const nodes = normalizeNodes(raw.nodes)
  const nodeIds = Object.keys(nodes)
  return {
    id,
    title: raw.title ?? raw.name ?? id,
    subtitle: raw.subtitle,
    totalSteps: raw.totalSteps ?? nodeIds.length,
    startId: raw.startId ?? raw.startNodeId ?? nodeIds[0] ?? id,
    nodes,
  }
}

const modules = import.meta.glob<{ default: RawStory }>('./*.json', { eager: true })

export const STORIES: Record<string, Story> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const id = path.split('/').pop()!.replace(/\.json$/, '')
    return [id, normalizeStory(id, mod.default)]
  }),
)
