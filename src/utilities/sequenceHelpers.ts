import { promiseSerial } from '../../src/utilities/promiseHelpers'

export const next = () => null
export const done = (value: any) => value

export type SequenceRule = (...args: any) => any

export const checkRule = (rule: SequenceRule) => {
  const ruleCheck = rule()

  return ruleCheck === null
    ? null
    : ruleCheck
}

const checkRuleOrContinue = (result: any, rule: SequenceRule) => (
  result === null
    ? checkRule(rule)
    : result
)

export const checkUntil = (items: SequenceRule[]) => items.reduce(checkRuleOrContinue, null)

export const checkUntilAsync = (items: SequenceRule[]) => (
  promiseSerial(
    items,
    (value: any) => value === next(),
    next(),
  )
)
