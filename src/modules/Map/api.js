import mapboxgl from 'mapbox-gl';

import { apiKey } from './apiKey';

let map = null;

export const mapInit = (mapContainer) => {   
    mapboxgl.accessToken = apiKey;

    map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v9",
        center: [30.2656504, 59.8029126],
        zoom: 15
    });

    return map;
};

export const fetchAddressList = () =>
    fetch('https://loft-taxi.glitch.me/addressList')
        .then((response) => 
            (response.status) !== 200 ? Promise.reject(response) : response.json()
        );