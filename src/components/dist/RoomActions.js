'use client';
"use strict";
exports.__esModule = true;
exports.RoomActions = void 0;
var dialog_1 = require("@/components/ui/dialog");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
function RoomActions(_a) {
    var roomId = _a.roomId, onEdit = _a.onEdit, onDelete = _a.onDelete;
    var _b = react_1.useState(false), showDeleteDialog = _b[0], setShowDeleteDialog = _b[1];
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "relative" },
            React.createElement("button", { className: "p-2 hover:bg-gray-100 rounded-full" },
                React.createElement(lucide_react_1.MoreVertical, { className: "h-5 w-5" })),
            React.createElement("div", { className: "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 py-2" },
                React.createElement("button", { onClick: onEdit, className: "w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center" },
                    React.createElement(lucide_react_1.Edit, { className: "h-4 w-4 mr-2" }),
                    "Edit Room"),
                React.createElement("button", { onClick: function () { return setShowDeleteDialog(true); }, className: "w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center" },
                    React.createElement(lucide_react_1.Trash, { className: "h-4 w-4 mr-2" }),
                    "Delete Room"))),
        React.createElement(dialog_1.Dialog, { open: showDeleteDialog, onOpenChange: setShowDeleteDialog },
            React.createElement(dialog_1.DialogContent, null,
                React.createElement(dialog_1.DialogHeader, null,
                    React.createElement(dialog_1.DialogTitle, null, "Delete Room")),
                React.createElement("p", null, "Are you sure you want to delete this room? This action cannot be undone."),
                React.createElement("div", { className: "flex justify-end space-x-4 mt-4" },
                    React.createElement("button", { onClick: function () { return setShowDeleteDialog(false); }, className: "px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" }, "Cancel"),
                    React.createElement("button", { onClick: function () {
                            onDelete();
                            setShowDeleteDialog(false);
                        }, className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700" }, "Delete"))))));
}
exports.RoomActions = RoomActions;
