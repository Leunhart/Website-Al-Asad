
'use client'
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '@/src/actions/achievements'

import { useState, useEffect } from 'react'
import PrestasiForm from '@/src/components/forms/PrestasiForm'

const Prestasi = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingData, setEditingData] = useState<any>(null)
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAchievements()
  }, [])

  const loadAchievements = async () => {
    try {
      const achievementData = await getAchievements()
      setAchievements(achievementData)
    } catch (error) {
      console.error('Error loading achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPrestasi = async (data: any): Promise<void> => {
    try {
      const achievementData = {
        event_name: `${data.event_name} - ${data.achievement_type}`,
        date: data.date,
        athlete_name: data.athlete_name
      }

      const result = await createAchievement(achievementData)
      if (result) {
        await loadAchievements() // Refresh the list
        console.log('Prestasi berhasil ditambahkan')
      } else {
        console.error('Error adding prestasi')
      }
    } catch (error) {
      console.error('Error adding prestasi:', error)
    }
  }

  const handleEditPrestasi = async (data: any) => {
    try {
      if (!editingData?.id_achievements) return

      const achievementData = {
        event_name: `${data.event_name} - ${data.achievement_type}`,
        date: data.date,
        athlete_name: data.athlete_name
      }

      const result = await updateAchievement(editingData.id_achievements, achievementData)
      if (result) {
        await loadAchievements() // Refresh the list
        console.log('Prestasi berhasil diperbarui')
      } else {
        console.error('Error updating prestasi')
      }
    } catch (error) {
      console.error('Error updating prestasi:', error)
    }
  }

  const handleDeletePrestasi = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus prestasi ini?')) return

    try {
      const success = await deleteAchievement(id)
      if (success) {
        await loadAchievements() // Refresh the list
        console.log('Prestasi berhasil dihapus')
      } else {
        console.error('Error deleting prestasi')
      }
    } catch (error) {
      console.error('Error deleting prestasi:', error)
    }
  }

  const openAddForm = () => {
    setEditingData(null)
    setIsFormOpen(true)
  }

  const openEditForm = (prestasiData: any) => {
    setEditingData(prestasiData)
    setIsFormOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Prestasi</h1>
          <p className="text-gray-600 mt-1">Kelola pencapaian dan penghargaan atlet panahan</p>
        </div>
        <button
          onClick={openAddForm}
          className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Tambah Prestasi
        </button>
      </div>

      <PrestasiForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={editingData ? handleEditPrestasi : handleAddPrestasi}
        initialData={editingData}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <p>Loading...</p>
          </div>
        ) : achievements.length > 0 ? achievements.map((achievement: any) => (
          <div key={achievement.id_achievements} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-slate-200 rounded-full p-2">
                  <span className="text-slate-600 text-xl">🏅</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{achievement.event_name}</h3>
                  <p className="text-gray-500 text-sm">
                    {achievement.date ? new Date(achievement.date).toLocaleDateString('id-ID') : 'Tanggal belum ditentukan'}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium border border-orange-200">
                  Prestasi
                </span>
                <span className="text-sm text-gray-500">ID: {achievement.id_achievements}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Atlet: {achievement.athlete_name || 'Nama atlet belum ditentukan'}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditForm({
                    event_name: achievement.event_name.split(' - ')[0] || achievement.event_name,
                    athlete_name: achievement.athlete_name || '',
                    date: achievement.date ? achievement.date.split('T')[0] : '',
                    achievement_type: achievement.event_name.split(' - ')[1] || 'Juara 1',
                    category: 'Individual',
                    description: ''
                  })}
                  className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePrestasi(achievement.id_achievements)}
                  className="flex-1 px-3 py-2 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full bg-gray-50 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada prestasi</h3>
            <p className="text-gray-500">Tambahkan prestasi pertama untuk memulai</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Prestasi