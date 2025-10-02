'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [pseudo, setPseudo] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo, mot_de_passe: motDePasse }),
    })

    const data = await res.json()

    if (data.success) {
      // Stocker le pseudo dans le localStorage
      localStorage.setItem('pseudo', data.user.pseudo)

      // Recharger la page pour déclencher le loader global
      window.location.href = '/'  // reload complet

    } else {
      setError(data.message || 'Erreur de connexion')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-sans">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-80 bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-4 text-center">Connexion</h1>

        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold"
        >
          Se connecter
        </button>
      </form>
    </div>
  )
}
