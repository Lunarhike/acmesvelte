<script>
	import '../app.css';
	import '@fontsource/lusitana';
	import '@fontsource-variable/inter';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });
</script>

<slot />
