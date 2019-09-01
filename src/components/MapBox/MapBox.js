import React, { PureComponent } from 'react';

import { mapInit } from '../../modules/Map';
import './MapBox.css';

export default class Map extends PureComponent {
    map = null;
    mapContainer = React.createRef();

    componentDidMount() {
        this.map = mapInit(this.mapContainer);
    }

    componentWillUnmount() {
        if (this.map) this.map.remove();
    }

    render() {
        return <div className="MapBox" ref={this.mapContainer} />;
    }
} 