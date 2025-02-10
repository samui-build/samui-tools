export function isDataBinary(data: string | Uint8Array, chunkSize = 512) {
  const sample = data.slice(0, chunkSize)

  if (typeof sample === 'string') {
    return false
  }

  for (let i = 0; i < sample.length; i++) {
    // Null byte -> binary
    if (sample[i] === 0) {
      return true
    }
    // Non-printable, except common control chars
    if (sample[i] < 32 && ![9, 10, 13].includes(sample[i])) {
      return true
    }
  }

  // Otherwise, we assume its text
  return false
}
