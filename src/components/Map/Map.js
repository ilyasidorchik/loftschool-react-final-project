import React, { PureComponent } from 'react';

import { mapInit } from '../../modules/Map';
import './Map.css';

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
        return (
            <div className="Map">
                <div className="Map-Box" ref={this.mapContainer} />
            </div>
        );
    }
} 