import {
  EuiBasicTableColumn,
  EuiInMemoryTable,
  EuiInMemoryTableProps,
} from "@elastic/eui"
import React, { useEffect, useState } from "react"
import { Schedule_activity } from "../../../server/models/activity"
import { Resource } from "../../../common/types"
import use_api from "../../hooks/use_api"
import moment, { Moment } from "moment"
import { capitalize_first_letter } from "../../../common/utils"

const Schedule_display = () => {
  const { get } = use_api()
  const [activities, set_activities] = useState<Resource<Schedule_activity>[]>([])

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
    const results = await get<Resource<Schedule_activity>[]>("schedule")

    set_activities(results.data)
  }

  return (
    <EuiInMemoryTable<Resource<Schedule_activity>>
      items={activities}
      columns={columns}
      pagination={true}
      sorting={sorting}
    />
  )
}

export default Schedule_display
