'use client'

import { useState } from 'react'
import JadwalForm from '@/src/components/forms/JadwalForm'

const Jadwal = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleAddJadwal = (data: any) => {
        console.log('Adding jadwal:', data)
        // TODO: Implement API call to add jadwal
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Jadwal Latihan</h1>
                    <p className="text-gray-600 mt-1">Kelola jadwal latihan dan sesi pelatihan</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    Tambah Jadwal
                </button>
            </div>

            <JadwalForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleAddJadwal}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Schedule Card 1 */}
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-200 rounded-full p-2">
                                <span className="text-slate-600 text-xl">🏃</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Latihan Pagi</h3>
                                <p className="text-gray-500 text-sm">Senin, 06:00 - 08:00</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                                Aktif
                            </span>
                            <span className="text-sm text-gray-500">Lapangan A</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Latihan dasar dan teknik shooting</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Coach: Ahmad Rahman</span>
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

                {/* Schedule Card 2 */}
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-200 rounded-full p-2">
                                <span className="text-slate-600 text-xl">💪</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Latihan Fisik</h3>
                                <p className="text-gray-500 text-sm">Rabu, 16:00 - 18:00</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                                Aktif
                            </span>
                            <span className="text-sm text-gray-500">Gym Indoor</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Latihan kekuatan dan kondisi fisik</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Coach: Siti Nurhaliza</span>
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

                {/* Schedule Card 3 */}
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-200 rounded-full p-2">
                                <span className="text-slate-600 text-xl">🎯</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Latihan Akurasi</h3>
                                <p className="text-gray-500 text-sm">Jumat, 14:00 - 16:00</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
                                Upcoming
                            </span>
                            <span className="text-sm text-gray-500">Lapangan B</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Fokus pada presisi dan konsistensi</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Coach: Ahmad Rahman</span>
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

export default Jadwal