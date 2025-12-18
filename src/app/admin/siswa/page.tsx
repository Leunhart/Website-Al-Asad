'use client'

import { useState, useEffect, useRef } from 'react'
import SiswaForm from '../../../components/forms/SiswaForm'
import { getStudents, createStudent, updateStudent, deleteStudent } from '../../../actions/students'

const Siswa = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingData, setEditingData] = useState<any>(null)
    const [students, setStudents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalStudents, setTotalStudents] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [academyFilter, setAcademyFilter] = useState<number | null>(null)
    const [queryCache, setQueryCache] = useState<{[key: string]: {data: any[], count: number}}>({})
    const pageSize = 10
    const searchTimeout = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        loadStudents()
    }, [])

    // Debounced search
    useEffect(() => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current)
        }

        searchTimeout.current = setTimeout(() => {
            setCurrentPage(1)
            loadStudents()
        }, 500)

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current)
            }
        }
    }, [searchTerm])

    const loadStudents = async () => {
        try {
            setLoading(true)
            
            // Create cache key
            const cacheKey = `${currentPage}:${pageSize}:${searchTerm}:${academyFilter}`
            
            // Check cache first
            if (queryCache[cacheKey]) {
                const cachedData = queryCache[cacheKey]
                setStudents(cachedData.data)
                setTotalStudents(cachedData.count)
                setLoading(false)
                return
            }
            
            const { data, count } = await getStudents(currentPage, pageSize, searchTerm, academyFilter)
            
            // Update cache
            setQueryCache(prev => ({
                ...prev,
                [cacheKey]: { data, count }
            }))
            
            setStudents(data)
            setTotalStudents(count)
        } catch (error) {
            console.error('Error loading students:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddSiswa = async (data: any): Promise<void> => {
        try {
            // Validate required fields
            if (!data.full_name || data.full_name.trim() === '') {
                console.error('Error adding siswa: Full name is required')
                alert('Nama lengkap siswa harus diisi')
                return
            }

            if (!data.id_academies) {
                console.error('Error adding siswa: Academy ID is required')
                alert('Akademi harus dipilih')
                return
            }

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

            console.log('Data being sent to createStudent:', studentData)
            
            const result = await createStudent(studentData)
            if (result) {
                // Clear cache since data has changed
                setQueryCache({})
                await loadStudents()
                console.log('Siswa berhasil ditambahkan:', result)
                alert('Siswa berhasil ditambahkan')
            } else {
                console.error('Error adding siswa: createStudent returned null')
                alert('Gagal menambahkan siswa. Silakan coba lagi atau periksa data yang dimasukkan.\n\nPastikan semua data yang dimasukkan valid, akademi yang dipilih tersedia, dan level yang dipilih adalah salah satu dari: pemula, menengah, atau lanjut.')
            }
        } catch (error) {
            console.error('Error adding siswa:', error)
            let errorMessage = 'Terjadi kesalahan saat menambahkan siswa. Silakan coba lagi.'
            
            if (error instanceof Error) {
                errorMessage += `\n\nDetail: ${error.message}`
            }
            
            alert(errorMessage)
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
                // Clear cache since data has changed
                setQueryCache({})
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
                // Clear cache since data has changed
                setQueryCache({})
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

            {/* Search and Filter Controls */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cari Siswa</label>
                        <input
                            type="text"
                            placeholder="Cari nama siswa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setCurrentPage(1)
                                loadStudents()
                            }}
                            className="bg-red-900 hover:bg-red-800 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            Cari
                        </button>
                        <button
                            onClick={() => {
                                setSearchTerm('')
                                setAcademyFilter(null)
                                setCurrentPage(1)
                                loadStudents()
                            }}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg border border-gray-300 transition-all duration-200"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <>
                        {[...Array(pageSize)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg shadow-sm animate-pulse">
                                <div className="bg-slate-50 p-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-slate-200 rounded-full p-2">
                                            <span className="text-slate-600 text-xl">👨‍🎓</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                                            <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="h-5 bg-gray-100 rounded w-1/6"></div>
                                        <div className="h-5 bg-gray-100 rounded w-1/4"></div>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                                        <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex-1 h-8 bg-gray-100 rounded"></div>
                                        <div className="flex-1 h-8 bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
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
                                <span className="text-sm text-gray-500">{student.level ? student.level.charAt(0).toUpperCase() + student.level.slice(1) : 'Level belum ditentukan'}</span>
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

            {/* Pagination Controls */}
            {totalStudents > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-600">
                            Menampilkan {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalStudents)} dari {totalStudents} siswa
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setCurrentPage(1)
                                    loadStudents()
                                }}
                                disabled={currentPage === 1}
                                className={`px-3 py-2 rounded-md text-sm ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
                            >
                                Pertama
                            </button>
                            <button
                                onClick={() => {
                                    setCurrentPage(currentPage - 1)
                                    loadStudents()
                                }}
                                disabled={currentPage === 1}
                                className={`px-3 py-2 rounded-md text-sm ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
                            >
                                Sebelumnya
                            </button>
                            <button
                                onClick={() => {
                                    setCurrentPage(currentPage + 1)
                                    loadStudents()
                                }}
                                disabled={currentPage * pageSize >= totalStudents}
                                className={`px-3 py-2 rounded-md text-sm ${currentPage * pageSize >= totalStudents ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
                            >
                                Selanjutnya
                            </button>
                            <button
                                onClick={() => {
                                    setCurrentPage(Math.ceil(totalStudents / pageSize))
                                    loadStudents()
                                }}
                                disabled={currentPage * pageSize >= totalStudents}
                                className={`px-3 py-2 rounded-md text-sm ${currentPage * pageSize >= totalStudents ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
                            >
                                Terakhir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Siswa