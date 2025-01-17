"use strict";
exports.__esModule = true;
exports.getAllPaths = exports.getRouteByPath = exports.managerRoutes = exports.routes = void 0;
exports.routes = [
    {
        path: '/',
        label: 'Home'
    }, {
        path: '/rooms',
        label: 'Rooms'
    },
    {
        path: '/objects',
        label: 'Objects'
    },
    {
        path: '/history',
        label: 'History'
    },
    {
        path: '/about',
        label: 'About'
    },
    {
        path: '/profile',
        label: 'Profile'
    },
    {
        path: '/blog',
        label: 'Blog',
        children: [
            {
                path: '/blog/latest',
                label: 'Latest Posts'
            },
        ]
    },
    {
        path: '/contact',
        label: 'Contact'
    },
];
// Add manager-only routes
exports.managerRoutes = [
    {
        path: '/access-management',
        label: 'Access Management'
    },
];
// Utility functions to work with routes
exports.getRouteByPath = function (path) {
    var findRoute = function (routes) {
        for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
            var route = routes_1[_i];
            if (route.path === path)
                return route;
            if (route.children) {
                var childRoute = findRoute(route.children);
                if (childRoute)
                    return childRoute;
            }
        }
    };
    return findRoute(exports.routes);
};
exports.getAllPaths = function () {
    var paths = [];
    var extractPaths = function (routes) {
        routes.forEach(function (route) {
            paths.push(route.path);
            if (route.children) {
                extractPaths(route.children);
            }
        });
    };
    extractPaths(exports.routes);
    return paths;
};
