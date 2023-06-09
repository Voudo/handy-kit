import sleep from '../../src/utilities/sleepHelper'

describe('sleepHelper', () => {
  it('should wait until the time has passed before continuing', async () => {
    const duration = 100
    const durationMargin = 120

    const startTime = new Date()

    await sleep(duration)

    const endTime = new Date()

    const timePassed = (endTime.getSeconds() * 1000 + endTime.getMilliseconds()) - (startTime.getSeconds() * 1000 + startTime.getMilliseconds())

    expect(timePassed).toBeGreaterThanOrEqual(duration - durationMargin)
  })

  it('should return a result when finished if one is provided', async () => {
    const expectedResult = { boo: 'radley' }

    const result = await sleep(100, expectedResult)

    expect(result).toBe(expectedResult)
  })
})
