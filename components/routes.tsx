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

export const ROUTE_ACCESS: { pattern: RegExp; minLevel: number}[] = [
    { pattern: /^\/profile/, minLevel: 1},
    { pattern: /^\/stampcard/, minLevel: 1},
    { pattern: /^\/stamp/, minLevel: 2},
    { pattern: /^\/attendance/, minLevel: 2},
]
