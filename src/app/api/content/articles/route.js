import { NextResponse } from 'next/server';
import { listArticles } from '@/lib/content';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'zh';
  const items = await listArticles(locale);
  return NextResponse.json({ items });
}

