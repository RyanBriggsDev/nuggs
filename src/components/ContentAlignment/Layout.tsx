import PageSpacing from './PageSpacing'

export default function Layout({ children }: any) {
  return (
    <div className="layout flex min-h-screen flex-col items-center justify-between bg-gray-200 text-black dark:bg-zinc-900 dark:text-white">
      <PageSpacing>{children}</PageSpacing>
      <p>Footer</p>
    </div>
  )
}
