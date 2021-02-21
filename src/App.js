import React, { useState } from 'react';
import './App.css'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ImageOverlay,
  Polygon,
  GeoJSON,
  FeatureGroup,
  useMapEvent,
  useMapEvents
} from 'react-leaflet'


import {
  EuiButton,
  EuiPage,
  EuiPageSideBar,
  EuiText,
  EuiCard,
  EuiTreeView
} from '@elastic/eui';

import ModalExample from "./modal.js"

//// TODO:

//Import JSON file
const roomData = require('./geojson.json');

function AddMarkerToClick() {
  const [markers, setMarkers] = useState([]);
  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng;
      setMarkers([...markers, newMarker]);
    },
  })
  return (
    <>
      {markers.map(marker =>
        <Marker position={marker}>
          <Popup><pre>{JSON.stringify({marker}, null, 2)}</pre></Popup>
        </Marker>
      )}
    </>
  )
}

function DisplayGeoJSONData() {
  const [modal, setModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState({});

  const toggle = () => setModal(!modal);

  return (
  <>
  {roomData.features.map((feature, index) => {
    return (
      <FeatureGroup key={index}>
        <Popup>
          <p>{feature.properties.name}</p>
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
          positions={feature.geometry.coordinates}
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

function DisplayRoomCards() {
  return (
  <>
  {roomData.features.map((feature, index) => {
    return (
      <EuiCard
        key={index}
        title={feature.properties.name}
        description={"Sample room"}
      />
    );
  })}
  </>
  );
}


class GlobalMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centerLat: 51.0447,
      centerLon:-114.0719
    };
  }

  render() {

    let position = [this.state.centerLat, this.state.centerLon];

    return (
      <MapContainer center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddMarkerToClick />
      </MapContainer>
    );
  }

}

class LocalMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: [[0,0],[330,255]],
      markerCoords:[100,100]
    };
  }

  /*onEachFeature(feature, layer) {
  	const func = (e)=>{console.log("Click")};
    layer.bindPopup(feature.properties.name);
  	layer.on({
    	click: func
    });
  }*/

  render() {

    let mapBounds = this.state.bounds;

    return (
      <MapContainer zoom={-5} bounds={mapBounds} onClick={this.handleClick}>
        <ImageOverlay
        url="https://engo500.s3.us-west-2.amazonaws.com/floorplan.PNG"
        bounds={mapBounds}
        zoom={0}
        />
        <DisplayGeoJSONData />
      </MapContainer>
    );
  }

}

function App() {
  return (
    <EuiPage>
      <EuiPageSideBar>
        <EuiText>
        <h3>ENGO 500 Capstone</h3>
        <EuiButton id="button"
        onClick={() => {
        }}
        >
        Log in or Register
        </EuiButton>

        </EuiText>
      </EuiPageSideBar>
      <div class="leaflet-container">
        <LocalMap />
      </div>
    </EuiPage>
  );
}

export default App;
