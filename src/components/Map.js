import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import '../style/App.css';

export class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: 37.7749,
            lng: -100.4194,
            zoom: 4,
        };
    };

    render() {
        let DefaultIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow
        });
        L.Marker.prototype.options.icon = DefaultIcon;

        const position = [this.state.lat, this.state.lng];

        return (
            <MapContainer center={position} zoom={this.state.zoom} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.props.labels.map((label, index) => (
                    <Marker key={index} position={[label.lat, label.lng]}>
                        <Popup>{label.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        );
    }
}