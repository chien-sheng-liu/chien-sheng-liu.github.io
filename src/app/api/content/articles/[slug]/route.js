import { NextResponse } from 'next/server';
import { getArticle } from '@/lib/content';

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'zh';
  try {
    const data = await getArticle(params.slug, locale);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

