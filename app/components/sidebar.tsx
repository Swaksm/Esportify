'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const [pseudo, setPseudo] = useState<string | null>(null)

  useEffect(() => {
    const storedPseudo = localStorage.getItem('pseudo')
    if (storedPseudo) setPseudo(storedPseudo)
  }, [])

  const handleLogout = () => {
  localStorage.clear()  // supprime toutes les infos côté client
  setPseudo(null)       // met à jour l’état local
  window.location.reload() // rafraîchit la page pour re-render complet
}


  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          <Link href="/" className="hover:text-blue-400">
            Esportify
          </Link>
        </div>

        <nav className="mt-6 flex flex-col gap-2">
          <Link href="/page1" className="block px-6 py-3 hover:bg-gray-700 rounded">
            Page 1
          </Link>
          <Link href="/page2" className="block px-6 py-3 hover:bg-gray-700 rounded">
            Page 2
          </Link>
          <Link href="/page3" className="block px-6 py-3 hover:bg-gray-700 rounded">
            Page 3
          </Link>
          <Link href="/page4" className="block px-6 py-3 hover:bg-gray-700 rounded">
            Page 4
          </Link>
        </nav>
      </div>

      <div className="p-6">
        {pseudo ? (
          <button
            onClick={handleLogout}
            className="w-full block text-center px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
          >
            Déconnexion
          </button>
        ) : (
          <>
            <Link
              href="/login"
              className="w-full block text-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
            >
              Se connecter
            </Link>

            <Link
              href="/register"
              className="w-full block text-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded mt-2"
            >
              Enregistrer
            </Link>
          </>
        )}
      </div>
    </aside>
  )
}
