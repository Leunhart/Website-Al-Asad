import { getAchievements } from '@/src/actions/achievements'
import { getCoaches } from '@/src/actions/coaches'
import { getTestimonials } from '@/src/actions/testimonials'
import { getCompetitions } from '@/src/actions/competitions'
import Hero from '@/src/components/landing/Hero'
import About from '@/src/components/landing/About'
import Gallery from '@/src/components/landing/Gallery'
import Programs from '@/src/components/landing/Programs'
import Facilities from '@/src/components/landing/Facilities'
import ContactSection from '@/src/components/landing/ContactSection'
import CompetitionsPagination from '@/src/components/landing/CompetitionsPagination'
import AchievementsPagination from '@/src/components/landing/AchievementsPagination'
import CoachesPreview from '@/src/components/landing/CoachesPreview'
import Testimonials from '@/src/components/landing/Testimonials'
import CallToAction from '@/src/components/landing/CallToAction'
import Footer from '@/src/components/landing/Footer'

export default async function LandingPage() {
	const [achievements, coaches, testimonials, competitions] = await Promise.all([
		getAchievements(),
		getCoaches(),
		getTestimonials(),
		getCompetitions(),
	])

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
			<CompetitionsPagination competitions={competitions} />
			<section id="prestasi" className="px-6 py-16 max-w-7xl mx-auto w-full">
				<AchievementsPagination achievements={achievements} />
			</section>
			<section className="px-6 py-16 max-w-7xl mx-auto w-full">
				<h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Pelatih Kami</h2>
				<CoachesPreview coaches={topCoaches} />
			</section>
			<Testimonials testimonials={testimonials} />
			<CallToAction />
			<ContactSection />
			<Footer />
		</main>
	)
}

