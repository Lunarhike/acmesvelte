/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				lusitana: ['Lusitana', 'serif'],
				inter: ['Inter', 'sans-serif']
			},
			gridTemplateColumns: {
				13: 'repeat(13, minmax(0, 1fr))'
			},
			colors: {
				blue: {
					400: '#2589FE',
					500: '#0070F3',
					600: '#2F6FEB'
				}
			}
		},
		keyframes: {
			shimmer: {
				'100%': {
					transform: 'translateX(100%)'
				}
			}
		}
	},
	plugins: []
};
