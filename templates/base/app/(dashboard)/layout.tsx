import SidebarLayout from '@/core/layouts/SidebarLayout'
import navigation from '@/navigation/sidebarRoutes'
import { fetchDynamicRoutes } from '@/navigation/dynamicRoutes'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dynamicNavItems = await fetchDynamicRoutes()

  return (
    <div className='dashboard-layout'>
      <main className='dashboard-content'>
        <SidebarLayout navItems={navigation()} dynamicNavItems={dynamicNavItems} appName='My App'>
          {children}
        </SidebarLayout>
      </main>
    </div>
  )
}
