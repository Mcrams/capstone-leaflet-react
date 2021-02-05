{roomData.features.map((feature, index) => {
  return (
    <FeatureGroup color="purple" key={index}>
      <Popup>
        <p>{feature.properties.name}</p>
        <button
        id="button"
        onClick={() => {
          toggle(true);
          setSelectedFeature(feature);
        }}
        >
        More Info
        </button>
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
