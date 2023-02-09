import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import '../style/App.css';

export class Map extends React.Component {

    constructor(props) {
        super(props);
    };

    static propTypes = {
        position: PropTypes.arrayOf(Number).isRequired
    };

    render() {
        let DefaultIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow
        });
        L.Marker.prototype.options.icon = DefaultIcon;
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