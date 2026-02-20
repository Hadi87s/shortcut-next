import SidebarLayout from '@/core/layouts/SidebarLayout'
import navigation from '@/navigation/sidebarRoutes'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='dashboard-layout'>
      <main className='dashboard-content'>
        <SidebarLayout navItems={navigation()} appName='My App'>
          {children}
        </SidebarLayout>
      </main>
    </div>
  )
}
