import { promiseSerial } from '../../src/utilities/promiseHelpers'

describe('promiseSerial', () => {
  it('should complete all promises in sequential order', async () => {
    const promiseCalls: string[] = []
    const promiseFunctions = [
      () => new Promise((resolve) => {
        setTimeout(() => {
          promiseCalls.push('1')
          resolve(true)
        }, 4)
      }),
      () => new Promise((resolve) => {
        setTimeout(() => {
          promiseCalls.push('2')
          resolve(true)
        }, 3)
      }),
      () => new Promise((resolve) => {
        setTimeout(() => {
          promiseCalls.push('3')
          resolve(true)
        }, 2)
      }),
      () => new Promise((resolve) => {
        setTimeout(() => {
          promiseCalls.push('4')
          resolve(true)
        }, 1)
      }),
    ]

    await promiseSerial(promiseFunctions)
    expect(promiseCalls).toEqual(['1', '2', '3', '4'])
  })

  it('should NOT run any promises after any promise resolves to falsey', async () => {
    const promiseCalls: string[] = []
    const promiseFunctions = [
      () => new Promise((resolve) => {
        setTimeout(() => {
          promiseCalls.push('1')
          resolve(true)
        }, 4)
      }),
      () => new Promise((resolve) => {
        setTimeout(() => {
          promiseCalls.push('2')
          resolve(false)
        }, 3)
      }),
      () => new Promise((resolve) => {
        setTimeout(() => {
          promiseCalls.push('3')
          resolve(true)
        }, 2)
      }),
    ]

    await promiseSerial(promiseFunctions)
    expect(promiseCalls).toEqual(['1', '2'])
  })

  it('should NOT run any promises after any promise resolves to truthy', async () => {
    const expectedResult = 'success'

    const promiseFunctions = [
      () => new Promise((resolve) => {
        setTimeout(() => {
          resolve(expectedResult)
        }, 4)
      }),
      () => new Promise((resolve) => {
        setTimeout(() => {
          resolve(false)
        }, 3)
      }),
      () => new Promise((resolve) => {
        setTimeout(() => {
          resolve('book')
        }, 2)
      }),
    ]

    const result = await promiseSerial(promiseFunctions)

    expect(result).toBe(expectedResult)
  })

  it('should NOT run any promises after a custom condition returns false', async () => {
    const expectedResult = 3

    const conditionIsEven = (value: any) => value % 2 === 0

    const promiseFunctions = [
      () => new Promise((resolve) => {
        setTimeout(() => {
          resolve(2)
        }, 4)
      }),
      () => new Promise((resolve) => {
        setTimeout(() => {
          resolve(4)
        }, 3)
      }),
      () => new Promise((resolve) => {
        setTimeout(() => {
          resolve(expectedResult)
        }, 2)
      }),
      () => new Promise((resolve) => {
        setTimeout(() => {
          resolve(8)
        }, 2)
      }),
    ]

    const result = await promiseSerial(promiseFunctions, conditionIsEven, 2)

    expect(result).toBe(expectedResult)
  })
})
