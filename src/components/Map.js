import React, {useEffect, useState} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import '../style/Map.css';
import {useSelector} from "react-redux";
import {formatSeconds} from "../helpers";

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

    const updateCenterCallback = (center) => {
        setMapCenter(center)
    }

    return (
        <MapContainer center={props.position} zoom={13} scrollWheelZoom={false}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

            {
                props.Waypoints ? props.Waypoints.map((waypoint, index) => (
                    <Marker key={index} position={[waypoint.lat, waypoint.lng]}>
                        <Popup>
                            {waypoint.label} <br/>
                            <span onClick={() => props.momentCallback(waypoint.timestamp)} style={{cursor: "pointer"}}><strong>Moment : {formatSeconds(waypoint.timestamp)}</strong></span>
                        </Popup>
                    </Marker>
                )) : ""
            }
            <ResizeMap center={mapCenter} zoom={13}/>
            <UpdateMapMarker waypoints={props.Waypoints}
                             currentCenter={mapCenter}
                             updateCenterCallback={updateCenterCallback}/>
        </MapContainer>
    );
}


function ResizeMap({center, zoom}) {
    const map = useMap()
    setTimeout(() => {
        map.invalidateSize()
    }, 100);

    useEffect(() => {
        if (center) {
            map.setView(center, zoom)
        }
    }, [center])

    return null
}


function UpdateMapMarker({updateCenterCallback, waypoints, currentCenter}) {
    const videoTime = useSelector((state) => state.videoTime)
    const map = useMap()

    useEffect(() => {
        // console.log("Mise a jour des markers ", videoTime)
        if (waypoints) {
            let center = waypoints
                .filter(waypoint => waypoint.timestamp <= videoTime)
                .slice(-1)[0]

            center = center ? {
                lat: center.lat,
                lng: center.lng
            } : waypoints[0]

            if (center && (currentCenter.lat !== center.lat || currentCenter.lng !== center.lng)) {

                updateCenterCallback(center)
            }
        }
    }, [videoTime])

    return null
}
