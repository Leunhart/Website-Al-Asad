'use client'

import { useState, useEffect } from 'react'
import LombaForm from '@/src/components/forms/LombaForm'
import { getCompetitions, createCompetition, updateCompetition, deleteCompetition } from '../../../actions/competitions'

const Lomba = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingData, setEditingData] = useState<any>(null)
    const [competitions, setCompetitions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCompetitions()
    }, [])

    const loadCompetitions = async () => {
        try {
            const competitionData = await getCompetitions()
            setCompetitions(competitionData)
        } catch (error) {
            console.error('Error loading competitions:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddLomba = async (data: any): Promise<void> => {
        try {
            const competitionData = {
                event_name: data.event_name,
                organizer: data.organizer,
                location: data.location,
                start_date: data.start_date,
                end_date: data.end_date
            }

            const result = await createCompetition(competitionData)
            if (result) {
                await loadCompetitions() // Refresh the list
                console.log('Lomba berhasil ditambahkan')
            } else {
                console.error('Error adding lomba')
            }
        } catch (error) {
            console.error('Error adding lomba:', error)
        }
    }

    const handleEditLomba = async (data: any) => {
        try {
            if (!editingData?.id_competitions) return

            const competitionData = {
                event_name: data.event_name,
                organizer: data.organizer,
                location: data.location,
                start_date: data.start_date,
                end_date: data.end_date
            }

            const result = await updateCompetition(editingData.id_competitions, competitionData)
            if (result) {
                await loadCompetitions() // Refresh the list
                console.log('Lomba berhasil diperbarui')
            } else {
                console.error('Error updating lomba')
            }
        } catch (error) {
            console.error('Error updating lomba:', error)
        }
    }

    const handleDeleteLomba = async (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus lomba ini?')) return

        try {
            const success = await deleteCompetition(id)
            if (success) {
                await loadCompetitions() // Refresh the list
                console.log('Lomba berhasil dihapus')
            } else {
                console.error('Error deleting lomba')
            }
        } catch (error) {
            console.error('Error deleting lomba:', error)
        }
    }

    const openAddForm = () => {
        setEditingData(null)
        setIsFormOpen(true)
    }

    const openEditForm = (lombaData: any) => {
        setEditingData(lombaData)
        setIsFormOpen(true)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manajemen Lomba</h1>
                    <p className="text-gray-600 mt-1">Kelola kompetisi dan turnamen panahan</p>
                </div>
                <button
                    onClick={openAddForm}
                    className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    Tambah Lomba
                </button>
            </div>

            <LombaForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={editingData ? handleEditLomba : handleAddLomba}
                initialData={editingData}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-8">
                        <p>Loading...</p>
                    </div>
                ) : competitions.length > 0 ? competitions.map((competition: any) => (
                    <div key={competition.id_competitions} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-200 rounded-full p-2">
                                    <span className="text-slate-600 text-xl">🏆</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{competition.event_name}</h3>
                                    <p className="text-gray-500 text-sm">
                                        {competition.start_date && competition.end_date
                                            ? `${new Date(competition.start_date).toLocaleDateString('id-ID')} - ${new Date(competition.end_date).toLocaleDateString('id-ID')}`
                                            : 'Tanggal belum ditentukan'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                    new Date(competition.start_date) > new Date()
                                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                                        : new Date(competition.end_date) >= new Date()
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-gray-50 text-gray-700 border-gray-200'
                                }`}>
                                    {new Date(competition.start_date) > new Date()
                                        ? 'Upcoming'
                                        : new Date(competition.end_date) >= new Date()
                                        ? 'Aktif'
                                        : 'Selesai'
                                    }
                                </span>
                                <span className="text-sm text-gray-500">{competition.location || 'Lokasi belum ditentukan'}</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">
                                {competition.organizer ? `Diselenggarakan oleh: ${competition.organizer}` : 'Penyelenggara belum ditentukan'}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                    ID: {competition.id_competitions}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEditForm({
                                            event_name: competition.event_name,
                                            organizer: competition.organizer || '',
                                            location: competition.location || '',
                                            start_date: competition.start_date ? competition.start_date.split('T')[0] : '',
                                            end_date: competition.end_date ? competition.end_date.split('T')[0] : ''
                                        })}
                                        className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteLomba(competition.id_competitions)}
                                        className="px-3 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full bg-gray-50 rounded-xl p-8 text-center">
                        <div className="text-6xl mb-4">🏆</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada lomba</h3>
                        <p className="text-gray-500">Tambahkan lomba pertama untuk memulai</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Lomba
