'use client'

import { useState, useEffect } from 'react'
import PeralatanForm from '@/src/components/forms/PeralatanForm'
import { getEquipment, createEquipment, updateEquipment, deleteEquipment } from '../../../actions/equipment'

const Peralatan = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingData, setEditingData] = useState<any>(null)
    const [equipment, setEquipment] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadEquipment()
    }, [])

    const loadEquipment = async () => {
        try {
            const equipmentData = await getEquipment()
            setEquipment(equipmentData)
        } catch (error) {
            console.error('Error loading equipment:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddPeralatan = async (data: any): Promise<void> => {
        try {
            const equipmentData = {
                name: data.name,
                type: data.type,
                quantity: data.quantity,
                condition: data.condition,
                location: data.location
            }

            const result = await createEquipment(equipmentData)
            if (result) {
                await loadEquipment() // Refresh the list
                console.log('Peralatan berhasil ditambahkan')
            } else {
                console.error('Error adding peralatan')
            }
        } catch (error) {
            console.error('Error adding peralatan:', error)
        }
    }

    const handleEditPeralatan = async (data: any) => {
        try {
            if (!editingData?.id_equipment) return

            const equipmentData = {
                name: data.name,
                type: data.type,
                quantity: data.quantity,
                condition: data.condition,
                location: data.location
            }

            const result = await updateEquipment(editingData.id_equipment, equipmentData)
            if (result) {
                await loadEquipment() // Refresh the list
                console.log('Peralatan berhasil diperbarui')
            } else {
                console.error('Error updating peralatan')
            }
        } catch (error) {
            console.error('Error updating peralatan:', error)
        }
    }

    const handleDeletePeralatan = async (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus peralatan ini?')) return

        try {
            const success = await deleteEquipment(id)
            if (success) {
                await loadEquipment() // Refresh the list
                console.log('Peralatan berhasil dihapus')
            } else {
                console.error('Error deleting peralatan')
            }
        } catch (error) {
            console.error('Error deleting peralatan:', error)
        }
    }

    const openAddForm = () => {
        setEditingData(null)
        setIsFormOpen(true)
    }

    const openEditForm = (peralatanData: any) => {
        setEditingData(peralatanData)
        setIsFormOpen(true)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manajemen Peralatan</h1>
                    <p className="text-gray-600 mt-1">Kelola inventaris dan kondisi peralatan panahan</p>
                </div>
                <button
                    onClick={openAddForm}
                    className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    Tambah Peralatan
                </button>
            </div>

            <PeralatanForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={editingData ? handleEditPeralatan : handleAddPeralatan}
                initialData={editingData}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-8">
                        <p>Loading...</p>
                    </div>
                ) : equipment.length > 0 ? equipment.map((item: any) => (
                    <div key={item.id_equipment} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-200 rounded-full p-2">
                                    <span className="text-slate-600 text-xl">
                                        {item.type === 'Busur' ? '🏹' :
                                         item.type === 'Anak Panah' ? '🎯' :
                                         item.type === 'Target' ? '🎯' :
                                         item.type === 'Pelindung' ? '🛡️' : '📦'}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                                    <p className="text-gray-500 text-sm">ID: EQ-{item.id_equipment.toString().padStart(3, '0')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                    item.condition === 'Tersedia'
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : item.condition === 'Maintenance'
                                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                        : 'bg-red-50 text-red-700 border-red-200'
                                }`}>
                                    {item.condition}
                                </span>
                                <span className="text-sm text-gray-500">Stok: {item.quantity}</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">Lokasi: {item.location}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditForm({
                                        name: item.name,
                                        type: item.type,
                                        quantity: item.quantity,
                                        condition: item.condition,
                                        location: item.location
                                    })}
                                    className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeletePeralatan(item.id_equipment)}
                                    className="flex-1 px-3 py-2 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full bg-gray-50 rounded-xl p-8 text-center">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada peralatan</h3>
                        <p className="text-gray-500">Tambahkan peralatan pertama untuk memulai</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Peralatan