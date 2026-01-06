'use client'

import { useEffect, useRef, useState } from 'react'

export type CoachFormData = {
  full_name: string
  phone?: string
  id_academies?: number | null
  photoUrl?: string | null
  photoFile?: File | null
  photo?: string | null
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CoachFormData) => Promise<void> | void
  initialData?: CoachFormData
}

const CoachForm = ({ isOpen, onClose, onSubmit, initialData }: Props) => {
  const [formData, setFormData] = useState<CoachFormData>({
    full_name: '',
    phone: '',
    id_academies: null,
    photoUrl: null,
    photoFile: null,
  })
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [fileName, setFileName] = useState<string>('')

  useEffect(() => {
    if (isOpen) {
      setFormData({
        full_name: initialData?.full_name || '',
        phone: initialData?.phone || '',
        id_academies: initialData?.id_academies ?? null,
        photoUrl: initialData?.photoUrl || initialData?.photo || null,
        photoFile: null,
        photo: initialData?.photo || null,
      })
      setPreview(initialData?.photoUrl || initialData?.photo || null)
      setFileName('')
    }
  }, [initialData, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, photoFile: file }))
    setFileName(file?.name || '')
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    onClose()
  }

  const closePreview = () => setIsPreviewOpen(false)

  const formattedFileName = (() => {
    if (!fileName) return 'Belum ada file'
    const lastDot = fileName.lastIndexOf('.')
    const ext = lastDot !== -1 ? fileName.slice(lastDot) : ''
    const base = lastDot !== -1 ? fileName.slice(0, lastDot) : fileName
    if (base.length <= 20) return fileName
    const start = base.slice(0, 5)
    const end = base.slice(-5)
    return `${start}...${end}${ext}`
  })()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{initialData ? 'Edit Pelatih' : 'Tambah Pelatih'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl" aria-label="Tutup">×</button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
            <input
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto (PNG/JPG/WEBP)</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                ref={fileInputRef}
                onChange={handleFile}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 text-xs rounded-md border border-gray-300 bg-white hover:bg-gray-50"
              >
                Pilih Foto
              </button>
              <span className="text-xs text-gray-600 truncate max-w-[12rem]">{formattedFileName}</span>
            </div>
            <div
              className="mt-3 w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer relative group"
              onClick={() => (preview ? setIsPreviewOpen(true) : fileInputRef.current?.click())}
            >
              {preview ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-sm font-medium">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M12 5c-5 0-9 4-10 7 1 3 5 7 10 7s9-4 10-7c-1-3-5-7-10-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2.5A2.5 2.5 0 1 0 12 10a2.5 2.5 0 0 0 0 5Z"
                      />
                    </svg>
                  </div>
                </>
              ) : (
                <div className="text-gray-400 text-sm text-center px-2 leading-tight">Klik atau Drop Foto</div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-red-900 px-4 py-2 text-white hover:bg-red-800"
            >
              {initialData ? 'Update' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>

      {isPreviewOpen && preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative bg-white rounded-xl shadow-2xl p-4 max-w-3xl w-full mx-4">
            <button
              type="button"
              onClick={closePreview}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              aria-label="Tutup pratinjau"
            >
              ×
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
          </div>
        </div>
      )}
    </div>
  )
}

export default CoachForm
