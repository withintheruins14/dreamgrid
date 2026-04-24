import { useRef, useState, useEffect, useMemo } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { grid } from 'dreamgrid'

const images = [
  { width: 1024, height: 679,  url: 'https://live.staticflickr.com/7837/46852208034_1f768a633c_b_d.jpg' },
  { width: 679,  height: 1024, url: 'https://live.staticflickr.com/7856/46660570565_dd7cb62cd0_b_d.jpg' },
  { width: 679,  height: 1024, url: 'https://live.staticflickr.com/7820/40609973763_12f1b6b419_b_d.jpg' },
  { width: 1024, height: 679,  url: 'https://live.staticflickr.com/7835/32633607057_5bc8364604_b_d.jpg' },
  { width: 1024, height: 679,  url: 'https://live.staticflickr.com/7846/47576131171_19e5a0bdbc_b_d.jpg' },
  { width: 679,  height: 1024, url: 'https://live.staticflickr.com/7908/32633606977_16e48d70df_b_d.jpg' },
  { width: 1024, height: 679,  url: 'https://live.staticflickr.com/7827/40609972083_827edcf11d_b_d.jpg' },
  { width: 1024, height: 679,  url: 'https://live.staticflickr.com/7819/32633607187_23a906a20d_b_d.jpg' },
  { width: 1024, height: 679,  url: 'https://live.staticflickr.com/7866/33699205638_4fd36c940c_b_d.jpg' },
  { width: 679,  height: 1024, url: 'https://live.staticflickr.com/7903/32633606767_1cda0b9f60_b_d.jpg' },
  { width: 1024, height: 679,  url: 'https://live.staticflickr.com/7922/40609973373_e585031e3e_b_d.jpg' },
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
              return (
                <img
                  key={itemIndex}
                  src={img?.url}
                  alt=""
                  loading="lazy"
                  style={{
                    width: item.dimension.width * item.scale,
                    height: item.dimension.height * item.scale,
                    borderRadius: 4,
                    flexShrink: 0,
                    display: 'block',
                  }}
                />
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
