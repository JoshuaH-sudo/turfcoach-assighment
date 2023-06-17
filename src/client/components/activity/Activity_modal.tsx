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
import { Moment } from "moment"
import use_api from "../../hooks/use_api"

interface Activity_modal_props {
  close_modal: () => void
  edit_activity?: Resource<Schedule_activity>
  initial_date?: string
}

const Activity_modal: FC<Activity_modal_props> = ({
  close_modal,
  edit_activity,
  initial_date,
}) => {
  const edit_mode = !!edit_activity
  const submit_button_ref = useRef<HTMLButtonElement>()
  const { remove } = use_api()

  const on_confirm = () => {
    close_modal()
    submit_button_ref.current?.click()
  }

  const delete_activity = async (delete_id: string) => {
    await remove(`activity/${delete_id}`)
    close_modal()
  }

  const title = `${edit_mode ? "Edit" : "Schedule New"} Activity`
  return (
    <EuiModal onClose={close_modal}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>{title}</EuiModalHeaderTitle>
        {edit_activity && (
          <EuiButton
            onClick={() => delete_activity(edit_activity._id)}
            color="danger"
          >
            Delete
          </EuiButton>
        )}
      </EuiModalHeader>

      <EuiModalBody>
        <Activity_form
          edit_activity={edit_activity}
          initial_date={initial_date}
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
