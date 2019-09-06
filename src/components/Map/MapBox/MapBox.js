import React, { Component } from 'react';
import { connect } from 'react-redux';

import { apiKey } from '../../../modules/Map/apiKey';
import { fetchMapRequest } from '../../../modules/Map';
import './MapBox.css';

class MapBox extends Component {
    mapContainer = React.createRef();

    componentDidMount() {
        const { fetchMapRequest } = this.props;
        fetchMapRequest(this.mapContainer, apiKey);
    }

    render() {
        return <div className="MapBox" ref={this.mapContainer} />;
    }
}

export default connect(
    () => {},
    { fetchMapRequest }
)(MapBox);