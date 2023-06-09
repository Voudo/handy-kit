import * as colorHelpers from '../../src/utilities/colorHelpers'

describe('colorHelpers', () => {
  describe('fromRGBToHex', () => {
    it('should return a hex string when passed rgb numbers', () => {
      const hex = colorHelpers.fromRGBtoHex(0, 0, 0)

      expect(hex).toBe('#000000')
    })
  })

  describe('fromRGBStringtoHex', () => {
    it('should return a hex string when passed an rgb string', () => {
      const hex = colorHelpers.fromRGBStringtoHex('rgb(0, 0, 0)')

      expect(hex).toBe('#000000')
    })
  })

  describe('fromHexToRGB', () => {
    it('should return a hex string when passed an rgb string', () => {
      const rgb = colorHelpers.fromHexToRGB('#000000')

      expect(rgb).toBe('0, 0, 0')
    })
  })

  describe('maybeFromHexToRGB', () => {
    it('return an rgb string when passed a hex string', () => {
      const rgb = colorHelpers.maybeFromHexToRGB('#000000')

      expect(rgb).toBe('0, 0, 0')
    })

    it('should return an rgb string when passed an rgb string', () => {
      const rgb = colorHelpers.maybeFromHexToRGB('0, 0, 0')

      expect(rgb).toBe('0, 0, 0')
    })
  })

  describe('getContrastColor', () => {
    const darkRGB = '0, 0, 0'
    const lightRGB = '255, 255, 255'

    it('should return the light color when the rgb is dark', () => {
      const foregroundColor = colorHelpers.getContrastColor(
        darkRGB,
        colorHelpers.ColorContrast.DefaultText,
        lightRGB,
        darkRGB,
      )

      expect(foregroundColor).toBe(lightRGB)
    })

    it('should return the dark color when the rgb is light', () => {
      const foregroundColor = colorHelpers.getContrastColor(
        lightRGB,
        colorHelpers.ColorContrast.DefaultText,
        lightRGB,
        darkRGB,
      )

      expect(foregroundColor).toBe(darkRGB)
    })
  })
})
