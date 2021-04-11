import React, { useState, useEffect } from 'react';
import styles from './App.css';
import Login from './loginComponents/login';
import Dashboard from './loginComponents/dashboard';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios'
import iconV from './iconV.svg'
import user from './user.svg'

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
  useMap,
} from 'react-leaflet'

import {
  EuiButton,
  EuiPage,
  EuiPageSideBar,
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  logoMaps,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiAvatar,
  EuiIcon,
  EuiHeaderLogo,
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
        <Popup className={styles.custom}>
         <EuiText>{points.Name}</EuiText>
         <EuiButton size="s" fill="false" onClick={() => {
           props.changeView(); 
           props.globalToLocal(points)
           }}>View Rooms</EuiButton>
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
   <ModalExample
        modal={modal}
        toggle={toggle}
        selectedFeature={selectedFeature}
        />
  {room.map((feature, index) => {
    return (
      <FeatureGroup key={index}>

        <Polygon
          positions={feature.flipC}
          onClick={() => {
            toggle(true);
            setSelectedFeature(feature);
          }}
          onMouseOver={(e) => {
             let layer = e.target;
            layer.setStyle({
              weight: 2,
              color: '#E3242B',
              dashArray: '',
              fillOpacity: 0.7
            });
          }}
    
          onmouseout={(e) => {
            let layer = e.target;
            layer.setStyle({
              color: "#3388FF",
              strokeOpacity: 1,
              strokeWidth: 3,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "#3388FF",
              fillOpacity: 0.2,
            });
          }}
          
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
    <>
    <EuiHeader position='static'>
      <EuiHeaderSectionItem border="right">
      <EuiIcon type={iconV} size="xxl"></EuiIcon><EuiTitle size="s"><h4>COVID-19 Tracker</h4></EuiTitle>
      </EuiHeaderSectionItem>
      <EuiHeaderSectionItem>
        <EuiHeaderLinks>
          <EuiHeaderLink onClick={() => {history.push('/dashboard')}}>Dashboard  <EuiIcon type="dashboardApp"></EuiIcon></EuiHeaderLink>
          <EuiHeaderLink isActive onClick={() => {setMap(false);history.push('/')}}>World Map  <EuiIcon type="gisApp"></EuiIcon></EuiHeaderLink>
          <EuiHeaderLink href="https://github.com/ENGO500/react-leaflet">GitHub  <EuiIcon type="logoGithub"></EuiIcon></EuiHeaderLink>
        
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
      <EuiHeaderSectionItemButton>
      <EuiAvatar
      size="m"
      name="Cat"
      imageUrl={user}
      onClick={() => {history.push('/login')}}
      color = "#000000"
    />
      
      
      </EuiHeaderSectionItemButton>

    </EuiHeader>
      {mapState
      ?<div class="leaflet-container">
      <Map zoom={15} bounds={mapBounds}>
        <ImageOverlay
          url = {Url.floorplans[0].floorplanImage}
          bounds={mapBounds}
          zoom={10}
        />
        <DisplayGeoJSONData room={Url.floorplans[0].rooms} />

      </Map>
      </div>
      :<Map center={position} zoom={13}>
        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://api.mapbox.com/styles/v1/capstonegeo/cknckswvq135g18mjrr3rrx5s/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2Fwc3RvbmVnZW8iLCJhIjoiY2tuY2p1NWt6MTd4MTJ1bWw0ODk4YmN0aiJ9.wwv4wdIQbeUt41f1htvb4w"/>
        <GetData changeView={() => setMap(true)} globalToLocal={globalToLocal}></GetData>
      </Map>
      }
    </>
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
