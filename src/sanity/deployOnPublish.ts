// deployOnPublish.ts
import { definePlugin } from 'sanity'
import axios from 'axios'

export const deployOnPublish = definePlugin(() => {
	return {
		document: {
			publish: async () => {
				try {
					await axios.post(
						'https://api.vercel.com/v1/integrations/deploy/YOUR_DEPLOY_HOOK_ID',
					)
					console.log('✅ Vercel deploy hook triggered')
				} catch (err) {
					console.error('❌ Failed to trigger deploy hook', err)
				}
			},
		},
	}
})
