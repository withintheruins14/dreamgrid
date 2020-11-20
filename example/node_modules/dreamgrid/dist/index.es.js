import React__default, { memo, Component, createRef } from 'react';
import { areEqual, VariableSizeList } from 'react-window';
import PropTypes from 'prop-types';

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

var Row = memo(function (_ref) {
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
    rows[index].contents.map(function (content, i) {
      var image = images[itemsBelowIndex + i];
      return renderItem(content, image);
    })
  );
}, areEqual);

var useGrid = function useGrid() {};

var minimumRowHeight = void 0,
    maximumRowHeight = void 0;

var DreamGrid = function (_Component) {
  inherits(DreamGrid, _Component);

  function DreamGrid(props) {
    classCallCheck(this, DreamGrid);

    var _this = possibleConstructorReturn(this, (DreamGrid.__proto__ || Object.getPrototypeOf(DreamGrid)).call(this, props));

    _this.row = function (unscaledContents, scaleDueToHeight) {
      var width = _this.props.size.width;
      var scaledContents = unscaledContents.map(function (unscaledDimension) {
        var factor = _this.factorToFitInMinimumRowHeight(unscaledDimension) * scaleDueToHeight;
        return _this.scaleDimension(unscaledDimension, factor);
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

    _this.makeNextRow = function (remainingDimensions) {
      var width = _this.props.size.width;
      var remainingRowWidth = width;
      var accumulatedRowDimensions = [];
      while (remainingDimensions.length > 0 && remainingRowWidth > _this.widthAtMinimumRowHeight(remainingDimensions[0])) {
        remainingRowWidth -= _this.widthAtMinimumRowHeight(remainingDimensions[0]);
        accumulatedRowDimensions.push(remainingDimensions.shift());
      }

      var widthsAtMinimumHeight = accumulatedRowDimensions.map(function (d) {
        return _this.widthAtMinimumRowHeight(d);
      });
      var totalWidthAtMinimumHeight = widthsAtMinimumHeight.reduce(function (a, b) {
        return a + b;
      }, 0);
      var widthScaleFactor = Math.min(width / totalWidthAtMinimumHeight, maximumRowHeight / minimumRowHeight);
      return {
        next: _this.row(accumulatedRowDimensions, widthScaleFactor),
        remaining: remainingDimensions
      };
    };

    _this.makeRows = function (accumulatedRows, dimensions) {
      var _this$makeNextRow = _this.makeNextRow(dimensions),
          next = _this$makeNextRow.next,
          remaining = _this$makeNextRow.remaining;

      accumulatedRows.push(next);
      if (remaining.length > 0) {
        accumulatedRows.concat(_this.makeRows(accumulatedRows, remaining));
      }
      return accumulatedRows;
    };

    _this.widthAtMinimumRowHeight = function (dimension) {
      return _this.factorToFitInMinimumRowHeight(dimension) * dimension.x;
    };

    _this.factorToFitInMinimumRowHeight = function (dimension) {
      return minimumRowHeight / dimension.y;
    };

    _this.getImageDimensions = function (image) {
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

    _this.makeDimensions = function () {
      var images = _this.props.images;

      return images.filter(function (_ref) {
        var width = _ref.width,
            height = _ref.height;

        return width && height;
      }).map(function (image) {
        var _this$getImageDimensi = _this.getImageDimensions(image),
            x = _this$getImageDimensi.x,
            y = _this$getImageDimensi.y;

        return _this.dimension(x, y);
      });
    };

    _this.getItemSize = function (index) {
      return _this.rows[index].rowHeight;
    };

    minimumRowHeight = props.minimumRowHeight;
    maximumRowHeight = props.maximumRowHeight;
    _this.list = createRef();
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

      var imageDimensions = this.makeDimensions();
      this.rows = this.makeRows([], imageDimensions);
      var itemData = { rows: this.rows, images: images, renderItem: renderItem };
      return React__default.createElement(
        VariableSizeList,
        {
          height: height,
          width: width,
          itemData: itemData,
          itemSize: this.getItemSize,
          itemCount: this.rows.length,
          ref: function ref(node) {
            _this2.list = node;
          }
        },
        Row
      );
    }
  }]);
  return DreamGrid;
}(Component);

DreamGrid.propTypes = {
  minimumRowHeight: PropTypes.number,
  maximumRowHeight: PropTypes.number,
  size: PropTypes.objectOf(PropTypes.number),
  images: PropTypes.object,
  renderItem: PropTypes.func
};

export { useGrid, DreamGrid as Grid };
//# sourceMappingURL=index.es.js.map
