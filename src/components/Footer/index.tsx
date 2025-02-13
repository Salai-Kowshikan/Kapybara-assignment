import Link from 'next/link'
import Image from 'next/image'

function Footer() {
  return (
    <footer className="bg-gray-100 text-center p-4">
      <p>&copy; 2025 Kapybara Personal Task Management. All rights reserved.</p>
      <p>
        <Link href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link> | 
        <Link href="/terms-of-service" className="text-blue-500 hover:underline">Terms of Service</Link>
      </p>
      <p>
        Contact Support: 
        <a href="mailto:support@kapybara.com" className="text-blue-500 hover:underline"> Email</a> | 
        <a href="tel:+1234567890" className="text-blue-500 hover:underline"> Phone</a>
      </p>
      <p>
        <Link href="https://github.com/your-repo" className="text-blue-500 hover:underline flex items-center justify-center">
          <Image src="/github.svg" alt="GitHub" width={20} height={20} className="mr-1" /> GitHub
        </Link>
      </p>
    </footer>
  )
}

export default Footer