export async function compressProfileImage(file: File, type: 'avatar' | 'banner'): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Choose an image file.')
  if (file.size > 15 * 1024 * 1024) throw new Error('Image files must be smaller than 15 MB.')

  const image = await createImageBitmap(file)
  const maxWidth = type === 'avatar' ? 400 : 1200
  const maxHeight = type === 'avatar' ? 400 : 420
  let scale = Math.min(1, maxWidth / image.width, maxHeight / image.height)
  let compressed = ''

  try {
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(image.width * scale))
      canvas.height = Math.max(1, Math.round(image.height * scale))
      const context = canvas.getContext('2d')
      if (!context) throw new Error('Unable to process this image.')
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      compressed = canvas.toDataURL('image/jpeg', 0.78)
      if (compressed.length <= 350_000) break
      scale *= 0.75
    }
  } finally {
    image.close()
  }

  if (compressed.length > 350_000) throw new Error('Image could not be compressed enough. Choose a smaller image.')
  return compressed
}
