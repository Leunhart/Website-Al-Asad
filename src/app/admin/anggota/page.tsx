'use client'

import { useState, useEffect } from 'react'
import AnggotaForm from '@/src/components/forms/AnggotaForm'
import { getUsers, createUser, updateUser } from '../../../actions/users'

const Anggota = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingData, setEditingData] = useState<any>(null)
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        try {
            const userData = await getUsers()
            setUsers(userData)
        } catch (error) {
            console.error('Error loading users:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddAnggota = async (data: any): Promise<void> => {
        try {
            // Transform form data to match database schema
            const userData = {
                full_name: data.full_name,
                email: data.email,
                phone: data.phone,
                role: data.role,
                id_coaches: null // Will be set if role is Pelatih
            }

            const result = await createUser(userData)
            if (result.success) {
                await loadUsers() // Refresh the list
                console.log('Anggota berhasil ditambahkan')
            } else {
                console.error('Error adding anggota:', result.error)
            }
        } catch (error) {
            console.error('Error adding anggota:', error)
        }
    }

    const handleEditAnggota = async (data: any) => {
        try {
            if (!editingData?.unique_id) return

            // Transform form data to match database schema
            const userData = {
                full_name: data.full_name,
                email: data.email,
                phone: data.phone,
                role: data.role
            }

            const result = await updateUser(editingData.unique_id, userData)
            if (result.success) {
                await loadUsers() // Refresh the list
                console.log('Anggota berhasil diperbarui')
            } else {
                console.error('Error updating anggota:', result.error)
            }
        } catch (error) {
            console.error('Error updating anggota:', error)
        }
    }

    const openAddForm = () => {
        setEditingData(null)
        setIsFormOpen(true)
    }

    const openEditForm = (anggotaData: any) => {
        setEditingData(anggotaData)
        setIsFormOpen(true)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manajemen Anggota</h1>
                    <p className="text-gray-600 mt-1">Kelola data atlet, pelatih, dan anggota akademi</p>
                </div>
                <button
                    onClick={openAddForm}
                    className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    Tambah Anggota
                </button>
            </div>

            <AnggotaForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={editingData ? handleEditAnggota : handleAddAnggota}
                initialData={editingData}
            />

            {/* Display Users */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-8">
                        <p>Loading...</p>
                    </div>
                ) : users.length > 0 ? users.map((user: any) => (
                    <div key={user.unique_id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-200 rounded-full p-2">
                                    <span className="text-slate-600 text-xl">👤</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{user.full_name}</h3>
                                    <p className="text-gray-500 text-sm">{user.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                    user.role === 'Atlet'
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-purple-50 text-purple-700 border-purple-200'
                                }`}>
                                    {user.role}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Bergabung: {user.created_at ? new Date(user.created_at).getFullYear() : 'N/A'}
                                </span>
                            </div>
                            {user.phone && <p className="text-gray-600 text-sm mb-4">Telp: {user.phone}</p>}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditForm({
                                        full_name: user.full_name,
                                        email: user.email,
                                        phone: user.phone || '',
                                        role: user.role
                                    })}
                                    className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300"
                                >
                                    Edit
                                </button>
                                <button className="flex-1 px-3 py-2 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200">
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full bg-gray-50 rounded-xl p-8 text-center">
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada anggota</h3>
                        <p className="text-gray-500">Tambahkan anggota pertama untuk memulai</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Anggota