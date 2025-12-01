import RegistrationForm from '@/components/pendaftaran/RegistrationForm'

export default function PendaftaranPage() {
  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <a href="/landing" className="inline-block mb-6 text-sm opacity-80 hover:opacity-100">
            ← Kembali ke Beranda
          </a>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Pendaftaran Anggota Baru
          </h1>
          <p className="text-lg opacity-85">
            Isi formulir di bawah untuk mendaftar sebagai anggota Al-Asad Panahan Academy
          </p>
        </div>

        <div className="bg-[#1a2e1f]/50 backdrop-blur border border-[#e7efe9]/10 rounded-2xl p-8 md:p-10">
          <RegistrationForm />
        </div>
      </div>
    </main>
  )
}
