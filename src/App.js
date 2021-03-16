import React, { useState, useEffect } from 'react';
import './App.css'
import Login from './loginComponents/login';
import Dashboard from './loginComponents/dashboard';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios'

import {
  Map,
  TileLayer,
  Marker,
  Popup,
  ImageOverlay,
  Polygon,
  GeoJSON,
  FeatureGroup,
  useMapEvent,
  useMapEvents,
} from 'react-leaflet'

import {
  EuiButton,
  EuiPage,
  EuiPageSideBar,
  EuiText,
  EuiTitle,
  EuiSpacer
} from '@elastic/eui';

import ModalExample from "./modal.js"


//Import JSON file
const roomData = require('./geojson.json');

const GetData = (props) => {

  const [buildings,setBuildings] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url:`https://engo500.herokuapp.com/building`
  }).then(res => setBuildings(res.data))
  }, [])

  return (
     buildings.map(points => <Marker position={[points.lat,points.lon]} riseOnHover="true">
        <Popup>
         Name: {points.Name} <br /><br />
         <EuiButton onClick={() => {
           props.changeView(); 
           props.globalToLocal(points)
           }}>View</EuiButton>
       </Popup>
     </Marker>)
  )

}

function DisplayGeoJSONData(props) {
  const [modal, setModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState({});

  const toggle = () => setModal(!modal);

  const room = props.room;
  return (
  <>
  {room.map((feature, index) => {
    return (
      <FeatureGroup key={index}>
        <Popup>
          <p>{feature.roomNumber}</p>
          <EuiButton id="button"
          onClick={() => {
            toggle(true);
            setSelectedFeature(feature);
          }}
          >
          More Info
          </EuiButton>
        </Popup>
        <Polygon
          positions={feature.flipC}
        />
        <ModalExample
        modal={modal}
        toggle={toggle}
        selectedFeature={selectedFeature}
        />
      </FeatureGroup>
    );
  })}
  </>
  );
}





let DisplayMap = () => {

  const [mapState,setMap] = useState(false);
  const [Url,setUrl] = useState('');
  let position = [51.0447,-114.0719]
  let mapBounds =  [[0,0],[330,255]];

  const globalToLocal = (index) => {
    setUrl(index);
  };

  const history = useHistory();
  
  return (
    <EuiPage>
    <EuiPageSideBar>
      <EuiTitle><h3>ENGO 500 Capstone</h3></EuiTitle>
      <EuiText>
      <EuiButton id="button" onClick={() => {history.push('/login')}}>Log in or Register</EuiButton>

      <EuiSpacer></EuiSpacer>
      {mapState
      ? <EuiButton id="toggleMap" onClick={() => setMap(false)}>Close Local Map</EuiButton>
      : <></>
      }
      </EuiText>
    </EuiPageSideBar>
      {mapState
      ?<div class="leaflet-container">
      <Map zoom={15} bounds={mapBounds}>
        <ImageOverlay
          url = {Url.floorplans[0].floorplanImage}
          bounds={mapBounds}
          zoom={10}
        />
        <DisplayGeoJSONData room={Url.floorplans[0].rooms} />
      </MapContainer>
      </div>
      :<Map center={position} zoom={13}>
        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <GetData changeView={() => setMap(true)} globalToLocal={globalToLocal}></GetData>
      </Map>
      }
    </EuiPage>
  )


}


function App() {
  return (
    <div >
      <Switch>
      <Route path="/" component={DisplayMap} exact />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
