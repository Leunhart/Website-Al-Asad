'use client'

import { useState, useEffect } from 'react'
import { getActiveCompetitionsWithLiveScores } from '@/src/actions/competitions'
import { getLiveScores } from '@/src/actions/live-scoring'

export default function LiveScores() {
    const [activeCompetitions, setActiveCompetitions] = useState<any[]>([])
    const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null)
    const [liveScores, setLiveScores] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadActiveCompetitions = async () => {
            try {
                setLoading(true)
                const competitions = await getActiveCompetitionsWithLiveScores()
                
                setActiveCompetitions(competitions)
                
                // Auto-select the first active competition if available
                if (competitions.length > 0) {
                    setSelectedCompetition(competitions[0].id_competitions)
                }
            } catch (err) {
                console.error('Error loading competitions:', err)
                setError('Gagal memuat data kompetisi')
            } finally {
                setLoading(false)
            }
        }

        loadActiveCompetitions()
    }, [])

    useEffect(() => {
        const loadLiveScores = async () => {
            if (!selectedCompetition) return
            
            try {
                setLoading(true)
                const scores = await getLiveScores(selectedCompetition)
                setLiveScores(scores)
            } catch (err) {
                console.error('Error loading live scores:', err)
                setError('Gagal memuat skor langsung')
            } finally {
                setLoading(false)
            }
        }

        if (selectedCompetition) {
            loadLiveScores()
            
            // Set up polling for live updates (every 30 seconds)
            const interval = setInterval(loadLiveScores, 30000)
            return () => clearInterval(interval)
        }
    }, [selectedCompetition])

    // Add animation effect for score updates
    const [animatedScores, setAnimatedScores] = useState<Set<number>>(new Set())

    useEffect(() => {
        if (liveScores.length > 0) {
            // Trigger animation for updated scores
            const timer = setTimeout(() => {
                setAnimatedScores(new Set())
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [liveScores])

    // Add medal animation for top 3
    const getMedalAnimation = (index: number) => {
        switch (index) {
            case 0: return 'animate-pulse text-yellow-500 text-2xl'
            case 1: return 'animate-bounce text-gray-400 text-xl'
            case 2: return 'animate-wiggle text-yellow-600 text-xl'
            default: return ''
        }
    }

    const handleCompetitionChange = (competitionId: number) => {
        setSelectedCompetition(competitionId)
    }

    if (loading && !liveScores.length) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat skor langsung...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!activeCompetitions.length) {
        return (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🏹</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada kompetisi aktif</h3>
                <p className="text-gray-500">Saat ini tidak ada kompetisi yang sedang berlangsung</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-red-900">🎯</span>
                        Skor Langsung
                    </h2>
                    <p className="text-gray-600 mt-1">Pantau perkembangan kompetisi secara real-time</p>
                </div>
                
                {activeCompetitions.length > 1 && (
                    <div className="w-full md:w-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pilih Kompetisi
                        </label>
                        <select
                            value={selectedCompetition || ''}
                            onChange={(e) => handleCompetitionChange(Number(e.target.value))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {activeCompetitions.map((competition) => (
                                <option key={competition.id_competitions} value={competition.id_competitions}>
                                    {competition.event_name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {liveScores.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peringkat</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atlet</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ronde</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {liveScores.sort((a, b) => b.score - a.score).map((score, index) => (
                                <tr key={score.id_live_scores} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 font-medium text-lg">{index + 1}</span>
                                            {index === 0 && (
                                                <span className={getMedalAnimation(index)}>🏆</span>
                                            )}
                                            {index === 1 && (
                                                <span className={getMedalAnimation(index)}>🥈</span>
                                            )}
                                            {index === 2 && (
                                                <span className={getMedalAnimation(index)}>🥉</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{score.athlete_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-semibold transform hover:scale-105 transition-transform duration-200">
                                            {score.score}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{score.round}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada skor</h3>
                    <p className="text-gray-500">Skor akan muncul saat kompetisi dimulai</p>
                </div>
            )}
            
            <div className="mt-4 text-right">
                <p className="text-xs text-gray-500">
                    {activeCompetitions.length > 0 && selectedCompetition && (
                        <>Perbarui terakhir: {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</>
                    )}
                </p>
            </div>
        </div>
    )
}