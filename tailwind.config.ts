import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
   fontFamily:{
    'bespak':['var(--bespak)'],
    'poppins':['var(--poppins)'],
    'routhem':['var(--routhem)'],
    'northden':['var(--northden)']
   },
   colors:{
    'primary':'#26072C',
    'secondary':'#F903AA',
    'gray':'#D9D9D9',
    'black':'#040404',
    'secondarygradient':'linear-gradient(90deg, #920AA8 2%, #E019CC 20%, #FF81E3 48%, #FC75D6 52%, #DF55F6 60%, #E822EC 71%, #E80F91 75%, #EE19D8 81.25%, #F323B7 87.5%, #FE3873 100%)'
    
   }
  },
  plugins: [],
}
export default config
