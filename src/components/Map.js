import React from "react";
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup';
import PropTypes from "prop-types";
import '../style/App.css';
import 'leaflet/dist/leaflet.css';

export class Map extends React.Component {

    constructor(props) {
        super(props);
    };

    static propTypes = {
        position: PropTypes.arrayOf(Number).isRequired
    };

    render() {
        return (
            <MapContainer center={this.props.position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={this.props.position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        );
    }
}