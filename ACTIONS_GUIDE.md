# Panduan Penggunaan Server Actions

Dokumen ini menjelaskan cara menggunakan server actions yang tersedia dalam aplikasi admin Akademi Panahan.

**Catatan**: Semua import menggunakan relative path (`../`) bukan path alias (`@/`) untuk kompatibilitas dengan konfigurasi TypeScript saat ini.

## Daftar Server Actions

### 1. Authentication Actions (`src/actions/auth.ts`)

#### `login(formData: FormData)`
**Fungsi**: Melakukan autentikasi pengguna dan redirect ke dashboard admin.

**Parameter**:
- `formData`: FormData object dengan field `email` dan `password`

**Penggunaan**:
```tsx
'use client'

import { login } from '@/src/actions/auth'

export default function LoginForm() {
  return (
    <form action={login}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}
```

**Return**: Redirect ke `/admin/dashboard` jika berhasil, atau object error jika gagal.

#### `logout()`
**Fungsi**: Keluar dari sesi pengguna dan redirect ke halaman login.

**Penggunaan**:
```tsx
import { logout } from '@/src/actions/auth'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit">Logout</button>
    </form>
  )
}
```

#### `getUser()`
**Fungsi**: Mendapatkan data pengguna yang sedang login.

**Return**: Object user dari Supabase auth atau null.

**Penggunaan**:
```tsx
import { getUser } from '@/src/actions/auth'

export default async function UserProfile() {
  const user = await getUser()

  if (!user) {
    return <div>Not logged in</div>
  }

  return <div>Welcome, {user.email}</div>
}
```

### 2. Coaches Actions (`src/actions/coaches.ts`)

#### `getCoaches()`
**Fungsi**: Mengambil semua data pelatih dari database.

**Return**: Array of Coach objects atau array kosong jika error.

**Penggunaan**:
```tsx
import { getCoaches } from '../actions/coaches'

export default async function CoachesList() {
  const coaches = await getCoaches()

  return (
    <div>
      {coaches.map((coach: any) => (
        <div key={coach.id_coaches}>
          <h3>{coach.full_name}</h3>
          <p>{coach.phone}</p>
        </div>
      ))}
    </div>
  )
}
```

### 3. Achievements Actions (`src/actions/achievements.ts`)

#### `getAchievements()`
**Fungsi**: Mengambil semua data prestasi dari database, diurutkan berdasarkan tanggal terbaru.

**Return**: Array of Achievement objects atau array kosong jika error.

**Penggunaan**:
```tsx
import { getAchievements } from '../actions/achievements'

export default async function AchievementsPage() {
  const achievements = await getAchievements()

  return (
    <div>
      {achievements.map((achievement: any) => (
        <div key={achievement.id_achievements}>
          <h3>{achievement.event_name}</h3>
          <p>Atlet: {achievement.athlete_name}</p>
          <span>{achievement.date}</span>
        </div>
      ))}
    </div>
  )
}
```

## Struktur Database

### Coach
```typescript
interface Coach {
  id: string
  name: string
  specialization: string
  experience_years: number
  created_at: string
  updated_at: string
}
```

### Achievement
```typescript
interface Achievement {
  id: string
  title: string
  description: string
  date: string
  category: string
  athlete_name?: string
  competition_name?: string
  created_at: string
  updated_at: string
}
```

## Error Handling

Semua server actions menggunakan try-catch untuk menangani error:

- **Network errors**: Ditangani dengan catch block
- **Database errors**: Error dari Supabase dicatat ke console
- **Authentication errors**: Return object dengan property `error`

## Best Practices

1. **Server Components**: Gunakan server actions di dalam Server Components untuk performa optimal.

2. **Error Handling**: Selalu periksa return value untuk error handling yang tepat.

3. **Loading States**: Implementasi loading states saat memanggil server actions.

4. **Form Validation**: Lakukan validasi di client-side sebelum mengirim data ke server actions.

5. **Type Safety**: Gunakan TypeScript interfaces untuk memastikan type safety.

## Contoh Implementasi Lengkap

### Form untuk Menambah Achievement
```tsx
'use client'

import { useState } from 'react'

export default function AddAchievementForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError('')

    try {
      // Server action call would go here
      // const result = await createAchievement(formData)

      // For now, just simulate
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Handle success
      console.log('Achievement added successfully')
    } catch (err) {
      setError('Failed to add achievement')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="title" placeholder="Achievement Title" required />
      <textarea name="description" placeholder="Description" required />
      <input name="date" type="date" required />
      <select name="category" required>
        <option value="individual">Individual</option>
        <option value="team">Team</option>
        <option value="regional">Regional</option>
        <option value="national">National</option>
      </select>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Achievement'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
```

## Pengembangan Selanjutnya

Untuk mengembangkan server actions lebih lanjut:

1. **Tambah CRUD Operations**: Implementasi Create, Update, Delete untuk semua entities
2. **Validation**: Tambahkan validasi menggunakan libraries seperti Zod
3. **Caching**: Implementasi caching untuk performa yang lebih baik
4. **Pagination**: Tambahkan pagination untuk data yang besar
5. **Search & Filter**: Implementasi fitur pencarian dan filter

## Troubleshooting

### Common Issues:

1. **"Module not found"**: Pastikan path import benar
2. **"Type errors"**: Periksa TypeScript interfaces
3. **"Database connection failed"**: Periksa konfigurasi Supabase
4. **"Authentication failed"**: Periksa credentials dan session

### Debug Tips:

- Gunakan `console.log` di server actions untuk debugging
- Periksa browser network tab untuk request/response
- Gunakan React DevTools untuk state management
- Periksa Supabase dashboard untuk database queries