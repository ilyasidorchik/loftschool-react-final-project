import React, { memo } from 'react';

import MapBox from '../MapBox';
import './Map.css';

const Map = memo(() => (
    <div className="Map">
        <MapBox />
    </div>
));

export default Map;