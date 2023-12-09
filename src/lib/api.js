import { sql } from '@vercel/postgres';

const ITEMS_PER_PAGE = 6;

export const api = () => ({
	getInvoices: async ({ url }) => {
		console.log(url);
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
