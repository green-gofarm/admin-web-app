
import { Box, Grid } from '@mui/material';
import SearchLocation from './SearchLocation';
import { Location } from '../CreateFarmstay';
import { useEffect, useState } from 'react';

import { LatLngExpression } from "leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
const center: LatLngExpression = [10.8231, 106.6297]

interface HandlerProps {
    location: Location,
    onClick?: (location: Location) => void
}


function Handler({ onClick, location }: HandlerProps) {
    const map = useMap();

    const [noView, setNoView] = useState<boolean>(false);

    useMapEvents({
        click: (e) => {
            onClick && onClick({
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            })
            setNoView(true);
        },
    })

    useEffect(() => {
        if (location.lat && location.lng && !noView) {
            map.setView(
                L.latLng(location.lat, location.lng),
                map.getZoom(),
                {
                    animate: true
                }
            )
        }

        if (noView === true) {
            setNoView(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return <></>;
}


interface CustomizedMapProps {
    location: Location,
    onSelect: (location: Location) => void
}

function CustomizedMap({
    location,
    onSelect
}: CustomizedMapProps) {

    const handleOnChange = (postion: any) => {
        onSelect && onSelect(postion);
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
                    zoom={50}
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
                        location={location}
                        onClick={handleOnChange}
                    />

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
            <Box
                position="absolute"
                top={10}
                left="50%"
                borderRadius='8'
                zIndex={1}
                sx={{
                    transform: "translateX(-50%)"
                }}
            >
                <Grid container justifyContent='space-between'>
                    <Grid item xs={12} md={6}>
                        <SearchLocation
                            onSelect={onSelect}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default CustomizedMap;