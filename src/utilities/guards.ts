export const guard = (condition: unknown): boolean => !!condition

export const guardWithThrow = (condition: unknown, message = ''): boolean => {
  if (condition) {
    throw message || 'Error on condition.'
  }

  return false
}

export const allow = (condition: unknown): boolean => !condition

export const allowOrThrow = (condition: unknown, message = ''): boolean => {
  if (!condition) {
    throw message || 'Error on condition.'
  }

  return true
}
