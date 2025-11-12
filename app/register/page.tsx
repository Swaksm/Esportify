'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [pseudo, setPseudo] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (motDePasse !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo, mot_de_passe: motDePasse }),
      })

      // ne plante pas si le body est vide ou non-JSON
      const text = await res.text()
      const data = text ? JSON.parse(text) : {}

      if (!res.ok || !data?.success) {
        setError(data?.message || 'Erreur lors de la création du compte')
        return
      }

      setSuccess('Compte créé avec succès ! Redirection vers login...')
      setTimeout(() => router.push('/login'), 1500)
    } catch (err) {
      console.error(err)
      setError('Erreur réseau/serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen font-sans">
      <form onSubmit={handleRegister} className="card w-80 p-6 flex flex-col gap-4">
        <h1 className="title text-center">Inscription</h1>

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
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-field"
          required
        />

        {error && <p className="subtitle text-red-500 text-sm">{error}</p>}
        {success && <p className="subtitle text-green-400 text-sm">{success}</p>}

        <button type="submit" className="btn-primary mt-2" disabled={loading}>
          {loading ? 'Création...' : 'S’inscrire'}
        </button>
      </form>
    </div>
  )
}
