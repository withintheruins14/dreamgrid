'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactWindow = require('react-window');
var PropTypes = _interopDefault(require('prop-types'));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Row = React.memo(function (_ref) {
  var data = _ref.data,
      index = _ref.index,
      style = _ref.style;
  var rows = data.rows,
      images = data.images,
      renderItem = data.renderItem;

  var itemsBelowIndex = rows.filter(function (_, i) {
    return i < index;
  }).map(function (row) {
    return row.contents.length;
  }).reduce(function (a, b) {
    return a + b;
  }, 0);
  return React__default.createElement(
    'div',
    {
      key: index + rows[index].contents.length,
      style: _extends({}, style, {
        height: rows[index].rowHeight
      })
    },
    rows[index].contents.map(function (_ref2, i) {
      var scale = _ref2.scale;
      var _images = images[itemsBelowIndex + i],
          height = _images.height,
          width = _images.width,
          url = _images.url;

      return renderItem({
        height: height * scale,
        width: width * scale,
        url: url
      });
    })
  );
}, reactWindow.areEqual);

var getItemSize = function getItemSize(rows, index) {
  return rows[index].rowHeight;
};

var scaleDimension = function scaleDimension(dimension, scale) {
  return { dimension: dimension, scale: scale };
};

var widthAtMinimumRowHeight = function widthAtMinimumRowHeight(dimension, minimumRowHeight) {
  return factorToFitInMinimumRowHeight(dimension, minimumRowHeight) * dimension.x;
};

var factorToFitInMinimumRowHeight = function factorToFitInMinimumRowHeight(dimension, minimumRowHeight) {
  return minimumRowHeight / dimension.y;
};

var makeDimensions = function makeDimensions(images) {
  return images.filter(function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return width && height;
  }).map(function (image) {
    return _extends({}, getImageDimensions(image));
  });
};

var makeRows = function makeRows(accumulatedRows, dimensions, width, minimumRowHeight, maximumRowHeight) {
  var _makeNextRow = makeNextRow(dimensions, width, minimumRowHeight, maximumRowHeight),
      next = _makeNextRow.next,
      remaining = _makeNextRow.remaining;

  accumulatedRows.push(next);
  if (remaining.length > 0) {
    accumulatedRows.concat(makeRows(accumulatedRows, dimensions, width, minimumRowHeight, maximumRowHeight));
  }
  return accumulatedRows;
};

var makeNextRow = function makeNextRow(remainingDimensions, width, minimumRowHeight, maximumRowHeight) {
  var remainingRowWidth = width;
  var accumulatedRowDimensions = [];
  while (remainingDimensions.length > 0 && remainingRowWidth > widthAtMinimumRowHeight(remainingDimensions[0], minimumRowHeight)) {
    remainingRowWidth -= widthAtMinimumRowHeight(remainingDimensions[0], minimumRowHeight);
    accumulatedRowDimensions.push(remainingDimensions.shift());
  }

  var widthsAtMinimumHeight = accumulatedRowDimensions.map(function (d) {
    return widthAtMinimumRowHeight(d, minimumRowHeight);
  });
  var totalWidthAtMinimumHeight = widthsAtMinimumHeight.reduce(function (a, b) {
    return a + b;
  }, 0);
  var widthScaleFactor = Math.min(width / totalWidthAtMinimumHeight, maximumRowHeight / minimumRowHeight);
  return {
    next: row(accumulatedRowDimensions, widthScaleFactor, width, minimumRowHeight),
    remaining: remainingDimensions
  };
};

var row = function row(unscaledContents, scaleDueToHeight, width, minimumRowHeight) {
  var scaledContents = unscaledContents.map(function (unscaledDimension) {
    var factor = factorToFitInMinimumRowHeight(unscaledDimension, minimumRowHeight) * scaleDueToHeight;
    return scaleDimension(unscaledDimension, factor);
  });

  var remainingWhitespace = width - scaledContents.map(function (scaledContent) {
    return scaledContent.dimension.x * scaledContent.scale;
  }).reduce(function (cur, prev) {
    return cur + prev;
  }, 0);

  return {
    contents: scaledContents,
    rowHeight: minimumRowHeight * scaleDueToHeight,
    horizontalWhitespace: remainingWhitespace
  };
};

var getImageDimensions = function getImageDimensions(image) {
  var width = image.width,
      height = image.height;

  switch (image.image_orientation) {
    case 'LeftBottom':
      return {
        x: height,
        y: width
      };
    default:
      return {
        x: width,
        y: height
      };
  }
};

var useGrid = function useGrid() {
  var rows = React.useRef();
  return {
    renderRow: React__default.createElement(Row, null),
    itemData: itemData
  };
};

var minimumRowHeight = void 0,
    maximumRowHeight = void 0;

var DreamGrid = function (_Component) {
  inherits(DreamGrid, _Component);

  function DreamGrid(props) {
    classCallCheck(this, DreamGrid);

    var _this = possibleConstructorReturn(this, (DreamGrid.__proto__ || Object.getPrototypeOf(DreamGrid)).call(this, props));

    minimumRowHeight = props.minimumRowHeight;
    maximumRowHeight = props.maximumRowHeight;
    _this.list = React.createRef();
    return _this;
  }

  createClass(DreamGrid, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props$size = this.props.size,
          height = _props$size.height,
          width = _props$size.width;

      if (prevProps.size.height !== height || prevProps.size.width !== width) {
        this.list.resetAfterIndex(0, true);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          images = _props.images,
          size = _props.size,
          renderItem = _props.renderItem;
      var height = size.height,
          width = size.width;

      var rows = makeRows([], makeDimensions(images), width, minimumRowHeight, maximumRowHeight);
      var itemData = { rows: rows, images: images, renderItem: renderItem };
      return React__default.createElement(
        reactWindow.VariableSizeList,
        {
          height: height,
          width: width,
          itemData: itemData,
          itemSize: function itemSize(index) {
            return getItemSize(rows, index);
          },
          itemCount: rows.length,
          ref: function ref(node) {
            _this2.list = node;
          }
        },
        Row
      );
    }
  }]);
  return DreamGrid;
}(React.Component);

DreamGrid.propTypes = {
  minimumRowHeight: PropTypes.number,
  maximumRowHeight: PropTypes.number,
  size: PropTypes.objectOf(PropTypes.number),
  images: PropTypes.array,
  renderItem: PropTypes.func
};

exports.useGrid = useGrid;
exports.Grid = DreamGrid;
//# sourceMappingURL=index.js.map
