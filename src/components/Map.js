import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import '../style/App.css';

function ResizeMap()
{
    const map = useMap()
    setTimeout(() => {
        map.invalidateSize()
    }, 100);
    return null
}

export function Map(props) {
    L.Marker.prototype.options.icon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });

    return (
        <MapContainer center={props.position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {props.labels.map((label, index) => (
                <Marker key={index} position={[label.lat, label.lng]}>
                    <Popup>{label.name}</Popup>
                </Marker>
            ))}
            <ResizeMap/>
        </MapContainer>
    );

}
