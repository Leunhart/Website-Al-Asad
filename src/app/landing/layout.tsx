import type { ReactNode } from 'react'
import Navbar from '@/components/landing/Navbar'

export default function LandingLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col bg-[#0f1f14] text-[#e7efe9]">
			<Navbar />
			{children}
		</div>
	)
}

