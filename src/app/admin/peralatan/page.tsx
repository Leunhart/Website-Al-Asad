'use client'

import { useState } from 'react'
import PeralatanForm from '@/src/components/forms/PeralatanForm'

const Peralatan = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleAddPeralatan = (data: any) => {
        console.log('Adding peralatan:', data)
        // TODO: Implement API call to add peralatan
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manajemen Peralatan</h1>
                    <p className="text-gray-600 mt-1">Kelola inventaris dan kondisi peralatan panahan</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    Tambah Peralatan
                </button>
            </div>

            <PeralatanForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleAddPeralatan}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Equipment Card 1 */}
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-200 rounded-full p-2">
                                <span className="text-slate-600 text-xl">🏹</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Busur Compound</h3>
                                <p className="text-gray-500 text-sm">ID: EQ-001</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                                Tersedia
                            </span>
                            <span className="text-sm text-gray-500">Stok: 15</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Busur compound profesional untuk latihan</p>
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

                {/* Equipment Card 2 */}
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-200 rounded-full p-2">
                                <span className="text-slate-600 text-xl">🎯</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Target Elektronik</h3>
                                <p className="text-gray-500 text-sm">ID: EQ-002</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
                                Maintenance
                            </span>
                            <span className="text-sm text-gray-500">Stok: 3</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Target digital untuk scoring otomatis</p>
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

                {/* Equipment Card 3 */}
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-200 rounded-full p-2">
                                <span className="text-slate-600 text-xl">🛡️</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Pelindung Dada</h3>
                                <p className="text-gray-500 text-sm">ID: EQ-003</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                                Tersedia
                            </span>
                            <span className="text-sm text-gray-500">Stok: 25</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Pelindung dada standar untuk safety</p>
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

export default Peralatan