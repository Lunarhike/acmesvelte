<script lang="ts">
	import { useQueryClient, createQuery } from '@tanstack/svelte-query';
	import { api } from './api';
	import ArrowPathIcon from '~icons/ph/arrows-clockwise'; // You need to find a Svelte alternative for this
    import {sql} from '@vercel/postgres'
	const client = useQueryClient();

	let limit = 10;

	const invoices = createQuery({
		queryKey: ['invoices', limit],
		queryFn: () => async({ url }) => {
		console.log(url?.searchParams?);
		const query = url?.searchParams?.get('query') || '';
		const currentPage = Number(url?.searchParams?.get('page')) || 1;
		const offset = (currentPage - 1) * ITEMS_PER_PAGE;

		const filteredInvoices = await sql`
    SELECT
    invoices.id,
    invoices.amount,
    invoices.date,
    invoices.status,
    customers.name,
    customers.email,
    customers.image_url
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
        WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
        ORDER BY invoices.date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

		return { props: { filteredInvoices } };
	}
});
	});
</script>

<div>
	<div>
		{#if $invoices.status === 'pending'}
			<span>Loading...</span>
		{:else if $invoices.status === 'error'}
			<span>Error: {$invoices.error.message}</span>
		{:else}
			<div class="flex w-full flex-col md:col-span-4 lg:col-span-4">
				<h2 class="font-lusitana mb-4 text-xl md:text-2xl">Latest Invoices</h2>
				<div class="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
					<div class="bg-white px-6">
						{#each invoices as invoice, i (invoice.id)}
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
			{#if $invoices.isFetching}
				<div style="color:darkgreen; font-weight:700">Background Updating...</div>
			{/if}
		{/if}
	</div>
</div>
