// import { GoogleTagManager } from '@next/third-parties/google'
import Root from '@/ui/Root'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SkipToContent from '@/ui/SkipToContent'
import Announcement from '@/ui/Announcement'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import { Fustat, Figtree } from 'next/font/google'
import VisualEditingControls from '@/ui/VisualEditingControls'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/styles/app.css'

const fustat = Fustat({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	preload: true,
})

const figtree = Figtree({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	preload: true,
})

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Root>
			{/* <GoogleTagManager gtmId="" /> */}
			<body className="relative h-full w-full bg-black text-white">
				{/* Background Effects */}

				{/* Radial gradient background */}
				<div className="absolute top-[5%] left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]" />

				<NuqsAdapter>
					<SkipToContent />
					<Announcement />
					<Header />
					<main id="main-content" role="main" tabIndex={-1}>
						{children}
					</main>
					<Footer />
					<VisualEditingControls />
				</NuqsAdapter>

				<Analytics />
				<SpeedInsights />
			</body>
		</Root>
	)
}
