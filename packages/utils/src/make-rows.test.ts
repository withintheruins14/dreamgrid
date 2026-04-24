import { describe, it, expect } from 'vitest'
import { makeRows } from './make-rows.js'

describe('makeRows', () => {
  it('partitions items into rows that collectively contain every input item', () => {
    const dimensions = [
      { width: 1000, height: 500 },
      { width: 1000, height: 500 },
      { width: 1000, height: 500 },
      { width: 1000, height: 500 },
      { width: 1000, height: 500 },
    ]
    const rows = makeRows(dimensions, 900, 200, 400)
    const totalItems = rows.reduce((sum, r) => sum + r.contents.length, 0)
    expect(totalItems).toBe(5)
  })

  it('returns an empty list for an empty input', () => {
    expect(makeRows([], 900, 200, 400)).toEqual([])
  })

  it('returns a single row when all items fit', () => {
    const dimensions = [
      { width: 1000, height: 500 }, // 400 wide at min height
      { width: 1000, height: 500 },
    ]
    const rows = makeRows(dimensions, 2000, 200, 400)
    expect(rows).toHaveLength(1)
    expect(rows[0]!.contents).toHaveLength(2)
  })

  it('does not mutate the caller\'s input array', () => {
    const dimensions = [
      { width: 1000, height: 500 },
      { width: 1000, height: 500 },
    ]
    const copy = [...dimensions]
    makeRows(dimensions, 400, 200, 400)
    expect(dimensions).toEqual(copy)
  })
})
