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
