/**
 * Represents the state of data resource returned from the backend database
 */
export type Resource<T> = T & {
  _id: string
}
