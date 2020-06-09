export const mockData = `
  const images = [
    {
      height: 679,          // you can pass a ratio for height and width if you don't have them
      width: 1024,          // eg. { height: 2, width: 3 } or { height: 1, width: 1 }
      url: 'https://live.staticflickr.com/7837/46852208034_1f768a633c_b_d.jpg'
    },
    {
      height: 1024,
      width: 679,
      url: 'https://live.staticflickr.com/7856/46660570565_dd7cb62cd0_b_d.jpg'
    },
    {
      height: 1024,
      width: 679,
      url: 'https://live.staticflickr.com/7856/46660570565_dd7cb62cd0_b_d.jpg'
    }
  ];

  const renderItem = (style, image) => (<img src={image.url} style={style} />);

`;

export const staticGridHooks = `
  import { useGrid } from 'dreamgrid';

  const Grid = useGrid(
    images,
    size,
    minimumRowHeight,
    maximumRowHeight,
    renderItem
  );

  return <Grid />;

`;


export const staticGrid = `
  import DreamGrid from 'dreamgrid';

  return (
    <DreamGrid
      images={images}
      size={{ height: 300, width: 600 }}
      minimumRowHeight={180}
      maximumRowHeight={350}
      renderItem={renderItem}
    />
  );

`;

export const responsiveGrid = `
  import DreamGrid from 'dreamgrid';
  import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';

  return (
    <ReactVirtualizedAutoSizer>
      {(sizes) => (
        <DreamGrid
          size={sizes}
          images={images}
          minimumRowHeight={180}
          maximumRowHeight={350}
          renderItem={renderItem}
        />
      );
    </ReactVirtualizedAutoSizer>
  );

`;
