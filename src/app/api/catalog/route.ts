// app/api/catalog/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch('https://api.swu-db.com/catalog/hps', {
            next: {
                revalidate: 3600 // Cache for 1 hour
            }
        });
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Catalog API Error:', error); // Log the error for debugging
        return NextResponse.json({ error: 'Failed to fetch catalog data' }, { status: 500 });
    }
}
