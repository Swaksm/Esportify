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
      localStorage.setItem('pseudo', data.user.pseudo)
      window.location.href = '/' // reload complet
    } else {
      setError(data.message || 'Erreur de connexion')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen font-sans">
      <form onSubmit={handleLogin} className="card w-80 p-6 flex flex-col gap-4">
        <h1 className="title text-center">Connexion</h1>

        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="input-field"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="input-field"
          required
        />

        {error && <p className="subtitle text-red-500 text-sm">{error}</p>}

        <button type="submit" className="btn-primary mt-2">
          Se connecter
        </button>
      </form>
    </div>
  )
}
