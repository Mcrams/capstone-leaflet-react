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
        url="https://uc62d6bb72d0e7ec24df2d74cafa.previews.dropboxusercontent.com/p/thumb/ABA07uCU0RsAGwAhJ74wEmu6o7K3voc8XuQc3TPIEPoEbiRg_uD7YiI-PZB4d8PHWA_RRsDUL5u3Vua-3nN2mPdK1j9iXcBEEdx8otsp3Ss775zOgTpM429e6SD169_k2H3dgOJqjjSZBybZ_TjM8vNYdkYncVcRQw4lUlHtE3kIgMBtk4cHyAFEH-w--bkXUWK75xX_8B_uqs5YeM6oDLamoXtMI-rznNxyFYxJTkNxkkQjeyxDvS4Nbaw1u61hAz6y8L-T0lqiMfl2LYxxvNGBHnNLE566hB01dSpSYA8p7DKCdsKgPQmIWHyaBhuFv4kdo3YIXvt1OzOXoSxw75M57gyVlnmXWY7FenfDSLnV1p3MhKa4IGgONiyTWbHRHc6gSC7LkVsmEUZmPLqzWb10/p.jpeg?fv_content=true&size_mode=5"
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
    <div>
      <div class="leaflet-container">
        <LocalMap />
      </div>
    </div>
  );
}

export default App;
