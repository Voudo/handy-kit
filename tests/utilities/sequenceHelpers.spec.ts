import {
  checkRule, checkUntil, checkUntilAsync, done, next,
} from '../../src/utilities/sequenceHelpers'
import sleep from '../../src/utilities/sleepHelper'

describe('sequenceHelpers', () => {
  describe('next', () => {
    it('should return null', () => {
      const result = next()

      expect(result).toBe(null)
    })
  })

  describe('done', () => {
    it('should return the provided value', () => {
      const providedValue = 'Sergei Rachmaninoff'

      const result = done(providedValue)

      expect(result).toBe(providedValue)
    })
  })

  describe('ruleCheck', () => {
    it('should return null if the check is null', () => {
      const returnNull = () => null

      const result = checkRule(returnNull)

      expect(result).toBe(null)
    })

    it('should return the result of a rule check', () => {
      const rule = () => 'Bob\'s Burgers'

      const result = checkRule(rule)

      expect(result).toBe('Bob\'s Burgers')
    })
  })

  describe('checkUntil', () => {
    it('should check rules until a rule returns a value', () => {
      const rules = [
        () => next(),
        () => done('finito'),
        () => done('mustache'),
      ]

      const result = checkUntil(rules)

      expect(result).toBe('finito')
    })

    it('should return null if no rule returns a value', () => {
      const rules = [
        () => next(),
        () => next(),
        () => next(),
      ]

      const result = checkUntil(rules)

      expect(result).toBe(null)
    })
  })

  describe('checkUntilAsync', () => {
    it('should check rules until a rule returns a value', async () => {
      const rules = [
        async () => sleep(120, next()),
        async () => (
          await sleep(120, false)
            ? next()
            : done('finito')
        ),
        async () => next(),
        async () => done('unreachable'),
      ]

      const result = await checkUntilAsync(rules)

      expect(result).toBe('finito')
    })

    it('should return null if no rule returns a value', async () => {
      const rules = [
        async () => sleep(120, next()),
        async () => (
          await sleep(120, true)
            ? next()
            : done('finito')
        ),
        async () => next(),
      ]

      const result = await checkUntilAsync(rules)

      expect(result).toBe(null)
    })
  })
})
