import mapboxgl from 'mapbox-gl';

import { apiKey } from './apiKey';

let map = null;
const layerId = "route";

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
            (response.status !== 200) ? Promise.reject(response) : response.json()
        );

export const fetchRoute = (address1, address2) =>
    fetch(`https://loft-taxi.glitch.me/route?address1=${address1}&address2=${address2}`)
        .then((response) => 
            (response.status !== 200) ? Promise.reject(response) : response.json()
        );
        
export const drawRoute = (route) => {
    if (map.getLayer(layerId)) {
        map.getSource(layerId).setData({
            type: "FeatureCollection",
            features: [{
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: route
                }
            }]
        });
        
        return;
    }
          
    map.addLayer({
        id: layerId,
        type: "line",
        source: {
            type: "geojson",
            data: {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: route
                }
            }
        },
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#c2423a",
            "line-width": 8
        }
    });
};

export const removeRoute = () => {
    map.removeLayer(layerId);
    map.removeSource(layerId);
};
          
export const flyTo = (point) => {
    map.flyTo({
        center: point,
        zoom: 14,
        bearing: 0,
        speed: 1,
        curve: 1
    });
};