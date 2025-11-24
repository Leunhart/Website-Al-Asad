const Lomba = () => {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Manajemen Lomba</h1>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
                    + Tambah Lomba
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* CARD 1 */}
                <div className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition">
                    <h2 className="text-lg font-semibold mb-1">National Archery Championship</h2>
                    <p className="text-sm text-gray-500 mb-3">2023-12-01</p>

                    <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                        Active
                    </span>

                    <div className="flex gap-3 mt-4">
                        <button className="px-3 py-1 text-sm rounded bg-yellow-500 text-white">
                            Edit
                        </button>
                        <button className="px-3 py-1 text-sm rounded bg-red-500 text-white">
                            Delete
                        </button>
                    </div>
                </div>

                {/* CARD 2 */}
                <div className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition">
                    <h2 className="text-lg font-semibold mb-1">Youth Archery Cup</h2>
                    <p className="text-sm text-gray-500 mb-3">2024-01-15</p>

                    <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                        Upcoming
                    </span>

                    <div className="flex gap-3 mt-4">
                        <button className="px-3 py-1 text-sm rounded bg-yellow-500 text-white">
                            Edit
                        </button>
                        <button className="px-3 py-1 text-sm rounded bg-red-500 text-white">
                            Delete
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Lomba
