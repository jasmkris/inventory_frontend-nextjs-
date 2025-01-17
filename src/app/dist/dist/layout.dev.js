"use strict";

exports.__esModule = true;
exports.metadata = void 0;

var providers_1 = require("./providers");

require("../globals.css");

exports.metadata = {
  title: "Inventory Dashboard",
  description: "Inventory Dashboard"
};

function RootLayout(_a) {
  var children = _a.children;
  return React.createElement("html", {
    lang: "en"
  }, React.createElement("body", null, React.createElement(providers_1.Providers, null, children)));
}

exports["default"] = RootLayout;