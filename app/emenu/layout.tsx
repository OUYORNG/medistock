import { Header } from '@/components/Header'
import { MenuFooter } from '@/components/MenuFooter'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header className="fixed bg-white top-0 left-0 right-0 z-50 block md:hidden" />
            </div>
            <div className="mb-12">{children}</div>
            <div className="fixed bottom-0 left-0 right-0 z-50">
                <MenuFooter className="fixed bg-white top-0 left-0 right-0 z-50 block md:hidden" />
            </div>

        </div>
    )
}

export default layout