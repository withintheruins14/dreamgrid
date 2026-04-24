import { useRef, useState, useEffect, useMemo } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { grid } from 'dreamgrid'

const images = [
  { width: 4000, height: 3000, color: '#e74c3c' },
  { width: 3000, height: 4000, color: '#3498db' },
  { width: 5000, height: 2500, color: '#2ecc71' },
  { width: 3200, height: 3200, color: '#f39c12' },
  { width: 4800, height: 2400, color: '#9b59b6' },
  { width: 2800, height: 4200, color: '#1abc9c' },
  { width: 5200, height: 2600, color: '#e67e22' },
  { width: 3600, height: 2700, color: '#2980b9' },
  { width: 4400, height: 3300, color: '#c0392b' },
  { width: 3000, height: 5000, color: '#27ae60' },
  { width: 4200, height: 2100, color: '#8e44ad' },
  { width: 3800, height: 2850, color: '#d35400' },
  { width: 2600, height: 3900, color: '#16a085' },
  { width: 5000, height: 3000, color: '#c0392b' },
  { width: 3400, height: 4500, color: '#2c3e50' },
]

export function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number | undefined>()

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const rows = useMemo(() => grid(images, 200, 400, width), [width])

  return (
    <div style={{ padding: 24 }}>
      <Analytics />
      <h1 style={{ marginBottom: 8 }}>dreamgrid</h1>
      <p style={{ marginBottom: 24, color: '#888' }}>
        Responsive image grid that respects aspect ratios
      </p>
      <div ref={containerRef}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', marginBottom: 4, gap: 4 }}>
            {row.contents.map((item, itemIndex) => {
              const img = images[getImageIndex(rows, rowIndex, itemIndex)]
              const scaledWidth = item.dimension.width * item.scale
              const scaledHeight = item.dimension.height * item.scale
              return (
                <div
                  key={itemIndex}
                  style={{
                    width: scaledWidth,
                    height: scaledHeight,
                    backgroundColor: img?.color ?? '#333',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.7)',
                    flexShrink: 0,
                  }}
                >
                  {Math.round(item.dimension.width)}x{Math.round(item.dimension.height)}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function getImageIndex(rows: { contents: unknown[] }[], rowIndex: number, itemIndex: number): number {
  let index = 0
  for (let r = 0; r < rowIndex; r++) {
    index += rows[r].contents.length
  }
  return index + itemIndex
}
