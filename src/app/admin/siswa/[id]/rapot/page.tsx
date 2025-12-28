'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type HistoryRow = {
  sheet_id: string
  student_id: number
  title: string
  location: string | null
  notes: string | null
  created_at: string | null
  total_score_resolved: number | null
  arrows_count: number | null
  avg_per_arrow: number | null
}

type GraphPoint = {
  d: string | null
  total_score: number
}

const emptyScores = Array.from({ length: 5 }, () => Array.from({ length: 6 }, () => 0))

export default function RapotPage() {
  const params = useParams<{ id: string }>()
  const studentId = Number(params?.id)
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [scores, setScores] = useState<number[][]>(() => emptyScores.map((row) => [...row]))
  const [history, setHistory] = useState<HistoryRow[]>([])
  const [graph, setGraph] = useState<GraphPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const roundTotals = useMemo(
    () => scores.map((round) => round.reduce((sum, score) => sum + score, 0)),
    [scores],
  )
  const totalScore = useMemo(
    () => roundTotals.reduce((sum, roundTotal) => sum + roundTotal, 0),
    [roundTotals],
  )

  const loadData = async () => {
    if (!Number.isInteger(studentId)) return
    setLoading(true)
    try {
      const [historyRes, graphRes] = await Promise.all([
        fetch(`/api/rapot/${studentId}/history`),
        fetch(`/api/rapot/${studentId}/graph`),
      ])

      const historyJson = await historyRes.json()
      const graphJson = await graphRes.json()

      setHistory(historyJson?.data ?? [])
      setGraph(graphJson?.data ?? [])
    } catch (loadError) {
      console.error('Error loading rapot data:', loadError)
      setError('Gagal memuat data rapot.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [studentId])

  const updateScore = (roundIndex: number, arrowIndex: number, value: string) => {
    const parsed = value === '' ? 0 : Number(value)
    if (!Number.isInteger(parsed) || parsed < 0) return
    setScores((prev) =>
      prev.map((round, rIdx) =>
        rIdx === roundIndex
          ? round.map((score, aIdx) => (aIdx === arrowIndex ? parsed : score))
          : round,
      ),
    )
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (!Number.isInteger(studentId)) {
      setError('ID siswa tidak valid.')
      return
    }

    if (title.trim().length === 0) {
      setError('Judul wajib diisi.')
      return
    }

    const payload = {
      student_id: studentId,
      title: title.trim(),
      location: location.trim() || null,
      notes: notes.trim() || null,
      scores,
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/scores/simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data?.error || 'Gagal menyimpan skor.')
        return
      }

      setTitle('')
      setLocation('')
      setNotes('')
      setScores(emptyScores.map((row) => [...row]))
      setSuccess(`Skor tersimpan. Total: ${data.total_score}`)
      await loadData()
    } catch (submitError) {
      console.error('Error submitting scores:', submitError)
      setError('Gagal menyimpan skor.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!Number.isInteger(studentId)) {
    return (
      <div className="p-6">
        <p className="text-red-700">ID siswa tidak valid.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rapot Siswa</h1>
          <p className="text-gray-600">Input skor, grafik perkembangan, dan histori rapot.</p>
        </div>
        <Link
          href="/admin/siswa"
          className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          Kembali ke Siswa
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Grafik Skor</h2>
          <p className="text-sm text-gray-500 mb-6">Perkembangan total skor dari setiap sheet.</p>
          <div className="h-64">
            {loading ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                Memuat grafik...
              </div>
            ) : graph.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                Belum ada data grafik.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graph} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="d" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="total_score" stroke="#991b1b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ringkasan</h2>
          <p className="text-sm text-gray-500 mb-6">Total skor input saat ini.</p>
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">Total Skor</p>
              <p className="text-2xl font-bold text-red-900">{totalScore}</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">Jumlah Panah</p>
              <p className="text-xl font-semibold text-gray-800">30</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">Rata-rata per Panah</p>
              <p className="text-xl font-semibold text-gray-800">
                {(totalScore / 30).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Input Skor</h2>
        <p className="text-sm text-gray-500 mb-6">5 ronde, masing-masing 6 panah.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul (Jarak - Tanggal)
              </label>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="30m - 2025-03-18"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Field A"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
              <input
                type="text"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Catatan singkat"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-gray-600">Ronde</th>
                  {Array.from({ length: 6 }, (_, i) => (
                    <th key={i} className="px-3 py-2 text-center text-gray-600">
                      Panah {i + 1}
                    </th>
                  ))}
                  <th className="px-3 py-2 text-right text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((round, rIdx) => (
                  <tr key={rIdx} className="border-t border-gray-200">
                    <td className="px-3 py-2 font-medium text-gray-700">Ronde {rIdx + 1}</td>
                    {round.map((score, aIdx) => (
                      <td key={aIdx} className="px-2 py-2">
                        <input
                          type="number"
                          min={0}
                          value={score}
                          onChange={(event) => updateScore(rIdx, aIdx, event.target.value)}
                          className="w-16 rounded-md border border-gray-300 px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold text-gray-800">
                      {roundTotals[rIdx]}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td colSpan={7} className="px-3 py-2 text-right font-semibold text-gray-700">
                    Total Semua Ronde
                  </td>
                  <td className="px-3 py-2 text-right font-bold text-red-900">{totalScore}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 rounded-lg bg-red-900 text-white font-semibold hover:bg-red-800 disabled:opacity-60"
            >
              {submitting ? 'Menyimpan...' : 'Simpan Skor'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Histori Skor</h2>
        <p className="text-sm text-gray-500 mb-6">50 data terbaru.</p>

        {loading ? (
          <div className="text-gray-400">Memuat histori...</div>
        ) : history.length === 0 ? (
          <div className="text-gray-400">Belum ada histori rapot.</div>
        ) : (
          <div className="space-y-3">
            {history.map((row) => (
              <div
                key={row.sheet_id}
                className="rounded-lg border border-gray-200 p-4 flex flex-wrap items-center justify-between gap-3"
              >
                <div>
                  <p className="font-semibold text-gray-900">{row.title}</p>
                  <p className="text-xs text-gray-500">
                    {row.created_at ? new Date(row.created_at).toLocaleDateString('id-ID') : '-'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {row.location || 'Lokasi belum diisi'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-lg font-bold text-red-900">
                    {row.total_score_resolved ?? 0}
                  </p>
                  <p className="text-xs text-gray-500">
                    Rata-rata: {row.avg_per_arrow ? row.avg_per_arrow.toFixed(2) : '-'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
