import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import { emailService } from '../services/email.service';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationPin } from "@fortawesome/free-solid-svg-icons"

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap() {
    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 });
    const zoom = 11;

    useEffect(() => { onlocation() }, [])

    async function onlocation() {
        try {
            const mylocation = await emailService.getUserPos();
            setCoordinates(mylocation)
        } catch (error) {
            console.log(error);
        }
    }
    function onHandleClick({ lat, lng }) {
        setCoordinates({ lat, lng })
    }

    return (
        <div style={{ height: '10vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDZ_exO5x3MHAchKom7w1W0Vk7bgIQhQZ8" }}
                center={coordinates}
                defaultZoom={zoom}
                onClick={onHandleClick}
            >
                <AnyReactComponent
                    {...coordinates}
                    text={<FontAwesomeIcon icon={faLocationPin} className="pencil-icon" />}
                />
            </GoogleMapReact>
        </div>
    );
}