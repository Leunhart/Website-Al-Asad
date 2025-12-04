'use client'

import { useState, useEffect } from 'react'

interface Registration {
    id_registrations: string
    full_name: string
    gender: string | null
    date_of_birth: string | null
    phone: string | null
    address: string | null
    level_requested: string | null
    status: string | null
    created_at: string | null
}

const Registrasi = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([])
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState<string | null>(null)

    useEffect(() => {
        loadRegistrations()
    }, [])

    const loadRegistrations = async () => {
        try {
            const response = await fetch('/api/admin/registrations')
            const data = await response.json()

            if (data.ok) {
                setRegistrations(data.data)
            } else {
                console.error('Error loading registrations:', data.error)
            }
        } catch (error) {
            console.error('Error loading registrations:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async (registrationId: string) => {
        setProcessing(registrationId)
        try {
            const response = await fetch(`/api/admin/registrations/${registrationId}/approve`, {
                method: 'POST'
            })
            const data = await response.json()

            if (data.ok) {
                console.log('Registrasi berhasil disetujui')
                await loadRegistrations() // Refresh the list
            } else {
                console.error('Error approving registration:', data.error)
                alert('Gagal menyetujui registrasi: ' + data.error)
            }
        } catch (error) {
            console.error('Error approving registration:', error)
            alert('Terjadi kesalahan saat menyetujui registrasi')
        } finally {
            setProcessing(null)
        }
    }

    const handleReject = async (registrationId: string) => {
        if (!confirm('Apakah Anda yakin ingin menolak registrasi ini?')) return

        setProcessing(registrationId)
        try {
            const response = await fetch(`/api/admin/registrations/${registrationId}/reject`, {
                method: 'POST'
            })
            const data = await response.json()

            if (data.ok) {
                console.log('Registrasi berhasil ditolak')
                await loadRegistrations() // Refresh the list
            } else {
                console.error('Error rejecting registration:', data.error)
                alert('Gagal menolak registrasi: ' + data.error)
            }
        } catch (error) {
            console.error('Error rejecting registration:', error)
            alert('Terjadi kesalahan saat menolak registrasi')
        } finally {
            setProcessing(null)
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Persetujuan Registrasi</h1>
                    <p className="text-gray-600 mt-1">Kelola permintaan registrasi siswa baru</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-8">
                        <p>Loading...</p>
                    </div>
                ) : registrations.length > 0 ? registrations.map((registration: Registration) => (
                    <div key={registration.id_registrations} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="bg-yellow-50 p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-yellow-200 rounded-full p-2">
                                    <span className="text-yellow-600 text-xl">⏳</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{registration.full_name}</h3>
                                    <p className="text-gray-500 text-sm">ID: {registration.id_registrations}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="space-y-2 mb-4">
                                {registration.gender && <p className="text-gray-600 text-sm">👤 {registration.gender}</p>}
                                {registration.date_of_birth && <p className="text-gray-600 text-sm">🎂 {new Date(registration.date_of_birth).toLocaleDateString('id-ID')}</p>}
                                {registration.phone && <p className="text-gray-600 text-sm">📞 {registration.phone}</p>}
                                {registration.address && <p className="text-gray-600 text-sm">📍 {registration.address}</p>}
                                {registration.level_requested && <p className="text-gray-600 text-sm">🎯 Level: {registration.level_requested}</p>}
                                {registration.created_at && <p className="text-gray-600 text-sm">📅 Daftar: {new Date(registration.created_at).toLocaleDateString('id-ID')}</p>}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleApprove(registration.id_registrations)}
                                    disabled={processing === registration.id_registrations}
                                    className="flex-1 px-3 py-2 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition border border-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing === registration.id_registrations ? 'Memproses...' : 'Setujui'}
                                </button>
                                <button
                                    onClick={() => handleReject(registration.id_registrations)}
                                    disabled={processing === registration.id_registrations}
                                    className="flex-1 px-3 py-2 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Tolak
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full bg-gray-50 rounded-xl p-8 text-center">
                        <div className="text-6xl mb-4">✅</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada registrasi pending</h3>
                        <p className="text-gray-500">Semua registrasi telah diproses</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Registrasi