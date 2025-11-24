import Link from 'next/link'

const Dashboard = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-white text-gray-800 p-6 shadow-xl border-r-4 border-red-100">
                <h2 className="text-2xl font-bold mb-8 text-red-600 border-b-2 border-red-200 pb-2">Dashboard Siswa Akademi Panahan</h2>
                <nav className="space-y-3">
                    <Link href="/dashboard" className="flex items-center py-4 px-5 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 border-l-4 border-transparent hover:border-red-500">
                        <span className="mr-4 text-xl">📊</span> <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="/jadwal-latihan" className="flex items-center py-4 px-5 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 border-l-4 border-transparent hover:border-red-500">
                        <span className="mr-4 text-xl">📅</span> <span className="font-medium">Jadwal Latihan</span>
                    </Link>
                    <Link href="/peralatan" className="flex items-center py-4 px-5 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 border-l-4 border-transparent hover:border-red-500">
                        <span className="mr-4 text-xl">🔧</span> <span className="font-medium">Peralatan</span>
                    </Link>
                    <Link href="/info-lomba" className="flex items-center py-4 px-5 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 border-l-4 border-transparent hover:border-red-500">
                        <span className="mr-4 text-xl">🏆</span> <span className="font-medium">Info Lomba</span>
                    </Link>
                </nav>
            </div>
            {/* Main Content */}
            <div className="flex-1 bg-white p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Archery Academy Dashboard</h1>
                    <p className="text-gray-600">Welcome to the admin panel for Akademi Panahan</p>
                </div>
                <hr className="border-red-500 mb-10" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
                        <div className="flex items-center mb-4">
                            <span className="text-3xl mr-3 opacity-90">👤</span>
                            <h2 className="text-xl font-semibold">Total Siswa</h2>
                        </div>
                        <p className="text-4xl font-bold">150</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white">
                        <div className="flex items-center mb-4">
                            <span className="text-3xl mr-3 opacity-90">🏅</span>
                            <h2 className="text-xl font-semibold">Total Lomba</h2>
                        </div>
                        <p className="text-4xl font-bold">25</p>
                    </div>
                    <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl shadow-lg text-white">
                        <div className="flex items-center mb-4">
                            <span className="text-3xl mr-3 opacity-90">🎯</span>
                            <h2 className="text-xl font-semibold">Kelas Latihan Aktif</h2>
                        </div>
                        <p className="text-4xl font-bold">5</p>
                    </div>
                </div>
                <hr className="border-red-500 mb-10" />
                <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900">Siswa per Bulan</h2>
                    <div className="flex items-end justify-center space-x-6">
                        <div className="text-center">
                            <div className="bg-gradient-to-t from-blue-400 to-blue-600 h-24 w-12 rounded-t-lg shadow-md"></div>
                            <p className="text-sm mt-3 font-medium text-gray-700">Jan</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-gradient-to-t from-blue-400 to-blue-600 h-32 w-12 rounded-t-lg shadow-md"></div>
                            <p className="text-sm mt-3 font-medium text-gray-700">Feb</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-gradient-to-t from-blue-400 to-blue-600 h-28 w-12 rounded-t-lg shadow-md"></div>
                            <p className="text-sm mt-3 font-medium text-gray-700">Mar</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-gradient-to-t from-blue-400 to-blue-600 h-30 w-12 rounded-t-lg shadow-md"></div>
                            <p className="text-sm mt-3 font-medium text-gray-700">Apr</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-gradient-to-t from-blue-400 to-blue-600 h-36 w-12 rounded-t-lg shadow-md"></div>
                            <p className="text-sm mt-3 font-medium text-gray-700">May</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-gradient-to-t from-blue-400 to-blue-600 h-34 w-12 rounded-t-lg shadow-md"></div>
                            <p className="text-sm mt-3 font-medium text-gray-700">Jun</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
