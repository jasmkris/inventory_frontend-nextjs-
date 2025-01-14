"use strict";

exports.__esModule = true;

var page_1 = require("../dashboard/page");

var Navigation_1 = require("@/components/Navigation");

function Home() {
  return React.createElement("div", null, React.createElement(Navigation_1["default"], null), React.createElement(page_1["default"], null));
}

exports["default"] = Home;