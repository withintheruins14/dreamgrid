import { describe, it, expect } from 'vitest'
import { factorToFitInMinimumRowHeight } from './factor-to-fit-in-minimum-row-height.js'

describe('factorToFitInMinimumRowHeight', () => {
  it('returns the scale needed to bring a dimension down to the minimum row height', () => {
    expect(factorToFitInMinimumRowHeight({ height: 1000 }, 200)).toBe(0.2)
  })

  it('returns a scale > 1 when the source is shorter than the minimum', () => {
    expect(factorToFitInMinimumRowHeight({ height: 100 }, 200)).toBe(2)
  })

  it('returns 1 when the source already matches the minimum', () => {
    expect(factorToFitInMinimumRowHeight({ height: 200 }, 200)).toBe(1)
  })
})
