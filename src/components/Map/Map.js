import React, { memo } from 'react';

import MapBox from './MapBox';
import MapForm from './MapForm';
import './Map.css';

const Map = memo(() => (
    <div className="Map">
        <MapBox />
        <MapForm />
    </div>
));

export default Map;