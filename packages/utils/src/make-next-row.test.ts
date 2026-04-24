import { describe, it, expect } from 'vitest'
import { makeNextRow } from './make-next-row.js'

describe('makeNextRow', () => {
  it('fills a row until the next item would not fit at the minimum height', () => {
    // Each item at min height 200 would occupy 400px wide. Width=900 fits 2.
    const dimensions = [
      { width: 1000, height: 500 },
      { width: 1000, height: 500 },
      { width: 1000, height: 500 },
    ]
    const { next, remaining } = makeNextRow(dimensions, 900, 200, 400)
    expect(next.contents).toHaveLength(2)
    expect(remaining).toHaveLength(1)
  })

  it('mutates the input array to represent the remaining items', () => {
    const dimensions = [
      { width: 1000, height: 500 },
      { width: 1000, height: 500 },
    ]
    const { remaining } = makeNextRow(dimensions, 500, 200, 400)
    expect(remaining).toBe(dimensions)
  })

  it('clamps the row scale to maximumRowHeight / minimumRowHeight when width is large', () => {
    // Single item at min 200 = 400 wide. Container=5000px.
    // Unclamped scale=5000/400=12.5; clamped to 400/200=2.
    const { next } = makeNextRow([{ width: 1000, height: 500 }], 5000, 200, 400)
    expect(next.rowHeight).toBe(400)
  })

  it('uses width / totalWidthAtMinimumHeight when below the maximum', () => {
    // Single item at min 200 = 400 wide. Container=600px.
    // Unclamped scale=600/400=1.5; maxClamp=400/200=2 → 1.5 wins.
    const { next } = makeNextRow([{ width: 1000, height: 500 }], 600, 200, 400)
    expect(next.rowHeight).toBe(300)
  })

  it('always places at least one item even if it cannot fit at the minimum width', () => {
    // Container=100, but the item at min 200 would be 400 wide. Still force it in.
    const dimensions = [{ width: 1000, height: 500 }]
    const { next, remaining } = makeNextRow(dimensions, 100, 200, 400)
    expect(next.contents).toHaveLength(1)
    expect(remaining).toHaveLength(0)
  })

  it('returns an empty row for an empty input', () => {
    const { next, remaining } = makeNextRow([], 800, 200, 400)
    expect(next.contents).toEqual([])
    expect(remaining).toEqual([])
    // zero-item branch: scale falls back to max/min
    expect(next.rowHeight).toBe(400)
  })
})
