import type { Testimonial } from '@/types/database'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="px-6 py-16 max-w-7xl mx-auto w-full bg-transparent">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#EEEAE4]">Testimoni</h2>
          <p className="max-w-2xl mx-auto text-[#EEEAE4]/85">
            Apa kata mereka yang sudah bergabung dengan kami
          </p>
        </div>
        <div className="text-center text-[#EEEAE4]/70">Belum ada testimoni.</div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="px-6 py-16 max-w-7xl mx-auto w-full bg-transparent">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#EEEAE4]">Testimoni</h2>
        <p className="max-w-2xl mx-auto text-[#EEEAE4]/85">
          Apa kata mereka yang sudah bergabung dengan kami
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.unique_id} className="p-6 rounded-2xl bg-[#2B2527] shadow-[0_12px_40px_rgba(0,0,0,0.22)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                <span key={i} className="text-[#C7A04F] text-xl">★</span>
              ))}
            </div>
            <p className="text-sm leading-relaxed mb-6 text-[#EEEAE4]/85 italic">
              &ldquo;{t.content}&rdquo;
            </p>
            <div className="pt-4 border-t border-[#8C8F8E]/30">
              <div className="font-bold text-sm text-[#EEEAE4]">{t.reviewer_name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
