import React, { useRef, useState } from 'react';
import { L } from 'leaflet';
import {
  Map,
  TileLayer,
  Circle,
  Marker,
  Popup,
  ImageOverlay,
  Polygon,
  GeoJSON,
  FeatureGroup,
} from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import {
  EuiButton,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiText,
  EuiTitle,
} from '@elastic/eui';

import './modalMapDraw.css';


const MapModal = ({ visibility, toggle, polyCoords, onPolyConfirm, image }) => {

  let flyoutContent;

  let mapBounds =  [[0,0],[330,255]];

  const editRef = useRef();

  const [drawing, setDrawing] = useState(false);

  const handleClick = () => {

      //Edit this method to perform other actions

      if (!drawing) {
          editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.enable()
      } else {
          editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.completeShape()
          editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.disable()
      }
      setDrawing(!drawing)
  }


  const onShapeDrawn = (e) => {
      setDrawing(false)

      const polyArray = e.layer._latlngs[0].map(index => {
        return [index.lat,index.lng];
      });

      polyCoords(polyArray);

      e.layer.on('click', () => {
          editRef.current.leafletElement._toolbars.edit._modes.edit.handler.enable()
      })
      e.layer.on('contextmenu', () => {
          //do some contextmenu action here
      })
      e.layer.bindTooltip("Text",
          {
            className: 'leaflet-draw-tooltip:before leaflet-draw-tooltip leaflet-draw-tooltip-visible',
            sticky: true,
            direction: 'right'
          }
      );
  }

  if (visibility) {
    flyoutContent =
    <EuiFlyout
        ownFocus
        onClose={toggle}
        size="l"
        aria-labelledby="flyoutLargeTitle">
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id="flyoutLargeTitle">Draw Room Polygons</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody id="cont">
          <EuiButton id="roomButton" onClick={onPolyConfirm()}>Save Room Coordinates</EuiButton>
          <div id="flyMapContainer">
            <Map bounds={mapBounds} zoom={13}>
              <ImageOverlay
                url ={image}
                bounds={mapBounds}
                zoom={15}
              />
              <FeatureGroup>
                  <EditControl
                  ref={editRef}
                  position='topleft'
                  onCreated={onShapeDrawn}
                  //here you can specify your shape options and which handler you want to enable
                  draw={{
                      rectangle: false,
                      circle: false,
                      polyline: false,
                      circlemarker: false,
                      marker: false,
                      polygon: {
                          allowIntersection: false,
                          shapeOptions: {
                              color: "#000000"
                          },
                      }
                  }}
                  />
              </FeatureGroup>
              </Map>
          </div>
        </EuiFlyoutBody>
      </EuiFlyout>
  }


  return (
    <>
    {flyoutContent}
    </>
  );
};

export default MapModal;
