import Link from 'next/link'
import { User, Trophy, LayoutDashboard, ToolCaseIcon, Link2Icon } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className="w-64 bg-white text-gray-800 p-6 shadow-xl border-r-4 border-red-100">
      <h2 className="text-2xl font-bold mb-8 text-red-600 border-b-2 border-red-200 pb-2">Admin Panel</h2>
      <nav className="space-y-3">
        <Link href="/admin/dashboard" className="flex items-center py-4 px-5 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 border-l-4 border-transparent hover:border-red-500">
          <span className="mr-4 text-xl"><LayoutDashboard size={20}/></span> <span className="font-medium">Dashboard</span>
        </Link>
        <Link href="/admin/anggota" className="flex items-center py-4 px-5 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 border-l-4 border-transparent hover:border-red-500">
          <span className="mr-4 text-xl"><User size={20}/></span> <span className="font-medium">Anggota</span>
        </Link>
        <Link href="/admin/lomba" className="flex items-center py-4 px-5 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 border-l-4 border-transparent hover:border-red-500">
          <span className="mr-4 text-xl"><Trophy size={20}/></span> <span className="font-medium">Lomba</span>
        </Link>
        <Link href="/admin/peralatan" className="flex items-center py-4 px-5 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 border-l-4 border-transparent hover:border-red-500">
          <span className="mr-4 text-xl"><ToolCaseIcon size={20}/></span> <span className="font-medium">Peralatan</span>
        </Link>
        <Link href="/admin/jadwal" className="flex items-center py-4 px-5 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 border-l-4 border-transparent hover:border-red-500">  
          <span className="mr-4 text-xl"><Link2Icon size={20}/></span> <span className="font-medium">Jadwal Latihan</span>
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar