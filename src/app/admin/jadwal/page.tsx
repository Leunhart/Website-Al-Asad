'use client'

import { useState, useEffect } from 'react'
import JadwalForm from '@/src/components/forms/JadwalForm'
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from '../../../actions/schedules'

const Jadwal = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingData, setEditingData] = useState<any>(null)
    const [schedules, setSchedules] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadSchedules()
    }, [])

    const loadSchedules = async () => {
        try {
            const scheduleData = await getSchedules()
            setSchedules(scheduleData)
        } catch (error) {
            console.error('Error loading schedules:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddJadwal = async (data: any): Promise<void> => {
        try {
            const scheduleData = {
                title: data.title,
                day: data.day,
                start_time: data.start_time,
                end_time: data.end_time,
                location: data.location,
                coach_name: data.coach_name,
                max_participants: data.max_participants,
                description: data.description
            }

            const result = await createSchedule(scheduleData)
            if (result) {
                await loadSchedules() // Refresh the list
                console.log('Jadwal berhasil ditambahkan')
            } else {
                console.error('Error adding jadwal')
            }
        } catch (error) {
            console.error('Error adding jadwal:', error)
        }
    }

    const handleEditJadwal = async (data: any) => {
        try {
            if (!editingData?.id_schedules) return

            const scheduleData = {
                title: data.title,
                day: data.day,
                start_time: data.start_time,
                end_time: data.end_time,
                location: data.location,
                coach_name: data.coach_name,
                max_participants: data.max_participants,
                description: data.description
            }

            const result = await updateSchedule(editingData.id_schedules, scheduleData)
            if (result) {
                await loadSchedules() // Refresh the list
                console.log('Jadwal berhasil diperbarui')
            } else {
                console.error('Error updating jadwal')
            }
        } catch (error) {
            console.error('Error updating jadwal:', error)
        }
    }

    const handleDeleteJadwal = async (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) return

        try {
            const success = await deleteSchedule(id)
            if (success) {
                await loadSchedules() // Refresh the list
                console.log('Jadwal berhasil dihapus')
            } else {
                console.error('Error deleting jadwal')
            }
        } catch (error) {
            console.error('Error deleting jadwal:', error)
        }
    }

    const openAddForm = () => {
        setEditingData(null)
        setIsFormOpen(true)
    }

    const openEditForm = (jadwalData: any) => {
        setEditingData(jadwalData)
        setIsFormOpen(true)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Jadwal Latihan</h1>
                    <p className="text-gray-600 mt-1">Kelola jadwal latihan dan sesi pelatihan</p>
                </div>
                <button
                    onClick={openAddForm}
                    className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    Tambah Jadwal
                </button>
            </div>

            <JadwalForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={editingData ? handleEditJadwal : handleAddJadwal}
                initialData={editingData}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-8">
                        <p>Loading...</p>
                    </div>
                ) : schedules.length > 0 ? schedules.map((schedule: any) => (
                    <div key={schedule.id_schedules} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-200 rounded-full p-2">
                                    <span className="text-slate-600 text-xl">
                                        {schedule.title.toLowerCase().includes('fisik') ? '💪' :
                                         schedule.title.toLowerCase().includes('akurasi') ? '🎯' : '🏃'}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{schedule.title}</h3>
                                    <p className="text-gray-500 text-sm">{schedule.day}, {schedule.start_time} - {schedule.end_time}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                                    Aktif
                                </span>
                                <span className="text-sm text-gray-500">{schedule.location}</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">
                                {schedule.description || 'Deskripsi tidak tersedia'}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Coach: {schedule.coach_name}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEditForm({
                                            title: schedule.title,
                                            day: schedule.day,
                                            start_time: schedule.start_time,
                                            end_time: schedule.end_time,
                                            location: schedule.location,
                                            coach_name: schedule.coach_name,
                                            max_participants: schedule.max_participants,
                                            description: schedule.description || ''
                                        })}
                                        className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteJadwal(schedule.id_schedules)}
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
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada jadwal</h3>
                        <p className="text-gray-500">Tambahkan jadwal latihan pertama untuk memulai</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Jadwal