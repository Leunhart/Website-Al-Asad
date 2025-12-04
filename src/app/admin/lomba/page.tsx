'use client'

import { useState } from 'react'
import LombaForm from '@/src/components/forms/LombaForm'

const Lomba = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingData, setEditingData] = useState<any>(null)

    const handleAddLomba = (data: any) => {
        console.log('Adding lomba:', data)
        // TODO: Implement API call to add lomba
    }

    const handleEditLomba = (data: any) => {
        console.log('Editing lomba:', data)
        // TODO: Implement API call to edit lomba
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

                {/* Competition Card 1 */}
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-200 rounded-full p-2">
                                <span className="text-slate-600 text-xl">🏆</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">National Championship</h3>
                                <p className="text-gray-500 text-sm">1-3 Desember 2023</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                                Aktif
                            </span>
                            <span className="text-sm text-gray-500">Jakarta</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Kejuaraan nasional panahan kategori compound</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Peserta: 50 tim</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditForm({
                                        event_name: "National Championship",
                                        organizer: "PB PASI",
                                        location: "Jakarta",
                                        start_date: "2023-12-01",
                                        end_date: "2023-12-03"
                                    })}
                                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300"
                                >
                                    Edit
                                </button>
                                <button className="px-3 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200">
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Competition Card 2 */}
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-200 rounded-full p-2">
                                <span className="text-slate-600 text-xl">🎯</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Youth Archery Cup</h3>
                                <p className="text-gray-500 text-sm">15-17 Januari 2024</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                                Upcoming
                            </span>
                            <span className="text-sm text-gray-500">Surabaya</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Kompetisi pemuda panahan se-Jawa Timur</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Peserta: 30 atlet</span>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300">
                                    Edit
                                </button>
                                <button className="px-3 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200">
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Competition Card 3 */}
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-200 rounded-full p-2">
                                <span className="text-slate-600 text-xl">🏅</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Regional Qualifier</h3>
                                <p className="text-gray-500 text-sm">5-7 Februari 2024</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
                                Registrasi
                            </span>
                            <span className="text-sm text-gray-500">Bandung</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Kualifikasi regional untuk kejuaraan nasional</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Peserta: 25 atlet</span>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300">
                                    Edit
                                </button>
                                <button className="px-3 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200">
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Lomba
