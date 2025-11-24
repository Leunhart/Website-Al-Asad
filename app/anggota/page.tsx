const Anggota = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Archer Management</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add New Archer</button>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Role</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-4 border">Ahmad Rahman</td>
                        <td className="py-2 px-4 border">ahmad@example.com</td>
                        <td className="py-2 px-4 border">Archer</td>
                        <td className="py-2 px-4 border">
                            <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border">Siti Nurhaliza</td>
                        <td className="py-2 px-4 border">siti@example.com</td>
                        <td className="py-2 px-4 border">Coach</td>
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

export default Anggota