// Normalizes values to readable strings before exporting
const normalizeValue = (value: unknown): string | number => {
  if (value === null || value === undefined) return ''
  if (value instanceof Date) return value.toISOString()
  if (typeof value === 'string') {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? value : date.toISOString()
  }
  return value as number | string
}

export const exportToXlsx = async (
  fileName: string,
  rows: Record<string, unknown>[],
  sheetName = 'Data'
): Promise<void> => {
  if (!rows || rows.length === 0) {
    throw new Error('Tidak ada data untuk diekspor')
  }

  const XLSX = await import('xlsx')

  // Ensure consistent column order by collecting all keys
  const columns = Array.from(
    rows.reduce<Set<string>>((set, row) => {
      Object.keys(row).forEach((key) => set.add(key))
      return set
    }, new Set<string>())
  )

  const normalizedRows = rows.map((row) => {
    const normalized: Record<string, string | number> = {}
    columns.forEach((key) => {
      normalized[key] = normalizeValue(row[key])
    })
    return normalized
  })

  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(normalizedRows, { header: columns })
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  const safeFileName = fileName.trim() === '' ? 'data' : fileName.trim()
  XLSX.writeFile(workbook, `${safeFileName}.xlsx`)
}
