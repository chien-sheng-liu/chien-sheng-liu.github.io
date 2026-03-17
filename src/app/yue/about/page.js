import { redirect } from 'next/navigation';

export default function AboutRedirect() {
  redirect('/yue');
}

export const dynamic = 'force-static';

