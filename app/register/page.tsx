'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [pseudo, setPseudo] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (motDePasse !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo, mot_de_passe: motDePasse })
    })

    const data = await res.json()

    if (data.success) {
      setSuccess('Compte créé avec succès ! Redirection vers login...')
      setTimeout(() => router.push('/login'), 2000)
    } else {
      setError(data.message || 'Erreur lors de la création du compte')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-sans">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 w-80 bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-4 text-center">Inscription</h1>

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

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">{success}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold"
        >
          S’inscrire
        </button>
      </form>
    </div>
  )
}
