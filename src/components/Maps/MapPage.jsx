import React, { useEffect, useState } from "react";
import "./MapPage.scss";
import {
    GoogleMap,
    Marker,
    LoadScript,
    StandaloneSearchBox,
} from "@react-google-maps/api";

const MapPage = () => {

    const [map, setMap] = useState();
    const [searchBoxA, setSearchBoxA] = useState();
    const [pointA, setPointA] = useState();
    const [endereco, setEndereco] = useState('')
    const [response, setResponse] = useState(null);

    useEffect(() => {
        console.log('ENDERECO', endereco);
    }, [endereco])

    const position = {
        lat: -4.96924,
        lng: -39.01915
    };

    const onMapLoad = (map) => {
        setMap(map);
    };

    const onLoadA = (ref) => {
        setSearchBoxA(ref);
    };

    const onPlacesChangedA = () => {
        console.log('AA', searchBoxA.getPlaces())

        let places = undefined;
        let place = undefined;

        if (searchBoxA) {
            places = searchBoxA.getPlaces()
        }
        console.log('PLACES',places)
        if (places) {
            place = places[0]
            setEndereco(place.formatted_address)
        }

        const location = {
            lat: place?.geometry?.location?.lat() || 0,
            lng: place?.geometry?.location?.lng() || 0,
        };

        setPointA(location);
        setResponse(null);
        map?.panTo(location);
    };

    return (
        <div className="map">
            <LoadScript googleMapsApiKey='AIzaSyCTLWS-S3PuLwPcCGZZJQdy9cktaoRcGQk' libraries={["places"]}>
                <GoogleMap onLoad={onMapLoad} mapContainerStyle={{ width: "100%", height: "100%" }} center={position} zoom={8}>
                    <div className="address">
                        <StandaloneSearchBox onLoad={onLoadA} onPlacesChanged={onPlacesChangedA} >
                            <input className="addressField" placeholder="Digite o endereço inicial" />
                        </StandaloneSearchBox>
                    </div>
                    {!response && pointA && <Marker position={pointA} label={endereco} />}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapPage;

