import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from "@elastic/eui"
import React from "react"

const Activity_modal = () => {
  const closeModal = () => {
    return
  }
  return (
    <EuiModal onClose={closeModal}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>Add Activity</EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        
      </EuiModalBody>

      <EuiModalFooter>
        <EuiButton onClick={closeModal} fill>
          Close
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  )
}

export default Activity_modal
