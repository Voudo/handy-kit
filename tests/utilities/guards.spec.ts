import {
  allow, allowOrThrow, guard, guardWithThrow,
} from '../../src/utilities/guards'

describe('guards', () => {
  describe('guard', () => {
    it('should be false if there are no conditions', () => {
      const isGuarded = guard(undefined)

      expect(isGuarded).toBe(false)
    })
  })

  describe('guardWithThrow', () => {
    it('should throw an error when the condition is truthy', () => {
      expect(() => guardWithThrow(true)).toThrowError()
    })

    it('should throw a specific error when the a message is provided', () => {
      const expectedError = 'EXPECTED ERROR'

      expect(() => guardWithThrow(true, expectedError)).toThrowError(expectedError)
    })

    it('should return false when the condition is falsey', () => {
      const isGuarded = guardWithThrow(0)

      expect(isGuarded).toBe(false)
    })
  })

  describe('allow', () => {
    it('should be true when the condition is falsey', () => {
      const isGuarded = allow(0)

      expect(isGuarded).toBe(true)
    })
  })

  describe('allowOrThrow', () => {
    it('should throw an error when the condition is falsey', () => {
      expect(() => allowOrThrow(0)).toThrowError()
    })

    it('should throw a specific error when the a message is provided', () => {
      const expectedError = 'EXPECTED ERROR'

      expect(() => allowOrThrow(0, expectedError)).toThrowError(expectedError)
    })

    it('should return true when the condition is truthy', () => {
      const isAllowed = allowOrThrow(true)

      expect(isAllowed).toBe(true)
    })
  })
})
