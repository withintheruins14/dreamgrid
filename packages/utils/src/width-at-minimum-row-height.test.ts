import { describe, it, expect } from 'vitest'
import { widthAtMinimumRowHeight } from './width-at-minimum-row-height.js'

describe('widthAtMinimumRowHeight', () => {
  it('returns the width an item would occupy if scaled to the minimum row height', () => {
    expect(widthAtMinimumRowHeight({ width: 1000, height: 500 }, 200)).toBe(400)
  })

  it('preserves a square aspect ratio', () => {
    expect(widthAtMinimumRowHeight({ width: 300, height: 300 }, 150)).toBe(150)
  })
})
