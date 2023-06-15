import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

/**
 * This abstracts the api calls and ensures error messages are handled correctly
 * @returns An object containing the request methods
 */
const use_api = () => {
  //This will handle any axios errors and pass the error message to the caller
  const error_wrapper = async <T,>(response: Promise<AxiosResponse<T>>) => {
    try {
      return await response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const error_message =
          error.response?.data.message ?? "Request Failed"
        throw error_message
      } else {
        throw error
      }
    }
  }

  const get = async <T,>(url: string, config: AxiosRequestConfig = {}) => {
    const base = window.location.toString()
    console.debug(base);
    console.debug(window.location);
    const request_url = base + url
    return await error_wrapper<T>(axios.get(request_url, config))
  }

  return { get }
}

export default use_api
