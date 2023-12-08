<script>
	import Table from './components/Table.svelte';
	export let data;
</script>

<div class="w-full">
	<div class="flex w-full items-center justify-between">
		<h1 class="font-lusitana text-2xl">Invoices</h1>
	</div>
	<div class="mt-4 flex items-center justify-between gap-2 md:mt-8"></div>
	<Table filteredInvoices={data.props.filteredInvoices.rows} />
	<div class="mt-5 flex w-full justify-center"></div>
</div>
