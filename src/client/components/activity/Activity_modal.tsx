import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from "@elastic/eui"
import React from "react"
import Activity_form from "./Activity_form"

const Activity_modal = () => {
  const closeModal = () => {
    return
  }
  return (
    <EuiModal onClose={closeModal}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>Schedule New Activity</EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        <Activity_form />
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
