'use client'

import { useEffect, useState } from 'react'
import CoachForm, { CoachFormData } from '@/src/components/forms/CoachForm'
import { getCoaches, createCoach, updateCoach, deleteCoach } from '@/src/actions/coaches'
import { compressImage } from '@/src/lib/image-compress'

const CoachPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingData, setEditingData] = useState<any>(null)
    const [coaches, setCoaches] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    useEffect(() => {
        loadCoaches()
    }, [])

    const loadCoaches = async () => {
        try {
            setLoading(true)
            const data = await getCoaches()
            setCoaches(data)
        } catch (error) {
            console.error('Error loading coaches:', error)
        } finally {
            setLoading(false)
        }
    }

    const uploadPhoto = async (file: File, existingUrl?: string | null): Promise<string> => {
        const compressed = await compressImage(file, { maxSizeBytes: 5 * 1024 * 1024 })
        const form = new FormData()
        form.append('file', compressed)
        if (existingUrl) {
            form.append('existingUrl', existingUrl)
        }

        const res = await fetch('/api/coaches/upload', {
            method: 'POST',
            body: form,
        })

        const json = await res.json()
        if (!res.ok || !json.ok) {
            throw new Error(json.error || 'Gagal upload foto')
        }
        return json.url as string
    }

    const handleSubmit = async (data: CoachFormData) => {
        try {
            setSaving(true)
            let photoUrl = data.photoUrl || null
            if (data.photoFile) {
                photoUrl = await uploadPhoto(data.photoFile, editingData?.photo)
            }

            if (editingData?.id_coaches) {
                await updateCoach(editingData.id_coaches, {
                    full_name: data.full_name,
                    phone: data.phone || null,
                    photo: photoUrl,
                    id_academies: data.id_academies ?? null,
                })
            } else {
                await createCoach({
                    full_name: data.full_name,
                    phone: data.phone || null,
                    photo: photoUrl,
                    id_academies: data.id_academies ?? null,
                })
            }

            await loadCoaches()
            setIsFormOpen(false)
            setEditingData(null)
        } catch (error) {
            console.error('Gagal menyimpan pelatih:', error)
            alert('Gagal menyimpan pelatih. Pastikan tipe gambar benar dan ukuran <= 5MB.')
        } finally {
            setSaving(false)
        }
    }

    const openAddForm = () => {
        setEditingData(null)
        setIsFormOpen(true)
    }

    const openEditForm = (coachData: any) => {
        setEditingData({ ...coachData, photoUrl: coachData.photo })
        setIsFormOpen(true)
    }

    const handleDeleteCoach = async (id: number) => {
        try {
            if (confirm('Apakah Anda yakin ingin menghapus pelatih ini?')) {
                const success = await deleteCoach(id)
                if (success) {
                    await loadCoaches()
                    console.log('Pelatih berhasil dihapus')
                } else {
                    console.error('Gagal menghapus pelatih')
                }
            }
        } catch (error) {
            console.error('Error deleting pelatih:', error)
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manajemen Pelatih</h1>
                    <p className="text-gray-600 mt-1">Kelola data pelatih akademi dan foto profil</p>
                </div>
                <button
                    onClick={openAddForm}
                    className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    Tambah Pelatih
                </button>
            </div>

            <CoachForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingData}
            />

            {previewUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="relative bg-white rounded-xl shadow-2xl p-4 max-w-3xl w-full mx-4">
                        <button
                            type="button"
                            onClick={() => setPreviewUrl(null)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                            aria-label="Tutup pratinjau"
                        >
                            ×
                        </button>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={previewUrl} alt="Foto pelatih" className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-8">
                        <p>Loading...</p>
                    </div>
                ) : coaches.length > 0 ? coaches.map((coach: any) => (
                    <div key={coach.id_coaches} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => coach.photo && setPreviewUrl(coach.photo)}
                                    className="relative group bg-slate-200 rounded-full p-1 w-16 h-16 overflow-hidden flex items-center justify-center aspect-square hover:ring-2 hover:ring-red-200 focus:outline-none"
                                >
                                    {coach.photo ? (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={coach.photo} alt={coach.full_name} className="w-full h-full object-cover rounded-full" />
                                            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-sm font-medium">
                                                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                                                    <path
                                                        fill="currentColor"
                                                        d="M12 5c-5 0-9 4-10 7 1 3 5 7 10 7s9-4 10-7c-1-3-5-7-10-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2.5A2.5 2.5 0 1 0 12 10a2.5 2.5 0 0 0 0 5Z"
                                                    />
                                                </svg>
                                            </div>
                                        </>
                                    ) : (
                                        <span className="text-slate-600 text-xl">👤</span>
                                    )}
                                </button>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{coach.full_name}</h3>
                                    <p className="text-gray-500 text-sm">{coach.phone || 'Telepon belum diisi'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="px-3 py-1 rounded-full text-xs font-medium border bg-purple-50 text-purple-700 border-purple-200">Pelatih</span>
                                <span className="text-sm text-gray-500">ID: {coach.id_coaches}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                   onClick={() => openEditForm(coach)}
                                   className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300"
                                   disabled={saving}
                               >
                                   Edit
                               </button>
                                <button
                                   onClick={() => handleDeleteCoach(coach.id_coaches)}
                                   className="flex-1 px-3 py-2 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200"
                                   disabled={saving}
                                >
                                   Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full bg-gray-50 rounded-xl p-8 text-center">
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada pelatih</h3>
                        <p className="text-gray-500">Tambahkan pelatih pertama untuk memulai</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CoachPage
