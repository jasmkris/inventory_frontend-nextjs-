'use client';
"use strict";
exports.__esModule = true;
exports.RoomFilter = void 0;
var sheet_1 = require("@/components/ui/sheet");
var checkbox_1 = require("@/components/ui/checkbox");
function RoomFilter(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, categories = _a.categories, selectedCategories = _a.selectedCategories, onCategoryChange = _a.onCategoryChange;
    return (React.createElement(sheet_1.Sheet, { open: isOpen, onOpenChange: onClose },
        React.createElement(sheet_1.SheetContent, null,
            React.createElement(sheet_1.SheetHeader, null,
                React.createElement(sheet_1.SheetTitle, null, "Filter Items")),
            React.createElement("div", { className: "py-4" },
                React.createElement("h3", { className: "mb-4 text-sm font-medium" }, "Categories"),
                React.createElement("div", { className: "space-y-4" }, categories.map(function (category) { return (React.createElement("div", { key: category, className: "flex items-center space-x-2" },
                    React.createElement(checkbox_1.Checkbox, { id: category, checked: selectedCategories.includes(category), onCheckedChange: function () { return onCategoryChange(category); } }),
                    React.createElement("label", { htmlFor: category, className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" }, category))); }))))));
}
exports.RoomFilter = RoomFilter;
