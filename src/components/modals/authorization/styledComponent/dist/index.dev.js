"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainText = exports.VerticalContentDiv = exports.MainText1 = exports.MainDiv = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("../../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  height: 14px;\n  font-size: ", ";\n  line-height: ", ";\n  font-weight: 500;\n  letter-spacing: ", ";\n  color: ", ";\n  width: 100%;\n  text-align: start;\n  margin: ", ";\n  margin-bottom: ", ";\n  margin-top: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  margin-bottom: ", ";\n  margin-top: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    font-size: ", ";\n    line-height: 21px;\n    margin-top: ", ";\n    color: rgba(250, 250, 250, 0.85);\n    text-align: ", "; \n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    border: 0.8px solid primaryBackground;\n    display: flex;\n    flex-flow: column;\n    justify-content: center;\n    align-items: center;\n    padding: 1rem 0.5rem;\n    box-sizing: border-box;\n    border-radius: 6px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var primaryText = _utils.colors.primaryText,
    darkBackground1 = _utils.colors.darkBackground1;
var mainHeadingFontSize = _utils.fonts.mainHeadingFontSize,
    buttonFontSize = _utils.fonts.buttonFontSize;

var MainDiv = _styledComponents["default"].div(_templateObject());

exports.MainDiv = MainDiv;

var MainText1 = _styledComponents["default"].p(_templateObject2(), mainHeadingFontSize, function (props) {
  return props.marginTop && props.marginTop;
}, function (props) {
  return props.textAlign;
});

exports.MainText1 = MainText1;

var VerticalContentDiv = _styledComponents["default"].div(_templateObject3(), function (props) {
  return props.mb ? props.mb : '0px';
}, function (props) {
  return props.marginTop && props.marginTop;
});

exports.VerticalContentDiv = VerticalContentDiv;

var MainText = _styledComponents["default"].p(_templateObject4(), function (props) {
  return props.fs ? props.fs : '16px';
}, function (props) {
  return props.lh ? props.lh : '19px';
}, function (props) {
  return props.ls ? props.ls : '0.01em';
}, function (props) {
  return props.color ? props.color : primaryText;
}, function (props) {
  return props.m ? props.m : '0px';
}, function (props) {
  return props.mb ? props.mb : '12px';
}, function (props) {
  return props.mt && props.mt;
});

exports.MainText = MainText;