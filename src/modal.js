import React, { useState } from 'react';
import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiFlexItem,
  EuiFlexGrid,
  EuiIcon,
  EuiTitle,
  EuiStat

} from '@elastic/eui';

import clock from './clock.svg'



const ModalExample = ({ modal, toggle, selectedFeature }) => {

  let modalBox;
  let total = selectedFeature.totalMask+selectedFeature.totalWMask;

  if (modal) {
    modalBox =
      <EuiModal onClose={toggle}>
      <EuiModalHeader>
        <EuiModalHeaderTitle style={{margin:"auto"}}>{selectedFeature.roomNumber}</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <div style={{margin:"auto"}}>
        <EuiFlexGrid columns={2}>
      <EuiFlexItem>
        <div>
          <EuiStat title={selectedFeature.totalMask} textAlign="center" description="Occupants Wearing Masks" reverse descriptionElement="h3" titleColor ="secondary"></EuiStat>
        </div>
      </EuiFlexItem>
      <EuiFlexItem>
        <div>
        <EuiStat title={selectedFeature.totalWMask} textAlign="center" description="Occupants Without Masks" reverse descriptionElement="h3" titleColor="danger"></EuiStat>
        </div>
      </EuiFlexItem>
      <EuiFlexItem>
        <div>
        <EuiStat title={`${parseFloat(selectedFeature.timeCurr).toFixed(3)}`} textAlign="center" description="Hours Since Last Cleaned" reverse descriptionElement="h3" titleColor ="secondary"></EuiStat>
        </div>
      </EuiFlexItem>
      <EuiFlexItem>
        <div>
        <EuiStat title={`% ${(selectedFeature.cProb*100).toFixed(3)}`} textAlign="center" description="COVID-19 Risk" reverse descriptionElement="h3" titleColor="danger"></EuiStat>
        </div>
      </EuiFlexItem>
      </EuiFlexGrid>
        </div>
        
      </EuiModalBody>
      <EuiModalFooter>
        <EuiButton onClick={toggle} fill>
          Close
        </EuiButton>
      </EuiModalFooter>
      </EuiModal>
  }

  return (
    <>
    {modalBox}
    </>
  );
};

export default ModalExample;
