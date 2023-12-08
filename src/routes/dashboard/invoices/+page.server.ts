import { sql } from '@vercel/postgres';

const ITEMS_PER_PAGE = 6;

export async function load({ url }) {
	const query = url.searchParams?.query || '';
	const currentPage = Number(url.searchParams?.page) || 1;
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
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
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch invoices.');
	}
}
