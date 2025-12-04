'use client'

import { useState, useEffect } from 'react'
import { getAcademies } from '../../actions/academies'

interface TestimoniFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: TestimoniData) => void
  initialData?: TestimoniData
}

interface TestimoniData {
  reviewer_name: string
  content: string
  rating: number
  id_academies: number
}

interface Academy {
  id_academies: number
  name: string
}

const TestimoniForm = ({ isOpen, onClose, onSubmit, initialData }: TestimoniFormProps) => {
  const [formData, setFormData] = useState<TestimoniData>(initialData || {
    reviewer_name: '',
    content: '',
    rating: 5,
    id_academies: 1
  })

  const [academies, setAcademies] = useState<Academy[]>([])

  useEffect(() => {
    const loadAcademies = async () => {
      try {
        const academyData = await getAcademies()
        setAcademies(academyData)
      } catch (error) {
        console.error('Error loading academies:', error)
      }
    }
    loadAcademies()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : name === 'id_academies' ? parseInt(value) : value
    }))
  }

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <div className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-red-900">
            {initialData ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Reviewer
            </label>
            <input
              type="text"
              name="reviewer_name"
              value={formData.reviewer_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              placeholder="Masukkan nama reviewer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Akademi
            </label>
            <select
              name="id_academies"
              value={formData.id_academies}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Pilih Akademi</option>
              {academies.map((academy) => (
                <option key={academy.id_academies} value={academy.id_academies}>
                  {academy.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex items-center gap-2 mb-2">
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <span className="text-lg">{renderStars(formData.rating)}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Isi Testimoni
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              placeholder="Masukkan isi testimoni atau ulasan"
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

export default TestimoniForm