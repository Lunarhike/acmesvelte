import { sql } from '@vercel/postgres';
import { formatCurrency } from '$lib/utils';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const data = await sql`
    SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5`;

	const latestInvoices = data.rows.map((invoice) => ({
		...invoice,
		amount: formatCurrency(invoice.amount)
	}));

	return new Response(JSON.stringify({ latestInvoices: latestInvoices }), {
		headers: { 'content-type': 'application/json' }
	});
}
