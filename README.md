# DreamGrid

> The ideal image grid React component that respects image aspect ratios

[![NPM](https://img.shields.io/npm/v/dreamgrid.svg)](https://www.npmjs.com/package/dreamgrid) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
# Yarn
yarn add dreamgrid

# NPM
npm install --save dreamgrid
```

## Usage


```
import DreamGrid from 'dreamgrid'

const size = {
    height: 300,
    width: 600
};

// or pass dynamic dimensions for responsive behavior


const images = [
  {
    height: 679,
    width: 1024,
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

// you can pass a ratio for height and width if you don't have them

const renderItem = (content, image) => {
  return (
    <img
      alt=""
      src={image.url}
      style={{
          padding: 'unset',
          width: content.dimension.x * content.scale,
          height: content.dimension.y * content.scale,
      }}
    />
  );
}

<DreamGrid
    images={images}
    size={size}
    minimumRowHeight={180}
    maximumRowHeight={350}
    renderItem={renderItem}
/>

```

Sorry the API isn't great, still working on it when I can! Thanks

Learn more at [https://withintheruins14.github.io/dreamgrid](https://withintheruins14.github.io/dreamgrid):


## License

MIT © [withintheruins14](https://github.com/withintheruins14)
