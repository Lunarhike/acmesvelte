<script>
	import '../app.css';
	import '@fontsource/lusitana';
	import '@fontsource-variable/inter';
	import { dev } from '$app/environment';
	// import { inject } from '@vercel/analytics';
	// inject({ mode: dev ? 'development' : 'production' });
	import { QueryClientProvider } from '@tanstack/svelte-query';

	export let data;
</script>

<QueryClientProvider client={data.queryClient}>
	<main>
		<slot />
	</main>
</QueryClientProvider>
