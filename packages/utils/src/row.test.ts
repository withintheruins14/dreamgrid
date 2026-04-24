import { describe, it, expect } from 'vitest'
import { row } from './row.js'

describe('row', () => {
  it('scales each item by the factor-to-fit-min-height × scaleDueToHeight', () => {
    const contents = [
      { width: 1000, height: 500 }, // factor to 200: 0.4 → scale=0.4*1=0.4 → rendered 400x200
      { width: 600, height: 300 },  // factor to 200: 0.667 → scale=0.667 → rendered 400x200
    ]
    const result = row(contents, 1, 1200, 200)
    expect(result.rowHeight).toBe(200)
    expect(result.contents).toHaveLength(2)
    expect(result.contents[0]!.scale).toBeCloseTo(0.4)
    expect(result.contents[0]!.dimension).toBe(contents[0])
  })

  it('computes horizontal whitespace as width − Σ(scaled widths)', () => {
    const result = row([{ width: 1000, height: 500 }], 1, 1200, 200)
    // scaled width = 1000 * 0.4 = 400. whitespace = 1200 - 400 = 800
    expect(result.horizontalWhitespace).toBe(800)
  })

  it('returns 0 horizontal whitespace when items perfectly fill the row', () => {
    const result = row([{ width: 1000, height: 500 }], 1, 400, 200)
    // scaled width = 1000 * 0.4 = 400, row width = 400 → no whitespace
    expect(result.horizontalWhitespace).toBe(0)
  })

  it('scales rowHeight by scaleDueToHeight', () => {
    const result = row([{ width: 1000, height: 500 }], 1.5, 1200, 200)
    expect(result.rowHeight).toBe(300)
  })

  it('handles an empty content list', () => {
    const result = row([], 1, 500, 200)
    expect(result.contents).toEqual([])
    expect(result.rowHeight).toBe(200)
    expect(result.horizontalWhitespace).toBe(500)
  })
})
