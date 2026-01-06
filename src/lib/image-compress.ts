// Compress image in browser to stay under size budget.
export async function compressImage(
  file: File,
  options: {
    maxSizeBytes?: number
    quality?: number
    outputType?: 'image/webp' | 'image/jpeg' | 'image/png'
    maxDimension?: number
  } = {}
): Promise<File> {
  const {
    maxSizeBytes = 5 * 1024 * 1024,
    quality = 0.8,
    outputType = 'image/webp',
    maxDimension = 1600,
  } = options

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
  const targetWidth = Math.max(1, Math.round(bitmap.width * scale))
  const targetHeight = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas unsupported')
  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight)

  const attempt = async (q?: number) => new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error('Gagal kompres gambar'))
      resolve(blob)
    }, outputType, q)
  })

  let blob: Blob
  if (outputType === 'image/png') {
    // PNG ignores quality; rely on downscale
    blob = await attempt()
  } else {
    blob = await attempt(quality)
    if (blob.size > maxSizeBytes) {
      blob = await attempt(Math.max(0.5, quality - 0.2))
    }
    if (blob.size > maxSizeBytes) {
      blob = await attempt(Math.max(0.3, quality - 0.4))
    }
  }

  if (blob.size > maxSizeBytes) {
    throw new Error('File masih lebih besar dari 5MB setelah kompresi. Kurangi resolusi atau kualitas.')
  }

  const ext = outputType === 'image/webp' ? '.webp' : outputType === 'image/png' ? '.png' : '.jpg'
  return new File([blob], file.name.replace(/\.[^.]+$/, '') + ext, { type: outputType })
}
