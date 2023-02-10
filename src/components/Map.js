import React, {useEffect, useState} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import '../style/App.css';

export function Map(props) {
    const [mapCenter, setMapCenter] = useState(null)

    L.Marker.prototype.options.icon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });

    useEffect(() => {
        if (props.Waypoints) {
            setMapCenter({lat: props.Waypoints[0].lat, lng: props.Waypoints[0].lng})
        }
    }, [props.Waypoints])

    return (
        <MapContainer center={props.position} zoom={13} scrollWheelZoom={false}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {
                props.Waypoints ? props.Waypoints.map((waypoint, index) => (
                    <Marker key={index} position={[waypoint.lat, waypoint.lng]}>
                        <Popup>{waypoint.name}</Popup>
                    </Marker>
                )) : ""
            }
            <ResizeMap center={mapCenter} zoom={13}/>
        </MapContainer>
    );
}



function ResizeMap({center, zoom})
{
    const map = useMap()
    setTimeout(() => {
        map.invalidateSize()
    }, 100);

    if (center) {

        console.log("Setting center to : ", center)
        map.setView(center, zoom)
    }
    return null
}

