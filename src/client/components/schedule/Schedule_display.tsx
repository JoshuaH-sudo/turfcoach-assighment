import {
  EuiBasicTableColumn,
  EuiButton,
  EuiInMemoryTable,
  EuiInMemoryTableProps,
  EuiTableActionsColumnType,
} from "@elastic/eui"
import React, { useEffect, useState } from "react"
import { Schedule_activity } from "../../../server/models/activity"
import { Resource } from "../../../common/types"
import use_api from "../../hooks/use_api"
import moment from "moment"
import { capitalize_first_letter } from "../../../common/utils"
import Activity_modal from "../activity/Activity_modal"

const Schedule_display = () => {
  const { get, remove } = use_api()
  const [activities, set_activities] = useState<Resource<Schedule_activity>[]>([])
  const [show_form_modal, set_show_form_modal] = useState(false)

  const actions: EuiTableActionsColumnType<Resource<Schedule_activity>> = {
    name: "Actions",
    actions: [
      {
        name: "Edit",
        description: "Edit this activity",
        type: "icon",
        icon: "pencil",
        onClick: () => {},
        "data-test-subj": "action-edit",
      },
      {
        name: "Delete",
        description: "Delete this activity",
        type: "icon",
        icon: "trash",
        onClick: (item) => {
          remove(`activity/${item._id}`)
        },
        "data-test-subj": "action-edit",
      },
    ],
  }

  const columns: EuiBasicTableColumn<Resource<Schedule_activity>>[] = [
    {
      name: "Date",
      field: "date",
      //Date would be saved a string and need to converted to a date object
      render: (date: string) => moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
    {
      name: "Activity",
      field: "type",
      render: (type: string) => capitalize_first_letter(type),
    },
    {
      name: "Task performer",
      field: "user",
      render: (user: string) => capitalize_first_letter(user),
    },
    {
      name: "Pitch",
      field: "pitch",
      render: (pitch: string) => capitalize_first_letter(pitch).replaceAll("_", " "),
    },
    actions,
  ]

  const sorting: EuiInMemoryTableProps<Schedule_activity>["sorting"] = {
    sort: {
      direction: "asc",
      field: "date",
    },
  }

  useEffect(() => {
    get_schedule()
  }, [])

  const get_schedule = async () => {
    const results = await get<Resource<Schedule_activity>[]>("activity")

    set_activities(results.data)
  }

  const close_modal = () => {
    set_show_form_modal(false)
  }

  const open_modal = () => {
    set_show_form_modal(true)
  }

  return (
    <>
      <EuiButton onClick={open_modal}>Schedule New Activity</EuiButton>

      <EuiInMemoryTable<Resource<Schedule_activity>>
        items={activities}
        columns={columns}
        pagination={true}
        sorting={sorting}
      />

      {show_form_modal && <Activity_modal close_modal={close_modal} />}
    </>
  )
}

export default Schedule_display
