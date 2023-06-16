import { NextFunction, Request, Response } from "express"

import debug from "debug"
const errorLog = debug("app:weather_controller:error")

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
