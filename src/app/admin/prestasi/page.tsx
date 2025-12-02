
'use client'
import { getAchievements } from '@/src/actions/achievements'

import { useState } from 'react'
import PrestasiForm from '@/src/components/forms/PrestasiForm'

const Prestasi = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddPrestasi = (data: any) => {
    console.log('Adding prestasi:', data)
    // TODO: Implement API call to add prestasi
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Prestasi</h1>
          <p className="text-gray-600 mt-1">Kelola pencapaian dan penghargaan atlet panahan</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Tambah Prestasi
        </button>
      </div>

      <PrestasiForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddPrestasi}
      />

      {/* Placeholder for achievements list - will be populated from database */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full bg-gray-50 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada prestasi</h3>
          <p className="text-gray-500">Tambahkan prestasi pertama untuk memulai</p>
        </div>
      </div>
    </div>
  )
}

export default Prestasi