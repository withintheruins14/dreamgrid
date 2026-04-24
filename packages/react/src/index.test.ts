import { describe, it, expect } from 'vitest'
import { getGrid } from './index.js'

describe('getGrid', () => {
  it('returns an empty array when width is undefined', () => {
    expect(getGrid([{ width: 100, height: 100 }], 200, 400)).toEqual([])
  })

  it('returns an empty array when width is 0', () => {
    expect(getGrid([{ width: 100, height: 100 }], 200, 400, 0)).toEqual([])
  })

  it('returns rows when width is provided', () => {
    const items = [
      { width: 1000, height: 500 },
      { width: 1000, height: 500 },
    ]
    const rows = getGrid(items, 200, 400, 900)
    expect(rows.length).toBeGreaterThan(0)
    expect(rows[0]!.contents.length).toBeGreaterThan(0)
  })

  it('accepts items with extra properties without stripping them from the scaled output dimension', () => {
    const item = { width: 1000, height: 500, url: 'http://example.com/x.jpg' }
    const rows = getGrid([item], 200, 400, 900)
    expect(rows[0]!.contents[0]!.dimension).toEqual(item)
  })
})
