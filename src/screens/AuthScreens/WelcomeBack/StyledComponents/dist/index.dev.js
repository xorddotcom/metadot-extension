"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubHeading = exports.MainHeading = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("../../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  font-size: 14px !important;\n  line-height: 20px;\n  text-align: center;\n  text-align-last: center;\n  text-transform: capitalize;\n  margin: 0 auto;\n  width: 254px;\n  font-size: 18px;\n  font-weight: bold;\n  margin-top: 20px;\n  margin-bottom: 40px;\n  /* margin-left: -1.2rem !important; */\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  font-size: ", ";\n  text-align: center;\n  letter-spacing: 0.05em;\n  text-transform: capitalize;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var primaryTextColor = _utils.colors.primaryTextColor,
    secondaryTextColor = _utils.colors.secondaryTextColor;
var welcomeScreenMainHeadingFontSize = _utils.fonts.welcomeScreenMainHeadingFontSize;

var MainHeading = _styledComponents["default"].p(_templateObject(), primaryTextColor, welcomeScreenMainHeadingFontSize);

exports.MainHeading = MainHeading;

var SubHeading = _styledComponents["default"].p(_templateObject2(), secondaryTextColor);

exports.SubHeading = SubHeading;