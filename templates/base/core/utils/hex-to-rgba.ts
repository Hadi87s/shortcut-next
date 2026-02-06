/**
 ** Hex color to RGBA color
 */
export const hexToRGBA = (hexCode: string, opacity: number): string => {
  // Normalize and strip leading '#'
  let hex = String(hexCode).trim().replace(/^#/, '')

  // Expand shorthand: #RGB or #RGBA -> #RRGGBB or #RRGGBBAA
  if (hex.length === 3 || hex.length === 4) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('')
  }

  // Validate supported lengths
  if (hex.length !== 6 && hex.length !== 8) {
    throw new Error(`hexToRGBA: invalid hex "${hexCode}"`)
  }

  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const aFromHex = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1

  // Combine alpha from hex (if present) with provided opacity and clamp to [0,1]
  const a = Math.max(0, Math.min(1, aFromHex * opacity))

  return `rgba(${r}, ${g}, ${b}, ${+a.toFixed(3)})`
}
