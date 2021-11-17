"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EquivalentInUSDT = exports.HorizontalContentDiv = exports.TxStatus = exports.MainText = exports.VerticalContentDiv = exports.TxCardWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  font-size: 12px;\n  width: 100%;\n  color: rgba(250, 250, 250, 0.8);\n  text-align: start;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  height: 17px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  font-size: 12px;\n  line-height: 14px;\n  height: 14px;\n  color: ", ";\n  margin-top: 0px;\n  margin-bottom: 0px;\n  text-align: start;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  height: 14px;\n  font-size: 12px;\n  line-height: 14px;\n  letter-spacing: 0.01em;\n  color: ", ";\n  margin-top: 0px;\n  margin-bottom: 3px;\n  text-align: start;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 90%;\n  height: 55px;\n  background: linear-gradient(\n    98.61deg,\n    ", " -29.86%,\n    #383838 123.74%,\n    rgba(56, 56, 56, 0.72) 123.74%\n  );\n  box-shadow: 0px 0px 40px rgba(13, 13, 13, 0.2);\n  border-radius: 5px;\n  margin-top: 15px;\n  margin-bottom: 5px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var primaryTextColor = _utils.colors.primaryTextColor,
    darkBgColor1 = _utils.colors.darkBgColor1;

var TxCardWrapper = _styledComponents["default"].div(_templateObject(), darkBgColor1);

exports.TxCardWrapper = TxCardWrapper;

var VerticalContentDiv = _styledComponents["default"].div(_templateObject2());

exports.VerticalContentDiv = VerticalContentDiv;

var MainText = _styledComponents["default"].p(_templateObject3(), function (props) {
  return props.color ? props.color : primaryTextColor;
});

exports.MainText = MainText;

var TxStatus = _styledComponents["default"].p(_templateObject4(), primaryTextColor);

exports.TxStatus = TxStatus;

var HorizontalContentDiv = _styledComponents["default"].div(_templateObject5());

exports.HorizontalContentDiv = HorizontalContentDiv;

var EquivalentInUSDT = _styledComponents["default"].p(_templateObject6());

exports.EquivalentInUSDT = EquivalentInUSDT;