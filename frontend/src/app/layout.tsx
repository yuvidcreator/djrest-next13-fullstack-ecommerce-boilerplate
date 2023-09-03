import '@/styles/globals.css'
import '@/styles/custom-plugins.css'
import '@/styles/scrollbar.css'
import '@/styles/swiper-carousel.css'
import CustomProvider from '@/redux/provider'
import HeaderLayout from '@/components/common/layout'
import Setup from '@/redux/utils/Setup'
import { ManagedUIContext } from '@/contexts/ui.context'
import ManagedModal from '@/components/common/modal/managed-modal'
import ManagedDrawer from '@/components/common/drawer/managed-drawer'
import ReactQueryProvider from '@/reactquery/ReactQueryProvider/ReactQueryProvider'




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CustomProvider>
          <ReactQueryProvider>
            {/* Auth Checker */}
            <Setup />

            {/* @ts-ignore */}
            <ManagedUIContext>
              <HeaderLayout>
                {children}
                <ManagedModal />
                <ManagedDrawer />
              </HeaderLayout>
            </ManagedUIContext>
          </ReactQueryProvider>
        </CustomProvider>
      </body>
    </html>
  )
}
