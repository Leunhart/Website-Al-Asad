import { logout } from '../../actions/auth'

const Navbar = () => {
  return (
    <nav className="bg-white border-b-2 border-red-900 text-gray-900 p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 rounded-full p-2">
            <span className="text-red-600 text-xl">🎯</span>
          </div>
          <h1 className="text-xl font-semibold text-red-900">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-gray-700">Selamat datang,</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <div className="bg-red-100 rounded-full p-2">
            <span className="text-red-600 text-lg">👤</span>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-white"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}
export default Navbar