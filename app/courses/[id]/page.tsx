import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RecordsPage({ params }: any) {
  const { id } = params;

  // Determine if the user is on mobile or desktop.
  const userAgent = headers().get('user-agent') || '';
  const isMobile = /iPhone|Android/i.test(userAgent);

  if (isMobile) {
    // Redirect to the mobile app deep link.
    redirect(`myapp://records/${id}`);
  }

  // Render the web page fallback for desktop.
  return (
    <div>
      <h1>Record Details</h1>
      <p>Record ID: {id}</p>
    </div>
  );
}
