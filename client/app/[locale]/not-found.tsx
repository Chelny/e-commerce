import Link from 'next/link'
import { headers } from 'next/headers'

export default function NotFound() {
  const headersList = headers()
  const locale = headersList.get('locale')

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource locale={locale}</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}