'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [pseudo, setPseudo] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo, mot_de_passe: motDePasse }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.message || 'Erreur de connexion')
        return
      }

      // ✅ stocke tout
      localStorage.setItem('user_id', String(data.user.id))
      localStorage.setItem('pseudo', data.user.pseudo)
      localStorage.setItem('is_admin', String(data.user.admin))

      // ✅ notifie Sidebar/Wheel (optionnel, mais utile si tu restes sur la même page)
      window.dispatchEvent(new Event('storage'))
      window.dispatchEvent(new Event('tokens-updated'))

      // 🔥 hard reload (comme avant)
      window.location.replace('/') // ou: window.location.href = '/'
    } catch (err) {
      console.error('Erreur de connexion :', err)
      setError('Erreur serveur ou réseau')
    } finally {
      setLoading(false)
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

        <button type="submit" className="btn-primary mt-2" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
