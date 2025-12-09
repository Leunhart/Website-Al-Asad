import { getAchievements } from '@/actions/achievements'
import { getCoaches } from '@/actions/coaches'
import { getTestimonials } from '@/actions/testimonials'
import Hero from '@/components/landing/Hero'
import About from '@/components/landing/About'
import Gallery from '@/components/landing/Gallery'
import Programs from '@/components/landing/Programs'
import Facilities from '@/components/landing/Facilities'
import ContactSection from '@/components/landing/ContactSection'
import Competitions from '@/components/landing/Competitions'
import AchievementsPreview from '@/components/landing/AchievementsPreview'
import CoachesPreview from '@/components/landing/CoachesPreview'
import Testimonials from '@/components/landing/Testimonials'
import CallToAction from '@/components/landing/CallToAction'
import Footer from '@/components/landing/Footer'

export default async function LandingPage() {
	const [achievements, coaches, testimonials] = await Promise.all([
		getAchievements(),
		getCoaches(),
		getTestimonials(),
	])

	const topAchievements = achievements.slice(0, 3)
	const topCoaches = coaches.slice(0, 4)

	return (
		<main className="relative min-h-screen text-[var(--green-text-primary)]">
			{/* Global background image layer */}
			<div className="fixed inset-0 -z-10 bg-[url('/landing-bg.jpg')] bg-cover bg-center" />
			<div className="fixed inset-0 -z-10 bg-black/60" />
			<Hero />
			<About />
			<Facilities />
			<Gallery />
			<Programs />
			<Competitions />
			<ContactSection />
			<section id="prestasi" className="px-6 py-16 max-w-7xl mx-auto w-full">
				<h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Prestasi Terbaru</h2>
				<AchievementsPreview achievements={topAchievements} />
			</section>
			<section className="px-6 py-16 max-w-7xl mx-auto w-full">
				<h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Pelatih Kami</h2>
				<CoachesPreview coaches={topCoaches} />
			</section>
			<Testimonials testimonials={testimonials} />
			<CallToAction />
			<Footer />
		</main>
	)
}

