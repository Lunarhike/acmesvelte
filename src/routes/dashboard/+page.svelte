<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import ArrowPathIcon from '~icons/ph/arrows-clockwise';
	import { formatCurrency } from '$lib/utils';

	export let latestInvoiceId: string;

	const getLatestInvoices = async () => {
		const res = await fetch(`/api/home`);
		const objects = await res.json();
		return objects;
	};

	const query = createQuery({
		queryKey: ['latestInvoices', latestInvoiceId],
		queryFn: getLatestInvoices
	});
</script>

{#if $query.status === 'success'}
	<div class="flex w-full flex-col md:col-span-4 lg:col-span-4">
		<h2 class="font-lusitana mb-4 text-xl md:text-2xl">Latest Invoices</h2>
		<div class="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
			<div class="bg-white px-6">
				{#each $query.data.latestInvoices as invoice, i (invoice.id)}
					<div
						class={i !== 0
							? 'flex flex-row items-center justify-between py-4 border-t'
							: 'flex flex-row items-center justify-between py-4'}
					>
						<div class="flex items-center">
							<img
								src={invoice.image_url}
								alt={`${invoice.name}'s profile picture`}
								class="mr-4 rounded-full"
								width={32}
								height={32}
							/>
							<div class="min-w-0">
								<p class="truncate text-sm font-semibold md:text-base">{invoice.name}</p>
								<p class="hidden text-sm text-gray-500 sm:block">{invoice.email}</p>
							</div>
						</div>
						<p class="font-lusitana truncate text-sm font-medium md:text-base">
							{invoice.amount}
						</p>
					</div>
				{/each}
			</div>
			<div class="flex items-center pb-2 pt-6">
				<ArrowPathIcon class="h-5 w-5 text-gray-500" />
				<h3 class="ml-2 text-sm text-gray-500">Updated just now</h3>
			</div>
		</div>
	</div>
{/if}
