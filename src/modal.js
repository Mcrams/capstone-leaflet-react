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
  let total = selectedFeature.totalMask+selectedFeature.totalWMask;

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
              selectedFeature.roomNumber &&
              selectedFeature.roomNumber}
          </p>
          <p>
            <b>Room Occupants Wearing A Mask : </b>
            {selectedFeature &&
              selectedFeature.totalMask &&
              selectedFeature.totalMask}
          </p>
          <p>
            <b>Room Occupants Without A Mask: </b>
            {selectedFeature &&
              selectedFeature.totalWMask &&
              selectedFeature.totalWMask}
          </p>
          <p>
            <b>Total Occupants: </b>
            {total &&
              total &&
              total}
          </p>
          <p>
            <b>Estimated COVID-19 Risk: </b>
            {selectedFeature &&
              selectedFeature.cProb &&
              selectedFeature.cProb}
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
