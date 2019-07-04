import React, { memo } from 'react';
import { areEqual } from 'react-window';

export default memo(({ data, index, style }) => {
  const { rows, images, renderItem } = data;
  return (
    <div
      key={index + rows[index].contents.length}
      style={{
        ...style,
        height: rows[index].rowHeight,
      }}
    >
      {
        rows[index].contents.map((content, i) => {
          const image = images.byId[content.dimension.id];
          return renderItem(data, content, index + i, image);
        })
      }
    </div>
  );
}, areEqual);
