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
          const style = {
            padding: 'unset',
            width: content.dimension.x * content.scale,
            height: content.dimension.y * content.scale,
          };
          return renderItem(style, image);
        })
      }
    </div>
  );
}, areEqual);
