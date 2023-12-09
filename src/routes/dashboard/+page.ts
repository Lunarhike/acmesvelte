import { api } from '$lib/api';

export const load = async ({ parent, fetch }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['invoices', 6],
		queryFn: () => api(fetch).getInvoices(6)
	});
};
