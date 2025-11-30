import { getAchievements } from '@/actions/achievements'
import { getCoaches } from '@/actions/coaches'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import AchievementsPreview from '@/components/landing/AchievementsPreview'
import CoachesPreview from '@/components/landing/CoachesPreview'
import CallToAction from '@/components/landing/CallToAction'
import Footer from '@/components/landing/Footer'
import Competitions from '@/components/landing/Competitions'
import Facilities from '@/components/landing/Facilities'

export default async function LandingPage() {
	const [achievements, coaches] = await Promise.all([
		getAchievements(),
		getCoaches(),
	])

	const topAchievements = achievements.slice(0, 3)
	const topCoaches = coaches.slice(0, 4)

	return (
		<main id="home" className="flex flex-col gap-20 pb-16">
			<Hero />
			<Features />
			<Competitions />
			<Facilities />
			<section className="px-6 max-w-6xl mx-auto w-full">
				<h2 className="text-2xl font-semibold mb-6">Prestasi Terbaru</h2>
				<AchievementsPreview achievements={topAchievements} />
			</section>
			<section className="px-6 max-w-6xl mx-auto w-full">
				<h2 className="text-2xl font-semibold mb-6">Pelatih Kami</h2>
				<CoachesPreview coaches={topCoaches} />
			</section>
			<CallToAction />
			<Footer />
		</main>
	)
}

