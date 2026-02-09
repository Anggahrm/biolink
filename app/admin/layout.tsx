import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-neo-bg">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <AdminNav />
        {children}
      </div>
    </div>
  )
}
