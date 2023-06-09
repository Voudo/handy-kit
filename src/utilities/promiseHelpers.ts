import { FunctionBoolean } from "../types/Functions.types"

const isTruthy = (value: any) => value === true

const continueIfConditionIsTrue = (condition: FunctionBoolean) => (promise: Promise<any>, item: FunctionBoolean) => (
  promise.then((response) => (
    condition(response)
      ? item(response)
      : response
  ))
)

export const promiseSerial = (
  items: any[],
  condition = isTruthy,
  initialValue = true as any,
) => (
  items.reduce(
    continueIfConditionIsTrue(condition),
    Promise.resolve(initialValue),
  )
)
