'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var card_1 = require("@/components/ui/card");
var sheet_1 = require("@/components/ui/sheet");
var link_1 = require("next/link");
var react_2 = require("next-auth/react");
var LoadingState_1 = require("@/components/LoadingState");
var ErrorState_1 = require("@/components/ErrorState");
function RoomsPage() {
    var _a;
    var _b = react_1.useState(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = react_1.useState(null), selectedRoom = _c[0], setSelectedRoom = _c[1];
    var _d = react_1.useState(false), isFilterOpen = _d[0], setIsFilterOpen = _d[1];
    var _e = react_1.useState(false), isLoading = _e[0], setIsLoading = _e[1];
    var _f = react_1.useState(null), error = _f[0], setError = _f[1];
    var _g = react_1.useState([]), selectedCategories = _g[0], setSelectedCategories = _g[1];
    var session = react_2.useSession().data;
    var userRole = (((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.role) || 'EMPLOYEE');
    // Mock data - replace with actual API call
    var rooms = [
        {
            id: 1,
            name: 'Main Garage',
            description: 'Main garage, basement level',
            items: [
                { id: 1, name: 'Power Tools Set', category: 'Tools', quantity: 1 },
                { id: 2, name: 'Garden Equipment', category: 'Garden', quantity: 3 },
                { id: 3, name: 'Spare Tires', category: 'Automotive', quantity: 4 },
                { id: 4, name: 'Tool Box', category: 'Tools', quantity: 2 },
                { id: 5, name: 'Lawn Mower', category: 'Garden', quantity: 1 },
                { id: 6, name: 'Car Cleaning Kit', category: 'Automotive', quantity: 2 }
            ]
        },
    ];
    // If you're fetching data from an API, use useEffect:
    /*
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setIsLoading(true);
                // const response = await fetch('/api/rooms');
                // const data = await response.json();
                // setRooms(data);
            } catch (err) {
                setError('Failed to fetch rooms');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRooms();
    }, []);
    */
    // Get unique categories
    var categories = Array.from(new Set(rooms.flatMap(function (room) { return room.items.map(function (item) { return item.category; }); })));
    // Filter items based on selected categories
    var filteredItems = selectedRoom === null || selectedRoom === void 0 ? void 0 : selectedRoom.items.filter(function (item) {
        return selectedCategories.length === 0 || selectedCategories.includes(item.category);
    });
    var RoomsList = function () { return (React.createElement("div", { className: "h-full flex flex-col" },
        React.createElement("div", { className: "p-4 border-b" },
            React.createElement("div", { className: "flex items-center mb-4" },
                React.createElement(link_1["default"], { href: "/dashboard", className: "flex items-center text-blue-500 hover:text-blue-600" },
                    React.createElement(lucide_react_1.ChevronLeft, { className: "h-5 w-5 mr-1" }),
                    "Back to Dashboard")),
            React.createElement("h1", { className: "text-2xl font-semibold" }, "Rooms"),
            React.createElement("p", { className: "text-gray-600" }, "Select a room to view its contents")),
        React.createElement("div", { className: "p-4" },
            React.createElement("div", { className: "flex items-center gap-2 mb-4" },
                React.createElement("div", { className: "relative flex-1" },
                    React.createElement("input", { type: "search", placeholder: "Search rooms...", className: "w-full pl-10 pr-4 py-2 border rounded-lg", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); } }),
                    React.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" }))),
            React.createElement("div", { className: "space-y-4" }, rooms.map(function (room) { return (React.createElement(card_1.Card, { key: room.id, className: "hover:shadow-md transition-shadow cursor-pointer", onClick: function () { return setSelectedRoom(room); } },
                React.createElement(card_1.CardContent, { className: "p-4" },
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("div", null,
                            React.createElement("h3", { className: "font-medium" }, room.name),
                            React.createElement("p", { className: "text-sm text-gray-500" }, room.description),
                            React.createElement("p", { className: "text-sm text-gray-500 mt-1" },
                                room.items.length,
                                " items")),
                        React.createElement(lucide_react_1.ChevronLeft, { className: "h-5 w-5 text-gray-400 transform rotate-180" }))))); }))))); };
    var RoomDetail = function (_a) {
        var room = _a.room;
        var _b = react_1.useState(''), roomSearchTerm = _b[0], setRoomSearchTerm = _b[1];
        var filteredItems = room.items.filter(function (item) {
            return item.name.toLowerCase().includes(roomSearchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(roomSearchTerm.toLowerCase());
        });
        return (React.createElement("div", { className: "h-full flex flex-col" },
            React.createElement("div", { className: "p-4 border-b" },
                React.createElement("div", { className: "flex items-center gap-4" },
                    React.createElement("button", { onClick: function () { return setSelectedRoom(null); }, className: "p-2 hover:bg-gray-100 rounded-full" },
                        React.createElement(lucide_react_1.ChevronLeft, { className: "h-6 w-6" })),
                    React.createElement("div", null,
                        React.createElement("h1", { className: "text-2xl font-semibold" }, room.name),
                        React.createElement("p", { className: "text-gray-600" }, room.description)),
                    React.createElement("button", { className: "ml-auto p-2 hover:bg-gray-100 rounded-full" },
                        React.createElement(lucide_react_1.MoreVertical, { className: "h-5 w-5" })))),
            React.createElement("div", { className: "p-4" },
                React.createElement("div", { className: "flex items-center gap-2 mb-4" },
                    React.createElement("div", { className: "relative flex-1" },
                        React.createElement("input", { type: "search", placeholder: "Search items...", className: "w-full pl-10 pr-4 py-2 border rounded-lg", value: roomSearchTerm, onChange: function (e) { return setRoomSearchTerm(e.target.value); } }),
                        React.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" })),
                    React.createElement(sheet_1.Sheet, { open: isFilterOpen, onOpenChange: setIsFilterOpen },
                        React.createElement(sheet_1.SheetTrigger, { asChild: true },
                            React.createElement("button", { className: "p-2 border rounded-lg hover:bg-gray-50" },
                                React.createElement(lucide_react_1.Filter, { className: "h-5 w-5" }))),
                        React.createElement(sheet_1.SheetContent, null,
                            React.createElement(sheet_1.SheetHeader, null,
                                React.createElement(sheet_1.SheetTitle, null, "Filter Items")),
                            React.createElement("div", { className: "py-4" })))),
                React.createElement("div", { className: "space-y-3" }, filteredItems.map(function (item) { return (React.createElement(card_1.Card, { key: item.id, className: "hover:shadow-md transition-shadow" },
                    React.createElement(card_1.CardContent, { className: "p-4" },
                        React.createElement("div", { className: "flex items-center justify-between" },
                            React.createElement("div", { className: "flex items-center space-x-3" },
                                React.createElement(lucide_react_1.Package, { className: "h-5 w-5 text-gray-500" }),
                                React.createElement("div", null,
                                    React.createElement("h3", { className: "font-medium" }, item.name),
                                    React.createElement("p", { className: "text-sm text-gray-500" }, item.category))),
                            React.createElement("div", { className: "text-sm text-gray-600" },
                                "Qty: ",
                                item.quantity))))); }))),
            userRole === 'MANAGER' && (React.createElement("button", { className: "fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors" },
                React.createElement(lucide_react_1.Plus, { className: "h-6 w-6" })))));
    };
    if (isLoading)
        return React.createElement(LoadingState_1.LoadingState, null);
    if (error)
        return React.createElement(ErrorState_1.ErrorState, { message: error, onRetry: function () { } });
    return (React.createElement("div", { className: "min-h-screen bg-gray-50" }, selectedRoom ? (React.createElement(RoomDetail, { room: selectedRoom })) : (React.createElement(RoomsList, null))));
}
exports["default"] = RoomsPage;
