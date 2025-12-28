'use client'

import { useState, useEffect } from 'react'
import LiveScoringForm from '@/src/components/forms/LiveScoringForm'
import { getCompetitions } from '../../../actions/competitions'
import { getLiveScores, createLiveScore, updateLiveScore, deleteLiveScore } from '../../../actions/live-scoring'

const LiveScoring = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingData, setEditingData] = useState<any>(null)
    const [competitions, setCompetitions] = useState<any[]>([])
    const [liveScores, setLiveScores] = useState<any[]>([])
    const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCompetitions()
        if (selectedCompetition) {
            loadLiveScores(selectedCompetition)
        }
    }, [selectedCompetition])

    const loadCompetitions = async () => {
        try {
            const competitionData = await getCompetitions()
            setCompetitions(competitionData)
        } catch (error) {
            console.error('Error loading competitions:', error)
        }
    }

    const loadLiveScores = async (competitionId: number) => {
        try {
            setLoading(true)
            const scoresData = await getLiveScores(competitionId)
            setLiveScores(scoresData)
        } catch (error) {
            console.error('Error loading live scores:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddLiveScore = async (data: any): Promise<void> => {
        try {
            if (!selectedCompetition) {
                console.error('No competition selected')
                return
            }

            const scoreData = {
                competition_id: selectedCompetition,
                athlete_name: data.athlete_name,
                score: data.score,
                round: data.round,
                notes: data.notes
            }

            const result = await createLiveScore(scoreData)
            if (result) {
                await loadLiveScores(selectedCompetition) // Refresh the list
                console.log('Live score berhasil ditambahkan')
            } else {
                console.error('Error adding live score')
            }
        } catch (error) {
            console.error('Error adding live score:', error)
        }
    }

    const handleEditLiveScore = async (data: any) => {
        try {
            if (!editingData?.id_live_scores || !selectedCompetition) return

            const scoreData = {
                athlete_name: data.athlete_name,
                score: data.score,
                round: data.round,
                notes: data.notes
            }

            const result = await updateLiveScore(editingData.id_live_scores, scoreData)
            if (result) {
                await loadLiveScores(selectedCompetition) // Refresh the list
                console.log('Live score berhasil diperbarui')
            } else {
                console.error('Error updating live score')
            }
        } catch (error) {
            console.error('Error updating live score:', error)
        }
    }

    const handleDeleteLiveScore = async (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus skor ini?')) return

        try {
            const success = await deleteLiveScore(id)
            if (success && selectedCompetition) {
                await loadLiveScores(selectedCompetition) // Refresh the list
                console.log('Live score berhasil dihapus')
            } else {
                console.error('Error deleting live score')
            }
        } catch (error) {
            console.error('Error deleting live score:', error)
        }
    }

    const openAddForm = () => {
        setEditingData(null)
        setIsFormOpen(true)
    }

    const openEditForm = (scoreData: any) => {
        setEditingData(scoreData)
        setIsFormOpen(true)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Live Scoring</h1>
                    <p className="text-gray-600 mt-1">Kelola skor langsung untuk kompetisi</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pilih Kompetisi
                    </label>
                    <select
                        value={selectedCompetition || ''}
                        onChange={(e) => setSelectedCompetition(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    >
                        <option value="">-- Pilih Kompetisi --</option>
                        {competitions.map((competition) => (
                            <option key={competition.id_competitions} value={competition.id_competitions}>
                                {competition.event_name} ({new Date(competition.start_date).toLocaleDateString('id-ID')})
                            </option>
                        ))}
                    </select>
                </div>

                {selectedCompetition && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Skor untuk Kompetisi Terpilih
                            </h3>
                            <button
                                onClick={openAddForm}
                                className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                            >
                                <span className="text-lg">+</span>
                                Tambah Skor
                            </button>
                        </div>

                        <LiveScoringForm
                            isOpen={isFormOpen}
                            onClose={() => setIsFormOpen(false)}
                            onSubmit={editingData ? handleEditLiveScore : handleAddLiveScore}
                            initialData={editingData}
                        />

                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="text-center py-8">
                                    <p>Loading...</p>
                                </div>
                            ) : liveScores.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atlet</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ronde</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catatan</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {liveScores.map((score) => (
                                            <tr key={score.id_live_scores}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{score.athlete_name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{score.score}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{score.round}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{score.notes || '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => openEditForm(score)}
                                                            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition border border-gray-300"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteLiveScore(score.id_live_scores)}
                                                            className="px-3 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition border border-red-200"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="bg-gray-50 rounded-xl p-8 text-center">
                                    <div className="text-6xl mb-4">🎯</div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada skor</h3>
                                    <p className="text-gray-500">Tambahkan skor pertama untuk memulai</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LiveScoring