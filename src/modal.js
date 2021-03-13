import React, { useState } from 'react';
import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
} from '@elastic/eui';


const ModalExample = ({ modal, toggle, selectedFeature }) => {

  let modalBox;

  if (modal) {
    modalBox =
    <EuiOverlayMask onClick={toggle}>
      <EuiModal onClose={toggle}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>Room Information</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
          <p>
            <b>Name: </b>
            {selectedFeature &&
              selectedFeature.properties &&
              selectedFeature.properties.name}
          </p>
          <p>
            <b>Room Capacity: </b>
            {selectedFeature &&
              selectedFeature.properties &&
              selectedFeature.properties.roomCapacity}
          </p>
          <p>
            <b>Current Capacity: </b>
            {selectedFeature &&
              selectedFeature.properties &&
              selectedFeature.properties.roomCapacity}
          </p>
          <p>
            <b>Estimated COVID-19 Risk: </b>
            {selectedFeature &&
              selectedFeature.properties &&
              selectedFeature.properties.roomCapacity}
          </p>
      </EuiModalBody>
      <EuiModalFooter>
        <EuiButton onClick={toggle} fill>
          Close
        </EuiButton>
      </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  }

  return (
    <>
    {modalBox}
    </>
  );
};

export default ModalExample;
