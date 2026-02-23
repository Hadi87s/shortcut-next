import SidebarLayout from '@/core/layouts/SidebarLayout'
import navigation from '@/navigation/sidebarRoutes'
import { fetchDynamicRoutes } from '@/navigation/dynamicRoutes'
import themeConfig from '@/core/configs/themeConfig'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let dynamicNavItems: Awaited<ReturnType<typeof fetchDynamicRoutes>> = []
  try {
    dynamicNavItems = await fetchDynamicRoutes()
  } catch (error) {
    console.error('Failed to fetch dynamic nav routes:', error)
  }

  return (
    <div className='dashboard-layout'>
      <main className='dashboard-content'>
        <SidebarLayout navItems={navigation()} dynamicNavItems={dynamicNavItems} appName={themeConfig.templateName}>
          {children}
        </SidebarLayout>
      </main>
    </div>
  )
}
