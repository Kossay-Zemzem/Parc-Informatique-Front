//This file contains variables used in production (when building the front)
//(build with `ng build --configuration=production`)
export const environment = {
    production: false,
    // baseURL: 'http://localhost:8080'
    baseURL: '' // Use same origin as frontend because frontend and backend are served from same origin in production
};