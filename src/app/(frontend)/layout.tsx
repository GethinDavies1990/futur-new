import { GoogleTagManager } from '@next/third-parties/google'
import Root from '@/ui/Root'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SkipToContent from '@/ui/SkipToContent'
import Announcement from '@/ui/Announcement'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import { Figtree, Inter } from 'next/font/google'
import VisualEditingControls from '@/ui/VisualEditingControls'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'react-hot-toast'
import '@/styles/app.css'

const krona = Inter({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	preload: true,
	display: 'swap',
	variable: '--font-krona',
})

const figtree = Figtree({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800', '900'],
	preload: true,
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={krona.variable}>
			<head>
				{/* Google Tag Manager */}
				{/* <GoogleTagManager gtmId="GTM-WCK4ZDHC" /> */}
			</head>
			<body className={figtree.className}>
				<NuqsAdapter>
					<Root>
						<SkipToContent />
						<Announcement />
						<Header />
						<main id="main-content" role="main" tabIndex={-1}>
							{children}
							<Toaster position="bottom-center" />
						</main>
						<Footer />
						<VisualEditingControls />
					</Root>
				</NuqsAdapter>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
