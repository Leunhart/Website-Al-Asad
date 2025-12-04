'use client'

import { useState, useEffect } from 'react'
import TestimoniForm from '../../../components/forms/TestimoniForm'
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../../actions/testimonials'

const Testimoni = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingData, setEditingData] = useState<any>(null)
    const [testimonials, setTestimonials] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadTestimonials()
    }, [])

    const loadTestimonials = async () => {
        try {
            const testimonialData = await getTestimonials()
            setTestimonials(testimonialData)
        } catch (error) {
            console.error('Error loading testimonials:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddTestimoni = async (data: any) => {
        try {
            const testimonialData = {
                reviewer_name: data.reviewer_name,
                content: data.content,
                rating: data.rating || undefined,
                id_academies: data.id_academies || undefined
            }

            const result = await createTestimonial(testimonialData)
            if (result) {
                await loadTestimonials()
                console.log('Testimoni berhasil ditambahkan')
            } else {
                console.error('Error adding testimoni')
            }
        } catch (error) {
            console.error('Error adding testimoni:', error)
        }
    }

    const handleEditTestimoni = async (data: any) => {
        try {
            if (!editingData?.unique_id) return

            const testimonialData = {
                reviewer_name: data.reviewer_name,
                content: data.content,
                rating: data.rating || undefined,
                id_academies: data.id_academies || undefined
            }

            const result = await updateTestimonial(editingData.unique_id, testimonialData)
            if (result) {
                await loadTestimonials()
                console.log('Testimoni berhasil diperbarui')
            } else {
                console.error('Error updating testimoni')
            }
        } catch (error) {
            console.error('Error updating testimoni:', error)
        }
    }

    const handleDeleteTestimoni = async (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) return

        try {
            const success = await deleteTestimonial(id)
            if (success) {
                await loadTestimonials()
                console.log('Testimoni berhasil dihapus')
            } else {
                console.error('Error deleting testimoni')
            }
        } catch (error) {
            console.error('Error deleting testimoni:', error)
        }
    }

    const openAddForm = () => {
        setEditingData(null)
        setIsFormOpen(true)
    }

    const openEditForm = (testimonialData: any) => {
        setEditingData(testimonialData)
        setIsFormOpen(true)
    }

    const renderStars = (rating: number) => {
        return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manajemen Testimoni</h1>
                    <p className="text-gray-600 mt-1">Kelola testimoni dan ulasan dari siswa</p>
                </div>
                <button
                    onClick={openAddForm}
                    className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    Tambah Testimoni
                </button>
            </div>

            <TestimoniForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={editingData ? handleEditTestimoni : handleAddTestimoni}
                initialData={editingData}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-8">
                        <p>Loading...</p>
                    </div>
                ) : testimonials.length > 0 ? testimonials.map((testimonial: any) => (
                    <div key={testimonial.unique_id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-200 rounded-full p-2">
                                    <span className="text-slate-600 text-xl">💬</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{testimonial.reviewer_name}</h3>
                                    <p className="text-gray-500 text-sm">ID: {testimonial.unique_id}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-medium text-gray-700">
                                    Rating: {testimonial.rating ? renderStars(testimonial.rating) : 'Tidak ada rating'}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4 italic">
                                "{testimonial.content.length > 100
                                    ? testimonial.content.substring(0, 100) + '...'
                                    : testimonial.content}"
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditForm(testimonial)}
                                    className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTestimoni(testimonial.unique_id)}
                                    className="flex-1 px-3 py-2 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full bg-gray-50 rounded-xl p-8 text-center">
                        <div className="text-6xl mb-4">💬</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada testimoni</h3>
                        <p className="text-gray-500">Tambahkan testimoni pertama untuk memulai</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Testimoni