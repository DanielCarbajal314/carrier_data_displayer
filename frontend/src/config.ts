const { VITE_API_ENDPOINT } = import.meta.env;

export const BASE_API_URL: string = VITE_API_ENDPOINT;
export const MAP_TOKEN: string = import.meta.env.VITE_MAPBOX_TOKEN;
