import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import marker_flag from '../../assets/marker.png';
import marker_active from '../../assets/marker_active.png';
import '../../css/Dashboard.css';
import { Card } from "react-bootstrap";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AuthContextType, useAuth } from '../../utils/AuthContext';
import Axios from 'axios';

    interface sites {
        id: number;
        name: string;
        geocode: LatLngExpression;
        active: boolean;
    }

    const customIcon = new Icon({
        iconUrl: marker_flag,
        iconSize: [50, 55]
    });

    const customIconActive = new Icon({
        iconUrl: marker_active,
        iconSize: [50, 55]
    });

function SiteMap({setSiteId}:{setSiteId:Dispatch<SetStateAction<number>>}) {
    const { user } = useAuth() as AuthContextType;
    const [listOfSites, setListOfSites] = useState<Array<sites>>([]);

    useEffect(() => {
      getSites();
    }, []);

    const getSites = () => {
        if(user) {
            Axios.get('http://localhost:3001/api/markers', {
              params: {
                id: user.id,
                role: user.role
              }
            }).then((response) => {
              setListOfSites(() => {
                return response.data.map((entry:any) => {
                  return { id: entry.site_id, geocode: [entry.latitude, entry.longitude], name: entry.project_name, active: false }
                });
              });
            });
        };
      }

      const activateMarker = (site_id:number) => {
        const listWithActive:Array<sites> = [];
        listOfSites.forEach(list => {
            if(list.active) {
                list.active = false;
            }
            if(list.id === site_id) {
                list.active = true;
                listWithActive
            }
            listWithActive.push(list);
        })
        setListOfSites(listWithActive);
        setSiteId(site_id);
      }

      const deactivateMarkers = () => {
        const listReset:Array<sites> = [];
        listOfSites.forEach(list => {
            list.active = false;
            listReset.push(list);
        })
        setListOfSites(listReset);
        setSiteId(0);
      }

  return (
    <Card className="shadow-sm border-0 p-1 h-100">
        <Card.Header style={{ background: 'none', borderWidth: 0, paddingBottom: 0 }}>
            <Card.Title className="card-text">Site Map</Card.Title>
        </Card.Header>
        <Card.Body>
            <div className="map-container">
            <MapContainer doubleClickZoom={false} center={[9.946858249396133, 123.72928371671546]} zoom={9} scrollWheelZoom={true} attributionControl={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <TileLayer
                    attribution='Stamen Watercolor'
                    url='https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'
                /> */}
                {listOfSites.map((site:sites) => site.active ? (
                    <Marker
                        key={site.id}
                        position={site.geocode}
                        icon={customIconActive}
                        eventHandlers={{ mouseover: (event) => event.target.openPopup(), mouseout: (event) => event.target.closePopup(), click: () => deactivateMarkers() }}
                    >
                        <Popup closeButton={false}>{site.name}</Popup>
                    </Marker>
                ) : (
                    <Marker
                        key={site.id}
                        position={site.geocode}
                        icon={customIcon}
                        eventHandlers={{ mouseover: (event) => event.target.openPopup(), mouseout: (event) => event.target.closePopup(), click: () => activateMarker(site.id) }}
                    >
                        <Popup closeButton={false}>{site.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
            </div>
        </Card.Body>
    </Card>
  )
}

export default SiteMap;