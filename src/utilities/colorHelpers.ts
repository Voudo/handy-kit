// TODO: Add color contrast enum. - Chad
export enum ColorContrast {
  SmallText = 138,
  DefaultText = 154,
}

type RGBObject = {
  red: number
  green: number
  blue: number
}

const formatRegexes = {
  rgb: /(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)$/,
  hex: /^#?([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/,
}

const isHex = (color: string) => formatRegexes.hex.test(color)

const colorChannelToHex = (color: number) => `0${color.toString(16)}`.slice(-2)

const rgbObjectFromString = (rgbString: string): RGBObject => {
  const rgb = rgbString.replace(/[rgb()]/gi, '')
  const rgbParts = rgb.split(',')

  return {
    red: parseInt(rgbParts[0], 10),
    green: parseInt(rgbParts[1], 10),
    blue: parseInt(rgbParts[2], 10),
  }
}

export const fromRGBtoHex = (red: number, green: number, blue: number) => (
  [
    '#',
    colorChannelToHex(red),
    colorChannelToHex(green),
    colorChannelToHex(blue),
  ].join('')
)

export const fromHexToRGB = (hex: string) => {
  const red = parseInt(hex[1] + hex[2], 16)
  const green = parseInt(hex[3] + hex[4], 16)
  const blue = parseInt(hex[5] + hex[6], 16)

  return `${red}, ${green}, ${blue}`
}

export const maybeFromHexToRGB = (color: string) => (
  isHex(color)
    ? fromHexToRGB(color)
    : color
)

export const brightness = (rgb: RGBObject) => (
  (rgb.red * 299 + rgb.green * 587 + rgb.blue * 114) / 1000
)

export const fromRGBStringtoHex = (rgb: string) => {
  const rgbObject = rgbObjectFromString(rgb)

  return fromRGBtoHex(rgbObject.red, rgbObject.green, rgbObject.blue)
}

export const getContrastColor = (
  rgbString: string,
  brightnessThreshold: ColorContrast = ColorContrast.DefaultText,
  light = '255, 255, 255',
  dark = '0, 0, 0',
) => (
  brightness(rgbObjectFromString(rgbString)) < brightnessThreshold
    ? light
    : dark
)
