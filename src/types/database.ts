export interface Academy {
  id_academies: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  logo: string | null;
}

export interface Achievement {
  id_achievements: number;
  event_name: string;
  date: string | null;
  athlete_name: string | null;
  photos: string | null;
  id_academies: number | null;
}

export interface Coach {
  id_coaches: number;
  full_name: string;
  phone: string | null;
  photo: string | null;
  created_at: string | null;
  updated_at: string | null;
  id_academies: number | null;
}

export interface Competition {
  id_competitions: number;
  event_name: string;
  organizer: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  id_academies: number | null;
}

export interface Equipment {
  id_equipment: number;
  name: string;
  type: string;
  quantity: number;
  condition: string;
  location: string;
  id_academies: number | null;
}

export interface Schedule {
  id_schedules: number;
  title: string;
  day: string;
  start_time: string;
  end_time: string;
  location: string;
  coach_name: string;
  max_participants: number;
  description: string | null;
  id_academies: number | null;
}

export interface Testimonial {
  unique_id: number;
  reviewer_name: string;
  content: string;
  rating: number | null;
  id_academies: number | null;
}

export interface User {
  unique_id: number;
  full_name: string;
  role: string; // USER-DEFINED type in DB, treating as string here
  phone: string | null;
  email: string;
  // password: string; // Should not be exposed/handled on client side if possible
  created_at: string | null;
  updated_at: string | null;
  id_coaches: number | null;
}

export interface Student {
  id_students: number; 
  full_name: string;
  gender: string | null;
  date_of_birth: string | null;
  level: string | null;
  achivements: string | null;
  address: string | null;
  status: string | null; // expected: active | inactive
  id_academies: number;
}

export interface Registration {
  id_registrations: string; // uuid
  full_name: string;
  gender: string | null;
  date_of_birth: string | null;
  phone: string | null;
  address: string | null;
  level_requested: string | null;
  status: string | null; // pending | diterima | ditolak
  id_academies: number | null;
  student_id: number | null;
  created_at: string | null;
}
