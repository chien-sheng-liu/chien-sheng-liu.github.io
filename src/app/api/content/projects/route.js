import { NextResponse } from 'next/server';
import { listProjects } from '@/lib/content';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'zh';
  const items = await listProjects(locale);
  return NextResponse.json({ items });
}

