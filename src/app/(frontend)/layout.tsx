import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import Root from '@/ui/Root'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SkipToContent from '@/ui/SkipToContent'
import Announcement from '@/ui/Announcement'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import { Krona_One, Figtree } from 'next/font/google'
import VisualEditingControls from '@/ui/VisualEditingControls'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'react-hot-toast'
import '@/styles/app.css'

const krona = Krona_One({
	subsets: ['latin'],
	weight: ['400'],
	preload: true,
	display: 'swap',
	variable: '--font-krona',
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
		<>
			<head>
				{/* Google Tag Manager */}
				<GoogleTagManager gtmId="GTM-WCK4ZDHC" />

				{/* Google Analytics */}
				<GoogleAnalytics gaId="G-FL9XRHBH81" />

				<script
					dangerouslySetInnerHTML={{
						__html: `
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),
        dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WCK4ZDHC');
    `,
					}}
				/>

				{/* GTAG - Google Analytics Script */}
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=G-FL9XRHBH81`}
				></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FL9XRHBH81');
            `,
					}}
				/>
			</head>
			<Root>
				<body className={figtree.className + ' ' + krona.variable}>
					'{' '}
					<noscript>
						<iframe
							src="https://www.googletagmanager.com/ns.html?id=GTM-WCK4ZDHC"
							height="0"
							width="0"
							style={{ display: 'none', visibility: 'hidden' }}
						></iframe>
					</noscript>
					<NuqsAdapter>
						<SkipToContent />
						<Announcement />
						<Header />
						<main id="main-content" role="main" tabIndex={-1}>
							{children}
							<Toaster position="bottom-center" />
						</main>
						<Footer />
						<VisualEditingControls />
					</NuqsAdapter>
					<Analytics />
					<SpeedInsights />
				</body>
			</Root>
		</>
	)
}
