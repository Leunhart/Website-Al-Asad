'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getUsers, getMonthlyMemberGrowth, getMonthlyCoachGrowth, getMonthlyStudentGrowth } from '../../../actions/users'
import { getCompetitions } from '../../../actions/competitions'
import { getAchievements } from '../../../actions/achievements'
import { getCoaches } from '../../../actions/coaches'
import { getStudents } from '../../../actions/students'
import { getAcademies } from '../../../actions/academies'
import { getTestimonials } from '../../../actions/testimonials'

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalAnggota: 0,
        totalLomba: 0,
        totalKelas: 0,
        totalPrestasi: 0,
        totalSiswa: 0,
        totalAkademi: 0,
        pendingRegistrations: 0,
        totalTestimoni: 0
    })

    const [monthlyGrowth, setMonthlyGrowth] = useState<{month: string, count: number}[]>([])
    const [coachGrowth, setCoachGrowth] = useState<{month: string, count: number}[]>([])
    const [studentGrowth, setStudentGrowth] = useState<{month: string, count: number}[]>([])
    const [recentActivities, setRecentActivities] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDashboardData()
    }, [])

    const loadDashboardData = async () => {
        try {
            const [users, competitions, achievements, coaches, students, academies, testimonials, growthData, coachData, studentData] = await Promise.all([
                getUsers(),
                getCompetitions(),
                getAchievements(),
                getCoaches(),
                getStudents(),
                getAcademies(),
                getTestimonials(),
                getMonthlyMemberGrowth(),
                getMonthlyCoachGrowth(),
                getMonthlyStudentGrowth()
            ])

            // Get pending registrations count
            let pendingCount = 0
            try {
                const response = await fetch('/api/admin/registrations')
                const data = await response.json()
                if (data.ok) {
                    pendingCount = data.data.length
                }
            } catch (error) {
                console.error('Error fetching pending registrations:', error)
            }

            setStats({
                totalAnggota: users.length,
                totalLomba: competitions.length,
                totalKelas: coaches.length,
                totalPrestasi: achievements.length,
                totalSiswa: students.length,
                totalAkademi: academies.length,
                pendingRegistrations: pendingCount,
                totalTestimoni: testimonials.length
            })

            setMonthlyGrowth(growthData)
            setCoachGrowth(coachData)
            setStudentGrowth(studentData)

            // Data aktivitasa
            const activities = []

            // Recent competitions
            const recentCompetitions = competitions.slice(0, 2).map(comp => ({
                type: 'competition',
                title: 'Lomba Baru Ditambahkan',
                description: comp.event_name,
                time: 'Baru saja',
                icon: '🏆',
                color: 'green'
            }))

            // Recent achievements
            const recentAchievements = achievements.slice(0, 2).map(ach => ({
                type: 'achievement',
                title: 'Prestasi Baru',
                description: ach.event_name,
                time: ach.date ? new Date(ach.date).toLocaleDateString('id-ID') : 'Baru saja',
                icon: '🏅',
                color: 'orange'
            }))

            // Recent students
            const recentStudents = students.slice(0, 1).map(student => ({
                type: 'student',
                title: 'Siswa Baru Bergabung',
                description: student.full_name,
                time: 'Baru saja',
                icon: '👨‍🎓',
                color: 'blue'
            }))

            activities.push(...recentCompetitions, ...recentAchievements, ...recentStudents)
            activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
            setRecentActivities(activities.slice(0, 5))

        } catch (error) {
            console.error('Error loading dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 space-y-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Akademi Panahan</h1>
                <p className="text-gray-600 text-lg">Selamat datang di panel admin Akademi Panahan</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <span className="text-red-600 text-2xl">👥</span>
                        </div>
                        <span className="text-red-700 text-sm font-medium">Total</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-1 text-gray-900">Anggota</h2>
                    <p className="text-3xl font-bold text-gray-800">{loading ? '...' : stats.totalAnggota}</p>
                    <div className="mt-2 text-green-600 text-sm font-medium">Total anggota aktif</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <span className="text-red-600 text-2xl">👨‍🎓</span>
                        </div>
                        <span className="text-red-700 text-sm font-medium">Total</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-1 text-gray-900">Siswa</h2>
                    <p className="text-3xl font-bold text-gray-800">{loading ? '...' : stats.totalSiswa}</p>
                    <div className="mt-2 text-blue-600 text-sm font-medium">Siswa terdaftar</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <span className="text-red-600 text-2xl">🏛️</span>
                        </div>
                        <span className="text-red-700 text-sm font-medium">Total</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-1 text-gray-900">Akademi</h2>
                    <p className="text-3xl font-bold text-gray-800">{loading ? '...' : stats.totalAkademi}</p>
                    <div className="mt-2 text-purple-600 text-sm font-medium">Cabang akademi</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <span className="text-red-600 text-2xl">⏳</span>
                        </div>
                        <span className="text-red-700 text-sm font-medium">Pending</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-1 text-gray-900">Registrasi</h2>
                    <p className="text-3xl font-bold text-gray-800">{loading ? '...' : stats.pendingRegistrations}</p>
                    <div className="mt-2 text-yellow-600 text-sm font-medium">Menunggu approval</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <span className="text-red-600 text-2xl">🏆</span>
                        </div>
                        <span className="text-red-700 text-sm font-medium">Aktif</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-1 text-gray-900">Lomba</h2>
                    <p className="text-3xl font-bold text-gray-800">{loading ? '...' : stats.totalLomba}</p>
                    <div className="mt-2 text-blue-600 text-sm font-medium">Total kompetisi</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <span className="text-red-600 text-2xl">🎯</span>
                        </div>
                        <span className="text-red-700 text-sm font-medium">Aktif</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-1 text-gray-900">Pelatih</h2>
                    <p className="text-3xl font-bold text-gray-800">{loading ? '...' : stats.totalKelas}</p>
                    <div className="mt-2 text-purple-600 text-sm font-medium">Total pelatih</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <span className="text-red-600 text-2xl">🏅</span>
                        </div>
                        <span className="text-red-700 text-sm font-medium">Total</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-1 text-gray-900">Prestasi</h2>
                    <p className="text-3xl font-bold text-gray-800">{loading ? '...' : stats.totalPrestasi}</p>
                    <div className="mt-2 text-orange-600 text-sm font-medium">Total pencapaian</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <span className="text-red-600 text-2xl">📝</span>
                        </div>
                        <span className="text-red-700 text-sm font-medium">Total</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-1 text-gray-900">Testimoni</h2>
                    <p className="text-3xl font-bold text-gray-800">{loading ? '...' : stats.totalTestimoni}</p>
                    <div className="mt-2 text-indigo-600 text-sm font-medium">Ulasan siswa</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">📈 Tren Pertumbuhan Coach & Siswa</h2>
                        <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gradient-to-t from-blue-500 to-blue-300 rounded"></div>
                                <span className="text-gray-600">Coach</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gradient-to-t from-green-500 to-green-300 rounded"></div>
                                <span className="text-gray-600">Siswa</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-64 bg-gradient-to-b from-gray-50 to-white rounded-lg p-4 border">
                        {(() => {
                            // If we don't have data yet, show loading
                            if (coachGrowth.length === 0 || studentGrowth.length === 0) {
                                return (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="text-center">
                                            <div className="bg-gray-200 rounded-full w-12 h-12 mx-auto animate-pulse mb-2"></div>
                                            <p className="text-sm font-semibold text-gray-400">Loading chart...</p>
                                        </div>
                                    </div>
                                )
                            }

                            // Menggabungkan data coach dan student berdasarkan bulan
                            const chartData = coachGrowth.map((coachItem, index) => {
                                const studentItem = studentGrowth[index] || { count: 0 }
                                const [year, month] = coachItem.month.split('-')
                                const monthIndex = parseInt(month) - 1
                                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
                                const monthName = monthNames[monthIndex]

                                return {
                                    month: monthName,
                                    coach: coachItem.count,
                                    student: studentItem.count,
                                    fullMonth: coachItem.month
                                }
                            })

                            return (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={chartData}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 20,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis
                                            dataKey="month"
                                            stroke="#6b7280"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#6b7280"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#ffffff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                fontSize: '12px'
                                            }}
                                            labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                                            formatter={(value: number, name: string) => [
                                                value,
                                                name === 'coach' ? 'Coach' : 'Siswa'
                                            ]}
                                        />
                                        <Legend
                                            wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                                            iconType="circle"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="coach"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
                                            name="Coach"
                                            animationDuration={1500}
                                            animationEasing="ease-in-out"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="student"
                                            stroke="#10b981"
                                            strokeWidth={3}
                                            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                                            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#ffffff' }}
                                            name="Siswa"
                                            animationDuration={1500}
                                            animationEasing="ease-in-out"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            )
                        })()}
                    </div>

                    {/* Chart Summary */}
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                            <p className="text-xs text-blue-600 font-medium">Rata-rata Coach</p>
                            <p className="text-lg font-bold text-blue-800">
                                {coachGrowth.length > 0
                                    ? Math.round(coachGrowth.reduce((sum, item) => sum + item.count, 0) / coachGrowth.length)
                                    : Math.round(stats.totalKelas / 6)
                                }
                            </p>
                            <p className="text-xs text-blue-500">per bulan</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                            <p className="text-xs text-green-600 font-medium">Rata-rata Siswa</p>
                            <p className="text-lg font-bold text-green-800">
                                {studentGrowth.length > 0
                                    ? Math.round(studentGrowth.reduce((sum, item) => sum + item.count, 0) / studentGrowth.length)
                                    : Math.round(stats.totalSiswa / 6)
                                }
                            </p>
                            <p className="text-xs text-green-500">per bulan</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
                            <p className="text-xs text-purple-600 font-medium">Total Periode</p>
                            <p className="text-lg font-bold text-purple-800">
                                {coachGrowth.length > 0 && studentGrowth.length > 0
                                    ? coachGrowth.reduce((sum, item) => sum + item.count, 0) + studentGrowth.reduce((sum, item) => sum + item.count, 0)
                                    : stats.totalAnggota + stats.totalSiswa
                                }
                            </p>
                            <p className="text-xs text-purple-500">6 bulan</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900">Aktivitas Terbaru</h2>
                    <div className="space-y-3">
                        {loading ? (
                            <div className="text-center py-4">
                                <p className="text-gray-500">Memuat aktivitas...</p>
                            </div>
                        ) : recentActivities.length > 0 ? recentActivities.map((activity, index) => (
                            <div key={index} className={`flex items-start gap-4 p-3 bg-gray-50 rounded-lg border-l-4 border-${activity.color}-400`}>
                                <div className={`bg-${activity.color}-50 rounded-full p-2`}>
                                    <span className={`text-${activity.color}-600 text-sm`}>{activity.icon}</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                                    <p className="text-sm text-gray-600">{activity.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-4">
                                <p className="text-gray-500">Belum ada aktivitas terbaru</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
