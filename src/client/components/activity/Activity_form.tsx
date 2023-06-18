import {
  EuiDatePicker,
  EuiForm,
  EuiFormRow,
  EuiSelect,
  EuiSelectOption,
} from "@elastic/eui"
import moment, { Moment } from "moment"
import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  LegacyRef,
  useContext,
  useEffect,
  useState,
} from "react"
import { Schedule_activity } from "../../../server/models/activity"
import use_api from "../../hooks/use_api"
import { Resource } from "../../../common/types"
import { Notification_context } from "../Notification_provider"

const pitch_options: EuiSelectOption[] = [
  {
    value: "pitch_1",
    text: "Pitch 1",
  },
  {
    value: "pitch_2",
    text: "Pitch 2",
  },
  {
    value: "pitch_3",
    text: "Pitch 3",
  },
]

const activity_options: EuiSelectOption[] = [
  {
    value: "mowing",
    text: "Mowing",
  },
  {
    value: "fertilisation",
    text: "Fertilisation",
  },
  {
    value: "irrigation",
    text: "Irrigation",
  },
  {
    value: "aeration",
    text: "Aeration",
  },
]

const user_options: EuiSelectOption[] = [
  {
    value: "john",
    text: "John",
  },
  {
    value: "tom",
    text: "Tom",
  },
  {
    value: "tony",
    text: "Tony",
  },
]

const new_schedule_activity: Schedule_activity = {
  type: "mowing",
  date: moment().toString(),
  user: "john",
  pitch: "pitch_1",
}

interface Activity_form_props {
  /**
   * If defined, it will put the form in edit mode
   */
  edit_activity?: Resource<Schedule_activity>
  /**
   * Initial date to prefill the form with
   */
  initial_date?: string
  /**
   * A reference to the parent modal submit button, to trigger the on submit event of the form.
   */
  submit_button_ref: React.MutableRefObject<HTMLButtonElement | undefined>
  /**
   * Close the parent modal
   */
  close_modal: () => void
}

/**
 * The activity form to schedule new activities or edit existing ones.
 */
const Activity_form: FC<Activity_form_props> = ({
  edit_activity,
  initial_date,
  submit_button_ref,
  close_modal,
}) => {
  const { create, edit } = use_api()
  const { create_success_toast, create_error_toast } =
    useContext(Notification_context)

  const [activity_data, set_activity_schedule_data] = useState<Schedule_activity>(
    edit_activity ?? new_schedule_activity
  )

  useEffect(() => {
    if (initial_date) {
      set_activity_schedule_data({ ...activity_data, date: initial_date })
    }
  }, [initial_date])

  const on_activity_select: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const type = event.target.value

    set_activity_schedule_data((prev_state) => {
      return { ...prev_state, type }
    })
  }

  const on_date_select = (date: Moment) => {
    set_activity_schedule_data((prev_state) => {
      return { ...prev_state, date: date.toString() }
    })
  }

  const on_pitch_select: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const pitch = event.target.value

    set_activity_schedule_data((prev_state) => {
      return { ...prev_state, pitch }
    })
  }

  const on_user_select: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const user = event.target.value

    set_activity_schedule_data((prev_state) => {
      return { ...prev_state, user }
    })
  }

  const edit_mode = !!edit_activity
  const on_submit: FormEventHandler = async (event) => {
    event.preventDefault()

    if (edit_mode) {
      await request_edit_activity(edit_activity._id)
    } else {
      await request_create_activity()
    }
    close_modal()
  }

  const request_edit_activity = async (edit_id: string) => {
    try {
      await edit(`activity/${edit_id}`, {
        data: activity_data,
      })
      create_success_toast("Activity Edited")
    } catch (error) {
      create_error_toast("Failed To Edit Activity", error as string)
    }
  }

  const request_create_activity = async () => {
    try {
      await create("activity", { data: activity_data })
      create_success_toast("Activity Scheduled")
    } catch (error) {
      create_error_toast("Failed To Schedule Activity", error as string)
    }
  }

  const { type, date, user, pitch } = activity_data
  return (
    <EuiForm component="form" onSubmit={on_submit}>
      <EuiFormRow>
        <EuiSelect
          options={activity_options}
          value={type}
          onChange={on_activity_select}
        />
      </EuiFormRow>

      <EuiFormRow>
        <EuiDatePicker
          showTimeSelect
          selected={moment(date)}
          onChange={on_date_select}
        />
      </EuiFormRow>

      <EuiFormRow>
        <EuiSelect options={user_options} value={user} onChange={on_user_select} />
      </EuiFormRow>

      <EuiFormRow>
        <EuiSelect
          options={pitch_options}
          value={pitch}
          onChange={on_pitch_select}
        />
      </EuiFormRow>

      <button
        type="submit"
        hidden={true}
        // Type error occurs but ref will work correctly.
        ref={submit_button_ref as LegacyRef<HTMLButtonElement>}
      />
    </EuiForm>
  )
}

export default Activity_form
