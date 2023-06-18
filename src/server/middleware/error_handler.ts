import { NextFunction, Request, Response } from "express"

import debug from "debug"
const errorLog = debug("app:weather_controller:error")

/**
 * Generic error middleware handler that ensures any errors are returned to the client in the correct format.
 */
const error_handler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorLog("Request Failure")
  errorLog(err.message)

  res.status(500).send({ message: "Internal error, check server output" })
}

export default error_handler
