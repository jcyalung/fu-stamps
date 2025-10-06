export const GUESTROUTES = {
                                '/login': 'LOGIN', 
                                '/about': 'ABOUT',
                            };


export const MEMBERROUTES = {
                                '/stampcard': 'STAMP CARD', 
                                '/profile': 'PROFILE',
                                '/about': 'ABOUT',
                            };


export const ACADEMICSROUTES = {
                                '/stamp': 'STAMP', 
                                '/attendance': 'ATTENDANCE LOG', 
                                '/profile': 'PROFILE',
                                '/about': 'ABOUT'
                            };

// users with these verification levels can access these requests
export const ROUTE_ACCESS: { pattern: RegExp; minLevel: number}[] = [

    // verified user routes
    { pattern: /^\/profile/, minLevel: 1},
    { pattern: /^\/stampcard/, minLevel: 1},
    { pattern: /^\/api\/addStamp$/,  minLevel: 1},
    { pattern: /^\/api\/createStampCard$/,  minLevel: 1},
    
    // academics director routes
    { pattern: /^\/stamp/, minLevel: 2},
    { pattern: /^\/attendance/, minLevel: 2},
    { pattern: /^\/api\/setStamp$/,  minLevel: 2},
    { pattern: /^\/api\/deleteStamp$/,  minLevel: 2},
]
