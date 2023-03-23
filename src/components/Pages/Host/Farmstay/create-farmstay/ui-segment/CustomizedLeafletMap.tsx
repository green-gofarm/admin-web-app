import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";

import { LatLngExpression } from "leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
const center: LatLngExpression = [10.8231, 106.6297]

interface HandlerProps {
    selectPosition: any,
    onClick?: (position: any) => void
}

// const searchUrl = "https://nominatim.openstreetmap.org/reverse?";

// async function reserveApi(lat: any, lon: any) {
//     const params = {
//         lat,
//         lon,
//         format: "json",
//     };

//     const paramUrl = new URLSearchParams(params).toString();
//     const url = searchUrl + paramUrl;

//     const response = await fetch(url);
//     return await response.json();
// }

function Handler({ onClick, selectPosition }: HandlerProps) {
    const map = useMap();

    const mapEvent = useMapEvents({
        click: () => {
            mapEvent.locate();
        },
        locationfound: (location) => {
            // async function getLocation() {
            //     try {
            //         const data = await reserveApi(location.latlng.lat, location.latlng.lng);
            //         onClick && onClick(data);
            //     } catch (error) {
            //         onClick && onClick(null);
            //     }
            // }

            // getLocation();
        },
    })

    useEffect(() => {
        if (selectPosition) {
            map.setView(
                L.latLng(selectPosition.lat, selectPosition.lon),
                map.getZoom(),
                {
                    animate: true
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectPosition]);

    return <></>;
}

interface CustomizedLeafletMapProps {
    triggerValue: any,
    onChange?: (position: any) => void
}
export default function CustomizedLeafletMap({
    triggerValue,
    onChange
}: CustomizedLeafletMapProps) {

    const [position, setPosition] = useState<any>({});

    useEffect(() => {
        setPosition(triggerValue);
    }, [triggerValue])


    const handleOnChange = (postion: any) => {
        setPosition(postion);
        onChange && onChange(postion);
    }

    return (
        <MapContainer
            center={center}
            zoom={13}
            closePopupOnClick
            style={{
                width: "100%",
                height: "100%"
            }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=rX5RNaXRkeNj5r6D7Rzh"
            />

            <Handler
                selectPosition={triggerValue}
                onClick={handleOnChange}
            />

            {position?.lat && position?.lon
                ? (
                    <Marker position={[position.lat, position.lon]}>
                        <Popup>
                            {position.display_name}
                        </Popup>
                    </Marker>
                )
                : null
            }
        </MapContainer>
    );
}
