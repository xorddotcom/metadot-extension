"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabSection = exports.Tabs = exports.AssetsAndTransactionsWrapper = exports.CopyIconImg = exports.VariationAmount = exports.PerUnitPrice = exports.PublicAddress = exports.AccountName = exports.Balance = exports.ConnectionStatus = exports.VerticalContentDiv = exports.MoreOptions = exports.OptionsName = exports.Option = exports.OptionRow = exports.MainPanel = exports.AccountText = exports.AccountSetting = exports.AccountContainer = exports.SwitchToTestnet = exports.SelectedChain = exports.SelectChain = exports.NetworkContainer = exports.LogoContainer = exports.DashboardHeader = exports.Wrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("../../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject26() {
  var data = _taggedTemplateLiteral(["\n  width: 48%;\n  height: 34px;\n  cursor: pointer;\n  font-size: 12px;\n  line-height: 33px;\n  /* identical to box height */\n  /* Text and Icons */\n  background-color: ", ";\n  color: ", ";\n  border-radius: 4px;\n  margin: 0px;\n  font-weight: 500;\n"]);

  _templateObject26 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25() {
  var data = _taggedTemplateLiteral(["\n  width: 90%;\n  height: 44px;\n  background: #292929;\n  border-radius: 8px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 0px;\n"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  background: ", ";\n  box-shadow: 0px 0px 10px rgba(230, 0, 122, 0.03);\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 30px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = _taggedTemplateLiteral(["\n  margin-left: 11px;\n  height: 12.5px;\n"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = _taggedTemplateLiteral(["\n  font-size: 14px;\n  /* identical to box height */\n  color: ", ";\n  text-align: start;\n  padding-bottom: 2px;\n"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = _taggedTemplateLiteral(["\n  font-size: 12px;\n  line-height: 14px;\n  font-weight: bold;\n  /* identical to box height */\n  color: rgba(250, 250, 250, 0.8);\n  text-align: start;\n  margin-right: 15px;\n  margin-top: 10px;\n  margin-bottom: 20px;\n"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = _taggedTemplateLiteral(["\n  font-weight: 500;\n  margin-top: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  color: ", ";\n  text-align: start;\n  padding-bottom: 2px;\n"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["\n  font-size: 14px;\n  color: ", ";\n  line-height: 16px;\n  font-weight: 500;\n  text-align: start;\n  margin-bottom: 0px;\n  margin-top: 25px;\n  text-transform: capitalize;\n"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["\n  font-weight: 500;\n  font-size: 30px;\n  line-height: 35px;\n  color: ", ";\n  text-align: start;\n  margin-bottom: 0px;\n  margin-top: 0px;\n"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["\n  font-size: 10px;\n  color: ", ";\n  margin-left: 6px;\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  right: 12px;\n  top: 12px;\n  display: flex;\n  align-items: center;\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n  font-size: 10px;\n  /* identical to box height */\n  text-align: center;\n  margin-top: 4px;\n  color: ", ";\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n  width: 70px;\n  height: 70px;\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background: #232323;\n  border-radius: 15px;\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  justify-content: space-between;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  height: 50%;\n  position: relative;\n  background: linear-gradient(102.54deg, rgba(38, 131, 131, 0.8) -82.51%, rgba(38, 131, 131, 0.8) 21.64%, rgba(20, 20, 20, 0.52) 199.89%);\n  backdrop-filter: blur(130px);\n\n  /* Note: backdrop-filter has minimal browser support */\n  border-radius: 15px;\n  margin-top: 50px;\n  padding-left: 25px;\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  font-size: 20px;\n  line-height: 23px;\n  color: ", ";\n  margin-top: 5px;\n  margin-bottom: 0px;\n  font-weight: 500;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  width: 35px;\n  height: 35px;\n  border-radius: 35px;\n  cursor: pointer;\n  background: ", ";\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  width: 20%;\n  height: 35px;\n  display: flex;\n  align-items: flex-end;\n  justify-content: flex-end;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  font-size: 14px;\n  line-height: 16px;\n  /* identical to box height, or 133% */\n  letter-spacing: 0.02em;\n  /* Text and Icons */\n  color: ", ";\n  opacity: 0.8;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 34px;\n  cursor: pointer;\n  padding-left: 10px;\n  padding-right: 5px;\n  background: ", ";\n  border: 0.5px solid ", ";\n  box-sizing: border-box;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  width: 219px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  width: 15%;\n  height: 35px;\n  display: flex;\n  align-items: flex-end;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding: 25px 20px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var incrementColor = _utils.colors.incrementColor,
    inActiveTextColor = _utils.colors.inActiveTextColor,
    secondaryTextColor = _utils.colors.secondaryTextColor,
    primaryTextColor = _utils.colors.primaryTextColor,
    primaryBgColor = _utils.colors.primaryBgColor,
    darkBgColor = _utils.colors.darkBgColor,
    darkBgColor1 = _utils.colors.darkBgColor1;

var Wrapper = _styledComponents["default"].div(_templateObject());

exports.Wrapper = Wrapper;

var DashboardHeader = _styledComponents["default"].div(_templateObject2());

exports.DashboardHeader = DashboardHeader;

var LogoContainer = _styledComponents["default"].div(_templateObject3());

exports.LogoContainer = LogoContainer;

var NetworkContainer = _styledComponents["default"].div(_templateObject4());

exports.NetworkContainer = NetworkContainer;

var SelectChain = _styledComponents["default"].div(_templateObject5(), darkBgColor, primaryBgColor, primaryTextColor);

exports.SelectChain = SelectChain;

var SelectedChain = _styledComponents["default"].p(_templateObject6(), primaryTextColor);

exports.SelectedChain = SelectedChain;
var SwitchToTestnet = (0, _styledComponents["default"])(SelectedChain)(_templateObject7(), primaryBgColor);
exports.SwitchToTestnet = SwitchToTestnet;

var AccountContainer = _styledComponents["default"].div(_templateObject8());

exports.AccountContainer = AccountContainer;

var AccountSetting = _styledComponents["default"].div(_templateObject9(), primaryBgColor);

exports.AccountSetting = AccountSetting;

var AccountText = _styledComponents["default"].p(_templateObject10(), primaryTextColor);

exports.AccountText = AccountText;

var MainPanel = _styledComponents["default"].div(_templateObject11());

exports.MainPanel = MainPanel;

var OptionRow = _styledComponents["default"].div(_templateObject12());

exports.OptionRow = OptionRow;

var Option = _styledComponents["default"].div(_templateObject13());

exports.Option = Option;

var OptionsName = _styledComponents["default"].p(_templateObject14(), function (props) {
  return props.inActive ? inActiveTextColor : primaryTextColor;
});

exports.OptionsName = OptionsName;

var MoreOptions = _styledComponents["default"].div(_templateObject15());

exports.MoreOptions = MoreOptions;

var VerticalContentDiv = _styledComponents["default"].div(_templateObject16());

exports.VerticalContentDiv = VerticalContentDiv;

var ConnectionStatus = _styledComponents["default"].p(_templateObject17(), secondaryTextColor);

exports.ConnectionStatus = ConnectionStatus;

var Balance = _styledComponents["default"].p(_templateObject18(), primaryTextColor);

exports.Balance = Balance;

var AccountName = _styledComponents["default"].p(_templateObject19(), primaryTextColor);

exports.AccountName = AccountName;

var PublicAddress = _styledComponents["default"].p(_templateObject20(), secondaryTextColor);

exports.PublicAddress = PublicAddress;

var PerUnitPrice = _styledComponents["default"].p(_templateObject21());

exports.PerUnitPrice = PerUnitPrice;

var VariationAmount = _styledComponents["default"].p(_templateObject22(), incrementColor);

exports.VariationAmount = VariationAmount;

var CopyIconImg = _styledComponents["default"].img(_templateObject23());

exports.CopyIconImg = CopyIconImg;

var AssetsAndTransactionsWrapper = _styledComponents["default"].div(_templateObject24(), darkBgColor1);

exports.AssetsAndTransactionsWrapper = AssetsAndTransactionsWrapper;

var Tabs = _styledComponents["default"].div(_templateObject25());

exports.Tabs = Tabs;

var TabSection = _styledComponents["default"].p(_templateObject26(), function (props) {
  return props.isActive === true ? primaryBgColor : '#292929';
}, primaryTextColor);

exports.TabSection = TabSection;