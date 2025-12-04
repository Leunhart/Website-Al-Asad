import Link from 'next/link'
import { User, Trophy, LayoutDashboard, Wrench, Calendar, Award, Building, GraduationCap, MessageSquare, CheckCircle } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white text-gray-800 p-6 shadow-sm border-r-2 border-red-900 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-8 text-red-900 border-b border-red-200 pb-2">Admin Panel</h2>
      <nav className="space-y-2">
        <Link href="/admin/dashboard" className="flex items-center py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-900 transition-all duration-200 border-l-4 border-transparent hover:border-red-600">
          <span className="mr-3 text-gray-500"><LayoutDashboard size={18}/></span> <span className="font-medium text-gray-700">Dashboard</span>
        </Link>
        <Link href="/admin/anggota" className="flex items-center py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-900 transition-all duration-200 border-l-4 border-transparent hover:border-red-600">
          <span className="mr-3 text-gray-500"><User size={18}/></span> <span className="font-medium text-gray-700">Anggota</span>
        </Link>
        <Link href="/admin/lomba" className="flex items-center py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-900 transition-all duration-200 border-l-4 border-transparent hover:border-red-600">
          <span className="mr-3 text-gray-500"><Trophy size={18}/></span> <span className="font-medium text-gray-700">Lomba</span>
        </Link>
        <Link href="/admin/peralatan" className="flex items-center py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-900 transition-all duration-200 border-l-4 border-transparent hover:border-red-600">
          <span className="mr-3 text-gray-500"><Wrench size={18}/></span> <span className="font-medium text-gray-700">Peralatan</span>
        </Link>
        <Link href="/admin/jadwal" className="flex items-center py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-900 transition-all duration-200 border-l-4 border-transparent hover:border-red-600">
          <span className="mr-3 text-gray-500"><Calendar size={18}/></span> <span className="font-medium text-gray-700">Jadwal Latihan</span>
        </Link>
        <Link href="/admin/prestasi" className="flex items-center py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-900 transition-all duration-200 border-l-4 border-transparent hover:border-red-600">
          <span className="mr-3 text-gray-500"><Award size={18}/></span> <span className="font-medium text-gray-700">Prestasi</span>
        </Link>
        <Link href="/admin/akademi" className="flex items-center py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-900 transition-all duration-200 border-l-4 border-transparent hover:border-red-600">
          <span className="mr-3 text-gray-500"><Building size={18}/></span> <span className="font-medium text-gray-700">Akademi</span>
        </Link>
        <Link href="/admin/siswa" className="flex items-center py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-900 transition-all duration-200 border-l-4 border-transparent hover:border-red-600">
          <span className="mr-3 text-gray-500"><GraduationCap size={18}/></span> <span className="font-medium text-gray-700">Siswa</span>
        </Link>
        <Link href="/admin/testimoni" className="flex items-center py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-900 transition-all duration-200 border-l-4 border-transparent hover:border-red-600">
          <span className="mr-3 text-gray-500"><MessageSquare size={18}/></span> <span className="font-medium text-gray-700">Testimoni</span>
        </Link>
        <Link href="/admin/registrasi" className="flex items-center py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-900 transition-all duration-200 border-l-4 border-transparent hover:border-red-600">
          <span className="mr-3 text-gray-500"><CheckCircle size={18}/></span> <span className="font-medium text-gray-700">Registrasi</span>
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar