import {
  EuiDatePicker,
  EuiForm,
  EuiFormRow,
  EuiSelect,
  EuiSelectOption,
} from "@elastic/eui"
import moment, { Moment } from "moment"
import React, { useState } from "react"

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

const Activity_form = () => {
  const [activity_schedule_data, set_activity_schedule_data] =
    useState<Schedule_activity>({
      activity: "mowing",
      date: moment(),
      user: "john",
      pitch: "pitch_1",
    })
  // Select Activity
  // Time and Date
  // Task performer
  // Select Pitch
  // Can edit
  // can delete

  const on_activity_select = () => {}
  const on_date_select = () => {}
  const on_pitch_select = () => {}
  const on_user_select = () => {}

  const { activity, date, user, pitch } = activity_schedule_data
  return (
    <EuiForm>
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
    </EuiForm>
  )
}

export default Activity_form
