'use strict';

import PropTypes from 'prop-types';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var _require = require('react-raphael'),
    Raphael = _require.Raphael,
    Paper = _require.Paper,
    Set = _require.Set,
    Text = _require.Text,
    Rect = _require.Rect,
    Path = _require.Path,
    Circle = _require.Circle;

var Axis = require('./base/Axis');
var Utils = require('./utils');

var Component = React.Component;

var BarSerise = function (_Component) {
	_inherits(BarSerise, _Component);

	function BarSerise() {
		_classCallCheck(this, BarSerise);

		return _possibleConstructorReturn(this, (BarSerise.__proto__ || Object.getPrototypeOf(BarSerise)).apply(this, arguments));
	}

	_createClass(BarSerise, [{
		key: 'getDefaultPath',
		value: function getDefaultPath() {
			var _props = this.props,
			    width = _props.width,
			    height = _props.height,
			    xAxis = _props.xAxis,
			    yAxis = _props.yAxis;

			return ["M", yAxis.width, height - xAxis.height + 15, "L", width, height - xAxis.height + 15];
		}
	}, {
		key: 'getBarPath',
		value: function getBarPath() {
			var data = this.getDrawPoints();
			var path = [];
			if (data.length >= 1) {
				path.push(["M", data[0]._x, data[0]._y]);
				for (var i = 1; i < _data.length; i++) {
					path.push(["L", data[i]._x, data[i]._y]);
				}
			} else {
				path.push(["M", data[0]._x || 0, data[0]._y || 0]);
			}
			return path;
		}
	}, {
		key: 'getDrawPoints',
		value: function getDrawPoints() {
			var _props2 = this.props,
			    width = _props2.width,
			    height = _props2.height,
			    serise = _props2.serise,
			    xAxis = _props2.xAxis,
			    yAxis = _props2.yAxis,
			    index = _props2.index,
			    count = _props2.count,
			    barWidth = _props2.barWidth,
			    fontSize = _props2.fontSize;

			serise._index = index;
			serise._count = count;
			var data = Utils.getBarData({ width: width, height: height, xAxis: xAxis, yAxis: yAxis, barWidth: barWidth, fontSize: fontSize }, serise);
			return data.Values;
		}
	}, {
		key: 'handleMouseOut',
		value: function handleMouseOut() {
			var data = this.items;
			this.attr({ "fill": data.color });
			if (data.textAutoHide) {
				this.set[1].hide();
			} else {
				this.set[1].attr({ "fill": data.color });
			}
		}
	}, {
		key: 'handleMouseOver',
		value: function handleMouseOver() {
			var data = this.items;
			data.color = this.attr("fill");
			this.attr({ "fill": data.hoverColor }).toFront();
			if (data.textAutoHide) {
				this.set[1].show().toFront();
			} else {
				this.set[1].attr({ "fill": data.hoverColor }).toFront();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    serise = _props3.serise,
			    height = _props3.height,
			    xAxis = _props3.xAxis,
			    yAxis = _props3.yAxis,
			    fontSize = _props3.fontSize,
			    textAutoHide = _props3.textAutoHide;

			serise.textAutoHide = textAutoHide;
			var data = this.getDrawPoints();
			var defaultX = (yAxis.width || 60) - 15;
			var handleMouseOut = this.handleMouseOut;
			var handleMouseOver = this.handleMouseOver;
			return React.createElement(
				Set,
				null,
				data.map(function (ele, pos) {
					return React.createElement(
						Set,
						{ key: pos },
						React.createElement(Rect, { key: "path" + pos, x: defaultX, y: ele._y - ele._height / 2, width: 0, height: ele._height, data: _extends({}, serise),
							attr: { "fill": ele.color || serise.color, "stroke": "none" }, mouseout: handleMouseOut, mouseover: handleMouseOver,
							animate: Raphael.animation({ "width": ele._width }, 500, "<>") }),
						React.createElement(Text, { key: "text" - pos, x: defaultX + ele._width + fontSize / 2, y: ele._y, text: String(ele.x), attr: { "text-anchor": "start", "fill": textAutoHide ? serise.hoverColor : ele.color || serise.color, "font-size": fontSize }, hide: textAutoHide })
					);
				})
			);
		}
	}]);

	return BarSerise;
}(Component);

var BarChart = function (_Component2) {
	_inherits(BarChart, _Component2);

	function BarChart() {
		_classCallCheck(this, BarChart);

		return _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).apply(this, arguments));
	}

	_createClass(BarChart, [{
		key: 'render',
		value: function render() {
			var _props4 = this.props,
			    width = _props4.width,
			    height = _props4.height,
			    serises = _props4.serises,
			    xAxis = _props4.xAxis,
			    yAxis = _props4.yAxis,
			    grid = _props4.grid,
			    fontSize = _props4.fontSize,
			    barWidth = _props4.barWidth,
			    textAutoHide = _props4.textAutoHide,
			    children = _props4.children;

			return React.createElement(
				Paper,
				{ width: width, height: height },
				React.createElement(Axis, { type: 'bar', width: width, height: height, xAxis: xAxis, yAxis: yAxis, grid: grid }),
				serises.map(function (ele, pos) {
					return React.createElement(BarSerise, { key: pos, ref: "serise" + pos, index: pos, count: serises.length + 1, width: width, height: height, barWidth: barWidth, fontSize: fontSize,
						textAutoHide: textAutoHide, serise: ele, xAxis: xAxis, yAxis: yAxis });
				}),
				children
			);
		}
	}]);

	return BarChart;
}(Component);

BarChart.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	serises: PropTypes.arrayOf(PropTypes.object),
	xAxis: PropTypes.shape({
		min: PropTypes.number,
		max: PropTypes.number,
		interval: PropTypes.number,
		formatter: PropTypes.func,
		width: PropTypes.number
	}),
	yAxis: PropTypes.shape({
		min: PropTypes.number,
		max: PropTypes.number,
		interval: PropTypes.number,
		formatter: PropTypes.func,
		width: PropTypes.number
	}),
	grid: PropTypes.shape({
		color: PropTypes.string,
		thickness: PropTypes.number,
		showYGrid: PropTypes.bool,
		showXGrid: PropTypes.bool
	}),
	barWidth: PropTypes.number,
	fontSize: PropTypes.number,
	textAutoHide: PropTypes.bool
};
BarChart.defaultProps = {
	width: 600,
	height: 400,
	serises: [],
	xAxis: {
		min: 0,
		max: 10000,
		interval: 200,
		formatter: null,
		height: 60
	},
	yAxis: {
		min: 0,
		max: 4,
		interval: 10,
		formatter: null,
		width: 60
	},
	grid: {
		color: "#ccc",
		thickness: 1,
		showYGrid: false,
		showXGrid: true
	},
	barWidth: 20,s
	fontSize: 14,
	textAutoHide: false
};

export default BarChart;