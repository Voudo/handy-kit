import sleep from '../../src/utilities/sleepHelper'
import { noOp } from '../../src/utilities/functionHelpers'

type PollOptions = {
  delay?: number
  currentAttempt?: number
  maximumAttempts?: number | null
}

type Handler = {
  check: (result: unknown, options: Required<PollOptions>) => unknown
  handle: (result: unknown, options: Required<PollOptions>) => unknown
  key?: string
}

const continueHandler = async (
  action: (options: Required<PollOptions>) => unknown,
  handlers = [] as Handler[],
  options = {} as Required<PollOptions>,
) => {
  await sleep(options.delay)

  // eslint-disable-next-line no-use-before-define
  return tryUntil(
    action,
    handlers,
    {
      ...options,
      currentAttempt: options.currentAttempt + 1,
    },
  )
}

const buildDefaultHandlers = (
  action: (options: Required<PollOptions>) => unknown,
  handlers = [] as Handler[],
): Handler[] => ([
  {
    key: 'maximum attempts',
    check: (_, options) => (
      options.maximumAttempts && options.maximumAttempts <= options.currentAttempt
    ),
    handle: () => ({}),
  },
  {
    key: 'continue',
    check: () => true,
    handle: (_, options) => continueHandler(action, handlers, options),
  },
])

const tryUntil = async (
  action: (options: Required<PollOptions>) => unknown,
  handlers = [] as Handler[],
  options = {} as PollOptions,
) => {
  const optionsWithDefaults: Required<PollOptions> = {
    delay: 500,
    currentAttempt: 1,
    ...options,
    maximumAttempts: options.maximumAttempts || null,
  }

  const handlersWithDefaults = [
    ...handlers,
    ...buildDefaultHandlers(action, handlers),
  ]

  const result = await action(optionsWithDefaults)

  const matchingHandler = handlersWithDefaults.find((handler) => handler.check(result, optionsWithDefaults))

  return matchingHandler?.handle(result, optionsWithDefaults)
}

export const waitUntil = async (
  handlers = [] as Handler[],
  options = {} as PollOptions,
) => tryUntil(noOp, handlers, options)

export default tryUntil
