'use client'

import { useState } from 'react'
import AnggotaForm from '@/src/components/forms/AnggotaForm'

const Anggota = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleAddAnggota = (data: any) => {
        console.log('Adding anggota:', data)
        // TODO: Implement API call to add anggota
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manajemen Anggota</h1>
                    <p className="text-gray-600 mt-1">Kelola data atlet, pelatih, dan anggota akademi</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    Tambah Anggota
                </button>
            </div>

            <AnggotaForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleAddAnggota}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Member Card 1 */}
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-200 rounded-full p-2">
                                <span className="text-slate-600 text-xl">👤</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Ahmad Rahman</h3>
                                <p className="text-gray-500 text-sm">ahmad@example.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                                Atlet
                            </span>
                            <span className="text-sm text-gray-500">Bergabung: 2023</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Spesialis busur compound, juara regional 2023</p>
                        <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300">
                                Edit
                            </button>
                            <button className="flex-1 px-3 py-2 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>

                {/* Member Card 2 */}
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-200 rounded-full p-2">
                                <span className="text-slate-600 text-xl">👩</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Siti Nurhaliza</h3>
                                <p className="text-gray-500 text-sm">siti@example.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
                                Pelatih
                            </span>
                            <span className="text-sm text-gray-500">Bergabung: 2022</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Pelatih senior dengan pengalaman 8 tahun</p>
                        <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300">
                                Edit
                            </button>
                            <button className="flex-1 px-3 py-2 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>

                {/* Member Card 3 */}
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-200 rounded-full p-2">
                                <span className="text-slate-600 text-xl">👨</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Budi Santoso</h3>
                                <p className="text-gray-500 text-sm">budi@example.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                                Atlet
                            </span>
                            <span className="text-sm text-gray-500">Bergabung: 2024</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Atlet pemula dengan potensi tinggi</p>
                        <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300">
                                Edit
                            </button>
                            <button className="flex-1 px-3 py-2 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Anggota