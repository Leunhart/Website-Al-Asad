"use client"

import { useState, FormEvent, useEffect } from 'react';
import { requestSchedule } from '@/src/actions/schedules';
import { getCoaches } from '@/src/actions/coaches';

interface JadwalLatihanData {
  student_name: string;
  email: string;
  phone: string;
  preferred_day: string;
  preferred_time: string;
  coach_id: string;
  notes?: string;
}

interface Coach {
  id_coaches: number;
  full_name: string;
}

export default function JadwalLatihanForm() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isLoadingCoaches, setIsLoadingCoaches] = useState(true);

  useEffect(() => {
    async function fetchCoaches() {
      try {
        const coachesData = await getCoaches();
        setCoaches(coachesData);
      } catch (error) {
        console.error('Error fetching coaches:', error);
      } finally {
        setIsLoadingCoaches(false);
      }
    }

    fetchCoaches();
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    const form = new FormData(e.currentTarget);
    const data: JadwalLatihanData = {
      student_name: (form.get('student_name') as string || '').trim(),
      email: (form.get('email') as string || '').trim(),
      phone: (form.get('phone') as string || '').trim(),
      preferred_day: (form.get('preferred_day') as string || '').trim(),
      preferred_time: (form.get('preferred_time') as string || '').trim(),
      coach_id: (form.get('coach_id') as string || '').trim(),
      notes: (form.get('notes') as string || '').trim(),
    };

    requestSchedule(data).then(result => {
      if (!result.success) {
        setAlert({ type: 'error', text: result.error || 'Gagal mengirim permintaan jadwal' });
        setLoading(false);
        return;
      }

      setAlert({ type: 'success', text: 'Permintaan jadwal latihan berhasil dikirim! Kami akan menghubungi Anda segera.' });
      setLoading(false);
    }).catch(() => {
      setAlert({ type: 'error', text: 'Terjadi kesalahan sistem. Coba lagi.' });
      setLoading(false);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {alert && (
        <div className={`p-4 rounded-lg ${alert.type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-100' : 'bg-red-500/20 border border-red-500/30 text-red-100'}`}>
          {alert.text}
        </div>
      )}

      <div className="space-y-5">
        <h2 className="text-xl font-semibold border-b border-[#e7efe9]/20 pb-2">Data Siswa</h2>
        <div>
          <label htmlFor="student_name" className="block text-sm font-medium mb-2">
            Nama Lengkap <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="student_name"
            name="student_name"
            required
            className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20"
              placeholder="email@contoh.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Nomor Telepon <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20"
              placeholder="08123456789"
            />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-xl font-semibold border-b border-[#e7efe9]/20 pb-2">
          Preferensi Jadwal
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="preferred_day" className="block text-sm font-medium mb-2">
              Hari Preferensi <span className="text-red-400">*</span>
            </label>
            <select
              id="preferred_day"
              name="preferred_day"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20"
            >
              <option value="">Pilih hari</option>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>
              <option value="Sabtu">Sabtu</option>
              <option value="Minggu">Minggu</option>
            </select>
          </div>
          <div>
            <label htmlFor="preferred_time" className="block text-sm font-medium mb-2">
              Waktu Preferensi <span className="text-red-400">*</span>
            </label>
            <select
              id="preferred_time"
              name="preferred_time"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20"
            >
              <option value="">Pilih waktu</option>
              <option value="08:00-10:00">08:00 - 10:00</option>
              <option value="10:00-12:00">10:00 - 12:00</option>
              <option value="13:00-15:00">13:00 - 15:00</option>
              <option value="15:00-17:00">15:00 - 17:00</option>
              <option value="17:00-19:00">17:00 - 19:00</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-xl font-semibold border-b border-[#e7efe9]/20 pb-2">
          Pilih Pelatih
        </h2>
        <div>
          <label htmlFor="coach_id" className="block text-sm font-medium mb-2">
            Pelatih <span className="text-red-400">*</span>
          </label>
          <select
            id="coach_id"
            name="coach_id"
            required
            disabled={isLoadingCoaches}
            className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20"
          >
            <option value="">Pilih pelatih</option>
            {isLoadingCoaches ? (
              <option value="" disabled>Memuat daftar pelatih...</option>
            ) : coaches.length > 0 ? (
              coaches.map(coach => (
                <option key={coach.id_coaches} value={coach.id_coaches}>
                  {coach.full_name}
                </option>
              ))
            ) : (
              <option value="" disabled>Tidak ada pelatih tersedia</option>
            )}
          </select>
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-xl font-semibold border-b border-[#e7efe9]/20 pb-2">
          Catatan Tambahan
        </h2>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-2">
            Catatan (Opsional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20 resize-none"
            placeholder="Masukkan catatan tambahan jika ada"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-lg bg-[#e7efe9] text-[#0f1f14] font-semibold hover:bg-[#d4e4d6] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? 'Mengirim Permintaan...' : 'Kirim Permintaan Jadwal'}
        </button>
      </div>
    </form>
  );
}