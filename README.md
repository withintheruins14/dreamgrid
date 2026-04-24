# dreamgrid

> responsive image grid layout that respects aspect ratios https://dreamgrid-rose.vercel.app

[![NPM](https://img.shields.io/npm/v/dreamgrid.svg)](https://www.npmjs.com/package/dreamgrid) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
# pnpm
pnpm add dreamgrid

# yarn
yarn add dreamgrid

# npm
npm install --save dreamgrid
```

|   | masonry | dreamgrid |
|---|---|---|
| preserves aspect ratios |   | ✅ |
| allows variable item widths |   | ✅ |
| deterministic |   | ✅ |
| framework-agnostic |   | ✅ |

## Usage

`getGrid` is a pure function. Give it items with aspect ratios, a row-height range, and the container width — it returns the rows, already scaled. You render them however you want.

```ts
import { getGrid } from 'dreamgrid'

const items = [
  // real pixel dimensions or any ratio, e.g. { width: 3, height: 2 }
  { width: 1024, height: 679 },
  { width: 679,  height: 1024 },
  { width: 1024, height: 679 },
]

const rows = getGrid(items, 200, 400, 960)
```

### React

Measure the container with a `ResizeObserver` and memoize the result.

```tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { getGrid } from 'dreamgrid'

const images = [
  { width: 1024, height: 679,  url: 'https://live.staticflickr.com/7837/46852208034_1f768a633c_b_d.jpg' },
  { width: 679,  height: 1024, url: 'https://live.staticflickr.com/7856/46660570565_dd7cb62cd0_b_d.jpg' },
  { width: 1024, height: 679,  url: 'https://live.staticflickr.com/7837/46852208034_1f768a633c_b_d.jpg' },
]

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number | undefined>()

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const rows = useMemo(() => getGrid(images, 200, 400, width), [width])

  let i = 0
  return (
    <div ref={containerRef}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
          {row.contents.map((item, itemIndex) => {
            const image = images[i++]
            return (
              <img
                key={itemIndex}
                src={image.url}
                style={{
                  width: item.dimension.width * item.scale,
                  height: item.dimension.height * item.scale,
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
```

## API

```ts
getGrid(
  items: { width: number; height: number }[],
  minimumRowHeight: number,
  maximumRowHeight: number,
  width?: number,
): Row[]

type Row = {
  contents: { dimension: { width: number; height: number }; scale: number }[]
  rowHeight: number
  horizontalWhitespace: number
}
```

If `width` is undefined, `getGrid` returns `[]` — useful while you're still measuring the container. Multiply each item's `dimension.width` / `dimension.height` by `scale` to get the rendered size.

Live demo: [https://dreamgrid-rose.vercel.app](https://dreamgrid-rose.vercel.app)

## License

MIT © [withintheruins14](https://github.com/withintheruins14)
