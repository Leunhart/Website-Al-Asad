const Navbar = () => {
  return (
    <nav className="bg-red-600 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <div>
          <button className="bg-red-700 px-4 py-2 rounded">Logout</button>
        </div>
      </div>
    </nav>
  )
}
export default Navbar