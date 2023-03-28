
import { Box } from '@mui/material';

import { LatLngExpression } from "leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Location } from '../../Pages/Host/Farmstay/create-farmstay/CreateFarmstay';
import { useEffect } from 'react';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
const center: LatLngExpression = [10.8231, 106.6297]


interface HandlerProps {
    location: Location,
}


function Handler({ location }: HandlerProps) {
    const map = useMap();

    useEffect(() => {
        if (location.lat && location.lng) {
            map.setView(
                L.latLng(location.lat, location.lng),
                map.getZoom(),
                {
                    animate: true
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return <></>;
}



interface CustomizedMapProps {
    location: Location,
}

function LeafletViewMap({
    location,
}: CustomizedMapProps) {

    if (!location.lat || !location.lng) {
        return <i>Chưa có thông tin vị trí</i>
    }

    return (
        <Box
            position='relative'
            flexDirection='column'
            alignItems='center'
            width="100%"
            height="100%"
            minHeight="400px"
        >
            <Box
                position='absolute'
                left={0}
                top={0}
                width="100%"
                height="100%"
            >
                <MapContainer
                    center={center}
                    zoom={100}
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

                    <Handler location={location} />

                    {location.lat && location.lng
                        ? (
                            <Marker position={[location.lat, location.lng]}>
                                <Popup>
                                    {`${location.lat} - ${location.lng}`}
                                </Popup>
                            </Marker>
                        )
                        : null
                    }
                </MapContainer>
            </Box>
        </Box>
    )
}

export default LeafletViewMap;