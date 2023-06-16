import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from "@elastic/eui"
import React, { FC, useRef } from "react"
import Activity_form from "./Activity_form"
import { Schedule_activity } from "../../../server/models/activity"

interface Activity_modal_props {
  close_modal: () => void
  edit_schedule_activity?: Schedule_activity
}

const Activity_modal: FC<Activity_modal_props> = ({
  close_modal,
  edit_schedule_activity,
}) => {
  const submit_button_ref = useRef<HTMLButtonElement>()

  const on_confirm = () => {
    close_modal()
    submit_button_ref.current?.click()
  }
  return (
    <EuiModal onClose={close_modal}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>Schedule New Activity</EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        <Activity_form
          edit_schedule_activity={edit_schedule_activity}
          submit_button_ref={submit_button_ref}
        />
      </EuiModalBody>

      <EuiModalFooter>
        <EuiButton onClick={close_modal} fill>
          Cancel
        </EuiButton>
        <EuiButton onClick={on_confirm} fill>
          Add
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  )
}

export default Activity_modal
