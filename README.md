# dreamgrid

> responsive react image grid component that respects aspect ratios https://withintheruins14.github.io/dreamgrid

[![NPM](https://img.shields.io/npm/v/dreamgrid.svg)](https://www.npmjs.com/package/dreamgrid) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
# Yarn
yarn add dreamgrid

# NPM
npm install --save dreamgrid
```

|   | masonry | dreamgrid |
|---|---|---|
| preserves aspect ratios |   | ✅ |
| allows variable item widths |   | ✅ |
| deterministic |   | ✅ |
| virtualized |   | ✅ |
| memoized |   | ✅ |

## Usage

```
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
};

const renderItem = (style, image) => (<img src={image.url} style={style} />);

```

# Hooks (coming soon!)

```
import { useGrid } from 'dreamgrid';

const Grid = useGrid(
  images,
  size,
  minimumRowHeight,
  maximumRowHeight,
  renderItem
);

return (<Grid />);

```

# Component

```
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

```

Learn more at: [https://withintheruins14.github.io/dreamgrid](https://withintheruins14.github.io/dreamgrid)


## License

MIT © [withintheruins14](https://github.com/withintheruins14)
