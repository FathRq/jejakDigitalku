import { useCallback, useEffect, useRef, useState } from 'react'
import { advance, applyChoice, back, createInitialState, getNode } from './story'
import type { ChoicePayload, ResumePosition, Story, StoryState } from './types'

const LETTERS = ['A', 'B', 'C']

/** The letter (A/B/C) of a confirmed option within its choice node. */
function letterForOption(story: Story, optionId: string): string | null {
  for (const node of Object.values(story.nodes)) {
    if (node.type !== 'choice') continue
    const idx = node.options.findIndex((o) => o.id === optionId)
    if (idx >= 0) return LETTERS[idx]
  }
  return null
}

interface UseStoryOptions {
  onChoiceConfirmed?: (payload: ChoicePayload) => void
  onFinished?: () => void
  /** Resume from a saved position (node + history stack) instead of the start. */
  initial?: ResumePosition
}

/**
 * React binding for the pure story engine. Tracks the current node, the
 * selection on a choice node (first vs. final), and fires the callbacks.
 */
export function useStory(story: Story, options: UseStoryOptions = {}) {
  const { onChoiceConfirmed, onFinished, initial } = options
  const initialRef = useRef(initial)
  initialRef.current = initial
  const [state, setState] = useState<StoryState>(() => createInitialState(story, initial))
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [firstChoiceId, setFirstChoiceId] = useState<string | null>(null)
  // On a resume that lands on a consequence node, restore the letter from
  // the confirmed option (the "Pilihanmu: X" chip).
  const [chosenLetter, setChosenLetter] = useState<string | null>(() => {
    const s = createInitialState(story, initial)
    return s.chosenOption ? letterForOption(story, s.chosenOption.id) : null
  })

  // Reset when a different story is loaded (skips the first render, where
  // the initial state already applied the resume position).
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const newState = createInitialState(story, initialRef.current)
    setState(newState)
    setChosenLetter(newState.chosenOption ? letterForOption(story, newState.chosenOption.id) : null)
    setSelectedOptionId(null)
    setFirstChoiceId(null)
  }, [story])

  // Clear any in-progress selection whenever we land on a new node.
  useEffect(() => {
    setSelectedOptionId(null)
    setFirstChoiceId(null)
  }, [state.currentId])

  const node = getNode(story, state.currentId)

  // Fire onFinished exactly when an end node is reached.
  useEffect(() => {
    if (node.type === 'end') onFinished?.()
  }, [node, onFinished])

  const doAdvance = useCallback(() => {
    setState((s) => advance(s))
  }, [])

  const doBack = useCallback(() => {
    setState((s) => back(s))
  }, [])

  const selectOption = useCallback((optionId: string) => {
    setSelectedOptionId(optionId)
    setFirstChoiceId((prev) => prev ?? optionId)
  }, [])

  const confirmChoice = useCallback(() => {
    if (!selectedOptionId) return
    const choiceNode = getNode(story, state.currentId)
    if (choiceNode.type !== 'choice') return
    const toLetter = (id: string) => {
      const idx = choiceNode.options.findIndex((o) => o.id === id)
      return idx >= 0 ? LETTERS[idx] : id
    }
    onChoiceConfirmed?.({
      nodeId: state.currentId,
      firstChoice: toLetter(firstChoiceId ?? selectedOptionId),
      finalChoice: toLetter(selectedOptionId),
    })
    setChosenLetter(toLetter(selectedOptionId))
    setState((s) => applyChoice(s, selectedOptionId))
    setSelectedOptionId(null)
  }, [selectedOptionId, firstChoiceId, state.currentId, story, onChoiceConfirmed])

  return {
    state,
    node,
    selectedOptionId,
    chosenLetter,
    selectOption,
    confirmChoice,
    advance: doAdvance,
    back: doBack,
  }
}
