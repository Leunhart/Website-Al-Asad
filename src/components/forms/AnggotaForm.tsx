'use client'

import { useState, useEffect } from 'react'

interface AnggotaFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: AnggotaData) => Promise<void> | void
  initialData?: AnggotaData
}

interface AnggotaData {
  full_name: string
  phone: string
  email: string
  role: 'admin' | 'coach'
  password?: string
}

const AnggotaForm = ({ isOpen, onClose, onSubmit, initialData }: AnggotaFormProps) => {
  const [formData, setFormData] = useState<AnggotaData>({
    full_name: '',
    phone: '',
    email: '',
    role: 'admin',
    password: ''
  })

  // --- PERBAIKAN DI SINI ---
  // Gunakan useEffect untuk sinkronisasi state ketika initialData atau isOpen berubah
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Mode Edit: Isi form dengan data yang dikirim
        setFormData({
          full_name: initialData.full_name || '',
          phone: initialData.phone || '',
          email: initialData.email || '',
          role: initialData.role || 'admin',
          password: '' // Password dikosongkan untuk keamanan & input baru
        })
      } else {
        // Mode Tambah: Reset form menjadi kosong
        setFormData({
          full_name: '',
          phone: '',
          email: '',
          role: 'admin',
          password: ''
        })
      }
    }
  }, [initialData, isOpen]) 
  // -------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit(formData)
      // Reset logic sudah ditangani oleh useEffect, jadi tidak perlu reset manual di sini
      onClose()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // Jika tidak open, return null agar tidak merender apapun (opsional, tapi lebih bersih daripada class hidden)
  // Tapi karena Anda pakai animasi/class hidden, kita biarkan return JSX seperti semula.
  
  return (
    <div className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-red-900">
            {initialData ? 'Edit Anggota' : 'Tambah Anggota Baru'}
          </h2>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telepon
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="admin">Admin</option>
              <option value="coach">Coach</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password {initialData && <span className="text-xs text-gray-500 font-normal">(Kosongkan jika tidak ingin mengubah)</span>}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={initialData ? "******" : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              {...(!initialData && { required: true })} // Password wajib hanya saat tambah baru
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-red-900 rounded-lg hover:bg-red-800 transition"
            >
              {initialData ? 'Update' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AnggotaForm