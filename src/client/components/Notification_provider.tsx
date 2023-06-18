import { EuiGlobalToastList } from "@elastic/eui"
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list"
import { v4 } from "uuid"
import React, { FC, ReactNode, createContext, useState } from "react"

interface Notification_provider_props {
  children: ReactNode
}

/**
 * Wrapper component that will provide handlers to create toasts to its children.
 */
const Notification_provider: FC<Notification_provider_props> = ({ children }) => {
  const [toasts, set_toasts] = useState<Toast[]>([])

  const dismiss_toast = (remove_toast: Toast) => {
    set_toasts(toasts.filter((toast) => toast.id !== remove_toast.id))
  }

  const create_success_toast = (title: string = "", text: string = "") => {
    const new_toast: Toast = {
      id: v4(),
      title,
      text,
      color: "success",
    }

    set_toasts(toasts.concat(new_toast))
  }

  const create_error_toast = (title: string = "", text: string = "") => {
    const new_toast: Toast = {
      id: v4(),
      title,
      text,
      color: "danger",
    }

    set_toasts(toasts.concat(new_toast))
  }

  return (
    <>
      <Notification_context.Provider
        value={{ create_success_toast, create_error_toast }}
      >
        {children}
      </Notification_context.Provider>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={dismiss_toast}
        toastLifeTimeMs={6000}
      />
    </>
  )
}

interface Notification_context_props {
  create_success_toast: (title: string, text?: string) => void
  create_error_toast: (title: string, text?: string) => void
}

export const Notification_context = createContext<Notification_context_props>(
  // Using type assertion as the methods will be set when the wrapper component is used.
  {} as Notification_context_props
)

export default Notification_provider
