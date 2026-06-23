export const getPreviewText = (text: string, maxLength = 110) => {
  if (text.length <= maxLength) {
    return text
  }

  const lastWhitespace = text.lastIndexOf(' ', maxLength)
  const cutoff = lastWhitespace > Math.floor(maxLength * 0.75) ? lastWhitespace : maxLength

  return `${text.slice(0, cutoff).trimEnd()}...`
}
