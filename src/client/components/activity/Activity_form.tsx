import {
  EuiDatePicker,
  EuiForm,
  EuiFormRow,
  EuiSelect,
  EuiSelectOption,
} from "@elastic/eui"
import moment, { Moment } from "moment"
import React, { ChangeEventHandler, FC, FormEventHandler, LegacyRef, useState } from "react"

export interface Schedule_activity {
  activity: string
  date: Moment
  user: string
  pitch: string
}

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

const new_schedule_activity = {
  activity: "mowing",
  date: moment(),
  user: "john",
  pitch: "pitch_1",
}

interface Activity_form_props {
  edit_schedule_activity?: Schedule_activity

  /**
   * A reference to the parent modal submit button, to trigger the on submit event of the form.
   */
  submit_button_ref: React.MutableRefObject<HTMLButtonElement | undefined>
}
const Activity_form: FC<Activity_form_props> = ({
  edit_schedule_activity,
  submit_button_ref,
}) => {
  const edit_mode = !!edit_schedule_activity

  const [activity_schedule_data, set_activity_schedule_data] =
    useState<Schedule_activity>(edit_schedule_activity ?? new_schedule_activity)

  const on_activity_select: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const activity = event.target.value
    set_activity_schedule_data((prev_state) => {
      return { ...prev_state, activity }
    })
  }

  const on_date_select = (date: Moment) => {
    set_activity_schedule_data((prev_state) => {
      return { ...prev_state, date }
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

  const on_submit:FormEventHandler = (event) => {
    event.preventDefault();
    alert(JSON.stringify(activity_schedule_data))
  }

  const { activity, date, user, pitch } = activity_schedule_data
  return (
    <EuiForm component="form" onSubmit={on_submit}>
      <EuiFormRow>
        <EuiSelect
          options={activity_options}
          value={activity}
          onChange={on_activity_select}
        />
      </EuiFormRow>

      <EuiFormRow>
        <EuiDatePicker showTimeSelect selected={date} onChange={on_date_select} />
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
