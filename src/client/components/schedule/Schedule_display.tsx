import React, { useEffect, useState } from "react"
import { Schedule_activity } from "../../../server/models/activity"
import { Resource } from "../../../common/types"
import use_api from "../../hooks/use_api"
import Activity_modal from "../activity/Activity_modal"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"

import { capitalize } from "../../../common/utils"
import moment from "moment"

interface Form_settings {
  show: boolean
  edit_activity?: Resource<Schedule_activity>
  initial_date?: string
}

/**
 * Displays the schedule calendar, where you can view, add or edit activities.
 */
const Schedule_display = () => {
  const [activities, set_activities] = useState<Resource<Schedule_activity>[]>([])
  const [form_settings, set_form_settings] = useState<Form_settings>({
    show: false,
  })
  const { get, remove } = use_api()

  useEffect(() => {
    get_activities()
  }, [])

  const get_activities = async () => {
    const results = await get<Resource<Schedule_activity>[]>("activity")

    set_activities(results.data)
  }

  const edit_scheduled_activity = (search_id: string) => {
    const found_activity = activities.find((activity) => activity._id === search_id)

    if (!found_activity)
      throw "Could not find activity to edit with provided search id"

    open_modal({
      show: true,
      edit_activity: found_activity,
      initial_date: undefined,
    })
  }

  const delete_scheduled_activity = async (delete_id: string) => {
    await remove(`activity/${delete_id}`)
    await get_activities()
  }

  const close_modal = async () => {
    //Need to reset all states to ensure consistency between modal calls
    set_form_settings({
      show: false,
      edit_activity: undefined,
      initial_date: undefined,
    })
    await get_activities()
  }

  const open_modal = (config: Form_settings) => {
    set_form_settings({ ...config })
  }

  const calendar_events = activities.map((activity) => {
    const { _id, user, type, date, pitch } = activity

    const title = `${capitalize(user)} ${capitalize(type)} ${capitalize(
      pitch
    ).replaceAll("_", " ")}`

    const event = {
      id: _id,
      title,
      display: "block",
      date,
    }
    return event
  })

  return (
    <>
      <FullCalendar
        height={"100%"}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,prev,next",
        }}
        events={calendar_events}
        dateClick={({ dateStr }) => {
          //DateStr format is shown in docs https://fullcalendar.io/docs/dateClick
          open_modal({
            show: true,
            edit_activity: undefined,
            initial_date: moment(dateStr, "YYYY-MM-DD").toString(),
          })
        }}
        //FullCalendar does seem to export its types, so need to define props inline to get autocompletion.
        eventClick={({ event, jsEvent }) => {
          jsEvent.preventDefault()
          //Delete a event by clicking while holding the shift key
          if (jsEvent.shiftKey) {
            delete_scheduled_activity(event.id)
            return
          }

          edit_scheduled_activity(event.id)
        }}
      />

      {form_settings.show && (
        <Activity_modal
          edit_activity={form_settings.edit_activity}
          initial_date={form_settings.initial_date}
          close_modal={close_modal}
        />
      )}
    </>
  )
}

export default Schedule_display
