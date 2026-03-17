import { redirect } from 'next/navigation';

export default function AboutRedirect() {
  redirect('/');
}

export const dynamic = 'force-static';

