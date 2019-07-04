export const staticGrid = `
  import DreamGrid from 'DreamDrid';

  const size = {
    height: 300,
    width: 600,
  };

  const App = () => {
      return (
        <DreamGrid
          size={size}
          images={images}
          minimumRowHeight={180}
          maximumRowHeight={350}
          renderItem={(data, content, index, image) => {
            return (
              <img
                  alt=""
                  src={image.url}
                  style={{
                      padding: 'unset',
                      width: content.dimension.x * content.scale,
                      height: content.dimension.y * content.scale,
                      // TODO spead height and width behind the scenes
                  }}
              />
            );
          }}
        />
      );
    );
  }

`;

export const responsiveGrid = `
  import DreamGrid from 'DreamDrid';
  import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';

  const renderItem = (data, content, index, image) => { // has these arguments
    return (
      <img
          alt=""
          src={image.url}
          style={{
              width: content.dimension.x * content.scale,
              height: content.dimension.y * content.scale,
          }}
      />
    );
  };

  const App = () => {
    return (
      <ReactVirtualizedAutoSizer>
        {
          (sizes) => {
            return (
              <DreamGrid
                size={sizes}
                images={images}
                minimumRowHeight={180}
                maximumRowHeight={350}
                renderItem={(data, content, index, image) => {
                  return (
                    <img
                        alt=""
                        src={image.url}
                        style={{
                            padding: 'unset',
                            width: content.dimension.x * content.scale,
                            height: content.dimension.y * content.scale,
                            // TODO spead height and width behind the scenes
                        }}
                    />
                  );
                }}
              />
            );
          }
        }
      </ReactVirtualizedAutoSizer>
    );
  }
`;
