'use client'

import { useState, useEffect } from 'react'
import SiswaForm from '../../../components/forms/SiswaForm'
import { getStudents, createStudent, updateStudent, deleteStudent } from '../../../actions/students'

const Siswa = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingData, setEditingData] = useState<any>(null)
    const [students, setStudents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadStudents()
    }, [])

    const loadStudents = async () => {
        try {
            const studentData = await getStudents()
            setStudents(studentData)
        } catch (error) {
            console.error('Error loading students:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddSiswa = async (data: any): Promise<void> => {
        try {
            const studentData = {
                full_name: data.full_name,
                id_academies: data.id_academies || 1,
                gender: data.gender || undefined,
                date_of_birth: data.date_of_birth || undefined,
                level: data.level || undefined,
                achivements: data.achivements || undefined,
                address: data.address || undefined,
                status: data.status || 'active'
            }

            const result = await createStudent(studentData)
            if (result) {
                await loadStudents()
                console.log('Siswa berhasil ditambahkan')
            } else {
                console.error('Error adding siswa')
            }
        } catch (error) {
            console.error('Error adding siswa:', error)
        }
    }

    const handleEditSiswa = async (data: any) => {
        try {
            if (!editingData?.id_students) return

            const studentData = {
                full_name: data.full_name,
                id_academies: data.id_academies || undefined,
                gender: data.gender || undefined,
                date_of_birth: data.date_of_birth || undefined,
                level: data.level || undefined,
                achivements: data.achivements || undefined,
                address: data.address || undefined,
                status: data.status || undefined
            }

            const result = await updateStudent(editingData.id_students, studentData)
            if (result) {
                await loadStudents()
                console.log('Siswa berhasil diperbarui')
            } else {
                console.error('Error updating siswa')
            }
        } catch (error) {
            console.error('Error updating siswa:', error)
        }
    }

    const handleDeleteSiswa = async (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus siswa ini?')) return

        try {
            const success = await deleteStudent(id)
            if (success) {
                await loadStudents()
                console.log('Siswa berhasil dihapus')
            } else {
                console.error('Error deleting siswa')
            }
        } catch (error) {
            console.error('Error deleting siswa:', error)
        }
    }

    const openAddForm = () => {
        setEditingData(null)
        setIsFormOpen(true)
    }

    const openEditForm = (studentData: any) => {
        // Convert database values to form values
        const formData = {
            ...studentData,
            gender: studentData.gender === 'pria' ? 'pria' : studentData.gender === 'wanita' ? 'wanita' : studentData.gender,
            date_of_birth: studentData.date_of_birth ? studentData.date_of_birth.split('T')[0] : ''
        }
        setEditingData(formData)
        setIsFormOpen(true)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manajemen Siswa</h1>
                    <p className="text-gray-600 mt-1">Kelola data siswa akademi panahan</p>
                </div>
                <button
                    onClick={openAddForm}
                    className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    Tambah Siswa
                </button>
            </div>

            <SiswaForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={editingData ? handleEditSiswa : handleAddSiswa}
                initialData={editingData}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-8">
                        <p>Loading...</p>
                    </div>
                ) : students.length > 0 ? students.map((student: any) => (
                    <div key={student.id_students} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-200 rounded-full p-2">
                                    <span className="text-slate-600 text-xl">👨‍🎓</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{student.full_name}</h3>
                                    <p className="text-gray-500 text-sm">ID: {student.id_students}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                    student.status === 'active'
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-red-50 text-red-700 border-red-200'
                                }`}>
                                    {student.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                </span>
                                <span className="text-sm text-gray-500">{student.level || 'Level belum ditentukan'}</span>
                            </div>
                            <div className="space-y-1 mb-4">
                                {student.gender && <p className="text-gray-600 text-sm">👤 {student.gender === 'pria' ? 'Laki-laki' : student.gender === 'wanita' ? 'Perempuan' : student.gender}</p>}
                                {student.date_of_birth && <p className="text-gray-600 text-sm">🎂 {new Date(student.date_of_birth).toLocaleDateString('id-ID')}</p>}
                                {student.address && <p className="text-gray-600 text-sm">📍 {student.address}</p>}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditForm(student)}
                                    className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteSiswa(student.id_students)}
                                    className="flex-1 px-3 py-2 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full bg-gray-50 rounded-xl p-8 text-center">
                        <div className="text-6xl mb-4">👨‍🎓</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada siswa</h3>
                        <p className="text-gray-500">Tambahkan siswa pertama untuk memulai</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Siswa