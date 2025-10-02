import './globals.css'
import { ReactNode } from 'react'
import Sidebar from './components/sidebar'
import AppWrapper from './components/loading'

export const metadata = {
  title: 'Esportify',
  description: 'Application Esport',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen bg-gray-100">
        <AppWrapper>
          {/* Sidebar */}
          <Sidebar />

          {/* Contenu principal */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </AppWrapper>
      </body>
    </html>
  )
}