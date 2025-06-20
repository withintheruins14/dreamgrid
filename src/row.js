import React, { memo } from 'react'
import { areEqual } from 'react-window'

const Row = memo(({ data, index, style }) => {
  const { rows, images, renderItem } = data
  const itemsBelowIndex = rows
    .filter((_, i) => i < index)
    .map(row => row.contents.length)
    .reduce((a, b) => a + b, 0)
  return (
    <div
      key={index + rows[index].contents.length}
      style={{
        ...style,
        height: rows[index].rowHeight,
      }}
    >
      {
        rows[index].contents.map(({ scale }, i) => {
          const { height, width, url } = images[itemsBelowIndex + i]
          return renderItem({
            height: height * scale,
            width: width * scale,
            url,
          })
        })
      }
    </div>
  )
}, areEqual);

export default Row
