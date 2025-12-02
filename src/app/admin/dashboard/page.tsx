const Dashboard = () => {
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
                    <p className="text-3xl font-bold text-gray-800">150</p>
                    <div className="mt-2 text-green-600 text-sm font-medium">+12 dari bulan lalu</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <span className="text-red-600 text-2xl">🏆</span>
                        </div>
                        <span className="text-red-700 text-sm font-medium">Aktif</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-1 text-gray-900">Lomba</h2>
                    <p className="text-3xl font-bold text-gray-800">25</p>
                    <div className="mt-2 text-blue-600 text-sm font-medium">3 bulan ini</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <span className="text-red-600 text-2xl">🎯</span>
                        </div>
                        <span className="text-red-700 text-sm font-medium">Aktif</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-1 text-gray-900">Kelas Latihan</h2>
                    <p className="text-3xl font-bold text-gray-800">5</p>
                    <div className="mt-2 text-purple-600 text-sm font-medium">100% kapasitas</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <span className="text-red-600 text-2xl">🏅</span>
                        </div>
                        <span className="text-red-700 text-sm font-medium">Total</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-1 text-gray-900">Prestasi</h2>
                    <p className="text-3xl font-bold text-gray-800">47</p>
                    <div className="mt-2 text-orange-600 text-sm font-medium">+5 tahun ini</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900">Pertumbuhan Anggota</h2>
                    <div className="flex items-end justify-center space-x-4 h-48">
                        <div className="text-center flex-1">
                            <div className="bg-slate-200 h-24 rounded-t mx-auto" style={{width: '80%'}}></div>
                            <p className="text-sm mt-3 font-medium text-gray-600">Jan</p>
                        </div>
                        <div className="text-center flex-1">
                            <div className="bg-slate-300 h-32 rounded-t mx-auto" style={{width: '80%'}}></div>
                            <p className="text-sm mt-3 font-medium text-gray-600">Feb</p>
                        </div>
                        <div className="text-center flex-1">
                            <div className="bg-slate-200 h-28 rounded-t mx-auto" style={{width: '80%'}}></div>
                            <p className="text-sm mt-3 font-medium text-gray-600">Mar</p>
                        </div>
                        <div className="text-center flex-1">
                            <div className="bg-slate-400 h-36 rounded-t mx-auto" style={{width: '80%'}}></div>
                            <p className="text-sm mt-3 font-medium text-gray-600">Apr</p>
                        </div>
                        <div className="text-center flex-1">
                            <div className="bg-slate-500 h-40 rounded-t mx-auto" style={{width: '80%'}}></div>
                            <p className="text-sm mt-3 font-medium text-gray-600">May</p>
                        </div>
                        <div className="text-center flex-1">
                            <div className="bg-slate-400 h-38 rounded-t mx-auto" style={{width: '80%'}}></div>
                            <p className="text-sm mt-3 font-medium text-gray-600">Jun</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900">Aktivitas Terbaru</h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border-l-4 border-green-400">
                            <div className="bg-green-50 rounded-full p-2">
                                <span className="text-green-600 text-sm">🏆</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 text-sm">Lomba Baru Ditambahkan</p>
                                <p className="text-sm text-gray-600">National Championship 2023</p>
                                <p className="text-xs text-gray-500 mt-1">2 jam yang lalu</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-400">
                            <div className="bg-blue-50 rounded-full p-2">
                                <span className="text-blue-600 text-sm">👤</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 text-sm">Anggota Baru Bergabung</p>
                                <p className="text-sm text-gray-600">Budi Santoso telah bergabung</p>
                                <p className="text-xs text-gray-500 mt-1">5 jam yang lalu</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border-l-4 border-orange-400">
                            <div className="bg-orange-50 rounded-full p-2">
                                <span className="text-orange-600 text-sm">🏅</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 text-sm">Prestasi Baru</p>
                                <p className="text-sm text-gray-600">Juara 1 Regional Cup</p>
                                <p className="text-xs text-gray-500 mt-1">1 hari yang lalu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
