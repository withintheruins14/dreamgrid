# DreamGrid

> The ideal image grid React component that respects image aspect ratios


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

const images = {
  allIds: [ 0, 1, 2 ],
  byId: {
    0: { id: 0, height: 679, width: 1024, url: 'https://live.staticflickr.com/7837/46852208034_1f768a633c_b_d.jpg' },
    1: { id: 1, height: 1024, width: 679, url: 'https://live.staticflickr.com/7856/46660570565_dd7cb62cd0_b_d.jpg' },
    2: { id: 1, height: 1024, width: 679, url: 'https://live.staticflickr.com/7856/46660570565_dd7cb62cd0_b_d.jpg' },
  }
};

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

Learn more at [https://withintheruins14.github.io/dreamgrid](https://withintheruins14.github.io/dreamgrid):


## License

MIT © [withintheruins14](https://github.com/withintheruins14)
