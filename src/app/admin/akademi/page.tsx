'use client'

import { useState, useEffect } from 'react'
import AkademiForm from '../../../components/forms/AkademiForm'
import { getAcademies, createAcademy, updateAcademy, deleteAcademy } from '../../../actions/academies'

const Akademi = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingData, setEditingData] = useState<any>(null)
    const [academies, setAcademies] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadAcademies()
    }, [])

    const loadAcademies = async () => {
        try {
            const academyData = await getAcademies()
            setAcademies(academyData)
        } catch (error) {
            console.error('Error loading academies:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddAkademi = async (data: any) => {
        try {
            const academyData = {
                name: data.name,
                phone: data.phone || undefined,
                email: data.email || undefined,
                address: data.address || undefined,
                logo: data.logo || undefined
            }

            const result = await createAcademy(academyData)
            if (result) {
                await loadAcademies()
                console.log('Akademi berhasil ditambahkan')
            } else {
                console.error('Error adding akademi')
            }
        } catch (error) {
            console.error('Error adding akademi:', error)
        }
    }

    const handleEditAkademi = async (data: any) => {
        try {
            if (!editingData?.id_academies) return

            const academyData = {
                name: data.name,
                phone: data.phone || undefined,
                email: data.email || undefined,
                address: data.address || undefined,
                logo: data.logo || undefined
            }

            const result = await updateAcademy(editingData.id_academies, academyData)
            if (result) {
                await loadAcademies()
                console.log('Akademi berhasil diperbarui')
            } else {
                console.error('Error updating akademi')
            }
        } catch (error) {
            console.error('Error updating akademi:', error)
        }
    }

    const handleDeleteAkademi = async (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus akademi ini?')) return

        try {
            const success = await deleteAcademy(id)
            if (success) {
                await loadAcademies()
                console.log('Akademi berhasil dihapus')
            } else {
                console.error('Error deleting akademi')
            }
        } catch (error) {
            console.error('Error deleting akademi:', error)
        }
    }

    const openAddForm = () => {
        setEditingData(null)
        setIsFormOpen(true)
    }

    const openEditForm = (academyData: any) => {
        setEditingData(academyData)
        setIsFormOpen(true)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manajemen Akademi</h1>
                    <p className="text-gray-600 mt-1">Kelola data akademi panahan</p>
                </div>
                <button
                    onClick={openAddForm}
                    className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    Tambah Akademi
                </button>
            </div>

            <AkademiForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={editingData ? handleEditAkademi : handleAddAkademi}
                initialData={editingData}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-8">
                        <p>Loading...</p>
                    </div>
                ) : academies.length > 0 ? academies.map((academy: any) => (
                    <div key={academy.id_academies} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-200 rounded-full p-2">
                                    <span className="text-slate-600 text-xl">🏛️</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{academy.name}</h3>
                                    <p className="text-gray-500 text-sm">ID: {academy.id_academies}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="space-y-2 mb-4">
                                {academy.email && <p className="text-gray-600 text-sm">📧 {academy.email}</p>}
                                {academy.phone && <p className="text-gray-600 text-sm">📞 {academy.phone}</p>}
                                {academy.address && <p className="text-gray-600 text-sm">📍 {academy.address}</p>}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditForm(academy)}
                                    className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteAkademi(academy.id_academies)}
                                    className="flex-1 px-3 py-2 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full bg-gray-50 rounded-xl p-8 text-center">
                        <div className="text-6xl mb-4">🏛️</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada akademi</h3>
                        <p className="text-gray-500">Tambahkan akademi pertama untuk memulai</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Akademi