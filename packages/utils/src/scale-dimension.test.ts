import { describe, it, expect } from 'vitest'
import { scaleDimension } from './scale-dimension.js'

describe('scaleDimension', () => {
  it('wraps a dimension with its scale factor', () => {
    const dimension = { width: 100, height: 50 }
    expect(scaleDimension(dimension, 0.5)).toEqual({ dimension, scale: 0.5 })
  })

  it('preserves the original dimension reference', () => {
    const dimension = { width: 10, height: 10 }
    const result = scaleDimension(dimension, 2)
    expect(result.dimension).toBe(dimension)
  })
})
