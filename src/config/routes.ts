export type Route = {
    path: string;
    label: string;
    children?: Route[];
};

export const routes: Route[] = [
    {
        path: '/',
        label: 'Home',
    }, {
        path: '/rooms',
        label: 'Rooms',
    },
    {
        path: '/objects',
        label: 'Objects',
    },
    {
        path: '/history',
        label: 'History',
    },
    {
        path: '/about',
        label: 'About',
    },
    {
        path: '/profile',
        label: 'Profile',
    },
    {
        path: '/blog',
        label: 'Blog',
        children: [
            {
                path: '/blog/latest',
                label: 'Latest Posts',
            },
            // Add more nested routes as needed
        ],
    },
    {
        path: '/contact',
        label: 'Contact',
    },
];
// Add manager-only routes
export const managerRoutes: Route[] = [
    {
        path: '/access-management',
        label: 'Access Management',
    },
];
// Utility functions to work with routes
export const getRouteByPath = (path: string): Route | undefined => {
    const findRoute = (routes: Route[]): Route | undefined => {
        for (const route of routes) {
            if (route.path === path) return route;
            if (route.children) {
                const childRoute = findRoute(route.children);
                if (childRoute) return childRoute;
            }
        }
    };

    return findRoute(routes);
};

export const getAllPaths = (): string[] => {
    const paths: string[] = [];

    const extractPaths = (routes: Route[]) => {
        routes.forEach(route => {
            paths.push(route.path);
            if (route.children) {
                extractPaths(route.children);
            }
        });
    };

    extractPaths(routes);
    return paths;
}; 