import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import { MapContainer, TileLayer, Marker, Popup, ImageOverlay, useMapEvents} from 'react-leaflet'


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
        <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
      </Marker>
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


  render() {

    let mapBounds = [[0,0],[330,255]];

    return (
      <MapContainer zoom={-5} bounds={mapBounds} onClick={this.handleClick}>
        <ImageOverlay
        url="https://uc62d6bb72d0e7ec24df2d74cafa.previews.dropboxusercontent.com/p/thumb/ABA07uCU0RsAGwAhJ74wEmu6o7K3voc8XuQc3TPIEPoEbiRg_uD7YiI-PZB4d8PHWA_RRsDUL5u3Vua-3nN2mPdK1j9iXcBEEdx8otsp3Ss775zOgTpM429e6SD169_k2H3dgOJqjjSZBybZ_TjM8vNYdkYncVcRQw4lUlHtE3kIgMBtk4cHyAFEH-w--bkXUWK75xX_8B_uqs5YeM6oDLamoXtMI-rznNxyFYxJTkNxkkQjeyxDvS4Nbaw1u61hAz6y8L-T0lqiMfl2LYxxvNGBHnNLE566hB01dSpSYA8p7DKCdsKgPQmIWHyaBhuFv4kdo3YIXvt1OzOXoSxw75M57gyVlnmXWY7FenfDSLnV1p3MhKa4IGgONiyTWbHRHc6gSC7LkVsmEUZmPLqzWb10/p.jpeg?fv_content=true&size_mode=5"
        bounds={mapBounds}
        zoom={0}
        />
      </MapContainer>
    );
  }

}


function App() {
  return (
    <div class="leaflet-container">
      <GlobalMap />
    </div>
  );
}

export default App;
