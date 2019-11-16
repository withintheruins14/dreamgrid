import React, { memo } from 'react'
import PropTypes from 'prop-types'
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
        height: rows[index].rowHeight
      }}
    >
      {
        rows[index].contents.map((content, i) => {
          const id = images.allIds[(itemsBelowIndex + i)]
          const image = images.byId[id]
          return renderItem(content, image)
        })
      }
    </div>
  )
}, areEqual)

Row.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  style: PropTypes.object
}

export default Row
