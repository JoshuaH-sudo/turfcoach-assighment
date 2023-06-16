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
import { Resource } from "../../../common/types"

interface Activity_modal_props {
  close_modal: () => void
  edit_activity?: Resource<Schedule_activity>
}

const Activity_modal: FC<Activity_modal_props> = ({
  close_modal,
  edit_activity,
}) => {
  const edit_mode = !!edit_activity
  const submit_button_ref = useRef<HTMLButtonElement>()

  const on_confirm = () => {
    close_modal()
    submit_button_ref.current?.click()
  }

  const title = `${edit_mode ? "Edit" : "Schedule New"} Activity`
  return (
    <EuiModal onClose={close_modal}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>{title}</EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        <Activity_form
          edit_activity={edit_activity}
          submit_button_ref={submit_button_ref}
          close_modal={close_modal}
        />
      </EuiModalBody>

      <EuiModalFooter>
        <EuiButton onClick={close_modal} fill>
          Cancel
        </EuiButton>
        <EuiButton onClick={on_confirm} fill>
          {edit_mode ? "Edit" : "Add"}
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  )
}

export default Activity_modal
