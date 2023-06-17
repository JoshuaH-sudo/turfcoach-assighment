import React, { useEffect, useState } from "react"
import { Schedule_activity } from "../../../server/models/activity"
import { Resource } from "../../../common/types"
import use_api from "../../hooks/use_api"
import Activity_modal from "../activity/Activity_modal"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

const Schedule_display = () => {
  const { get, remove } = use_api()
  const [activities, set_activities] = useState<Resource<Schedule_activity>[]>([])
  const [show_form_modal, set_show_form_modal] = useState(false)
  const [edit_activity, set_edit_activity] = useState<Resource<Schedule_activity>>()

  // const actions: EuiTableActionsColumnType<Resource<Schedule_activity>> = {
  //   name: "Actions",
  //   actions: [
  //     {
  //       name: "Edit",
  //       description: "Edit this activity",
  //       type: "icon",
  //       icon: "pencil",
  //       onClick: (item) => {
  //         set_show_form_modal(true)
  //         set_edit_activity(item)
  //       },
  //       "data-test-subj": "action-edit",
  //     },
  //     {
  //       name: "Delete",
  //       description: "Delete this activity",
  //       type: "icon",
  //       icon: "trash",
  //       color: "danger",
  //       onClick: async (item) => {
  //         await remove(`activity/${item._id}`)
  //         await get_activities()
  //       },
  //       "data-test-subj": "action-delete",
  //     },
  //   ],
  // }

  useEffect(() => {
    get_activities()
  }, [])

  const get_activities = async () => {
    const results = await get<Resource<Schedule_activity>[]>("activity")

    set_activities(results.data)
  }

  const close_modal = async () => {
    if (edit_activity) {
      set_edit_activity(undefined)
    }
    set_show_form_modal(false)
    await get_activities()
  }

  const open_modal = () => {
    set_show_form_modal(true)
  }

  const calendar_events = activities.map((activity) => {
    const event = {
      title: activity.type,
      date: activity.date,
    }
    return event
  })
  return (
    <>
      <FullCalendar
        height={"100%"}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendar_events}
      />

      {show_form_modal && (
        <Activity_modal edit_activity={edit_activity} close_modal={close_modal} />
      )}
    </>
  )
}

export default Schedule_display
