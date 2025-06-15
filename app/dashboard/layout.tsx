import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header className="fixed bg-white top-0 left-0 right-0 z-50 block md:hidden" />
            </div>
            <div className="my-20">{children}</div>
            <div className="fixed bottom-0 left-0 right-0 z-50">
            <Footer className="fixed bg-white top-0 left-0 right-0 z-50 block md:hidden" />
          </div>

        </div>
    )
}

export default layout