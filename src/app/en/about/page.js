import { redirect } from 'next/navigation';

export default function AboutRedirect() {
  redirect('/en');
}

export const dynamic = 'force-static';

