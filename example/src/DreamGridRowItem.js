import React, { memo } from 'react';
import { areEqual } from 'react-window';

export default memo(({ data, content, index, image }) => {
  return (
    <img
      key={index}
      src={image.url}
      style={{
        width: content.dimension.x * content.scale,
        height: content.dimension.y * content.scale,
      }}
    />
  );
}, areEqual);
