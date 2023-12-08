<script>
	import HomeIcon from '~icons/ph/house';
	import DocumentDuplicateIcon from '~icons/ph/files';
	import UserGroupIcon from '~icons/ph/users-three';
	import { page } from '$app/stores';

	const links = [
		{ name: 'Home', href: '/dashboard', icon: HomeIcon },
		{ name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
		{ name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon }
	];
</script>

{#each links as link}
	<a
		href={link.href}
		class="flex h-12 grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-blue-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 {link.href ===
		$page.url.pathname
			? 'bg-blue-100 text-blue-600'
			: ''}"
	>
		<svelte:component this={link.icon} class="w-6" />
		<p class="hidden md:block">{link.name}</p>
	</a>
{/each}
