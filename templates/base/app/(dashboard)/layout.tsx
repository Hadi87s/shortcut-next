export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='dashboard-layout'>
      <main className='dashboard-content'>{children}</main>
    </div>
  )
}
