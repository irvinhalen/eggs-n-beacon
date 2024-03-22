import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import marker_flag from '../../assets/marker.png';
import '../../css/Dashboard.css';
import { Card } from "react-bootstrap";

const customIcon = new Icon({
    iconUrl: marker_flag,
    iconSize: [50, 50]
  });

  const markers = [
    {
        geocode: [9.650019031423012, 123.85542176272286],
        popUp: "Apex"
    },
    {
        geocode: [10.284729931864375, 123.94376182552504],
        popUp: "Vertex"
    },
    {
        geocode: [10.320678189562209, 123.90502560590033],
        popUp: "Summit"
    },
    {
        geocode: [9.924807592344818, 123.6160410255214],
        popUp: "Weft"
    },
    {
        geocode: [9.830637920118438, 124.13963262997027],
        popUp: "Wight"
    },
  ];

function SiteMap() {
  return (
    <Card className="shadow-sm border-0 p-1 h-100">
        <Card.Header style={{ background: 'none' }}>
            <Card.Title className="card-text">Site Map</Card.Title>
        </Card.Header>
        <Card.Body>
            <div className="map-container">
            <MapContainer center={[9.946858249396133, 123.72928371671546]} zoom={9} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker:any) => (
                    <Marker position={marker.geocode} icon={customIcon}>
                        <Popup>{marker.popUp}</Popup>
                    </Marker>
                ))}
            </MapContainer>
            </div>
        </Card.Body>
        {/* <Card.Footer className="border-0">
            <div className="main-text"><p className="mb-0" style={{ textAlign: 'right' }}>Project: Vertex</p></div>
        </Card.Footer> */}
    </Card>
  )
}

export default SiteMap;