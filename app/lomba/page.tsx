const Lomba = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Tournament Management</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add New Tournament</button>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Date</th>
                        <th className="py-2 px-4 border">Status</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-4 border">National Archery Championship</td>
                        <td className="py-2 px-4 border">2023-12-01</td>
                        <td className="py-2 px-4 border">Active</td>
                        <td className="py-2 px-4 border">
                            <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border">Youth Archery Cup</td>
                        <td className="py-2 px-4 border">2024-01-15</td>
                        <td className="py-2 px-4 border">Upcoming</td>
                        <td className="py-2 px-4 border">
                            <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Lomba