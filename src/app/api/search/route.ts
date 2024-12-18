import {NextResponse} from 'next/server';

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const hp = searchParams.get('hp');
    const order = searchParams.get('order');
    const direction = searchParams.get('direction');
    let baseUrl = `https://api.swu-db.com/cards/search?q=h=${hp}&pretty=true`;
    if (order) {
        baseUrl += `&order=${order}`;
    }
    if (direction) {
        baseUrl += `&dir=${direction}`;
    }
    try {
        const res = await fetch(baseUrl);
        if (!res.ok) throw new Error('Failed to fetch cards');
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {

        console.error('Search API Error:', error); // Log the error for debugging
        return NextResponse.json({error: 'Failed to fetch card data'}, {status: 500});
    }
}
