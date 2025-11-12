'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [pseudo, setPseudo] = useState<string | null>(null)

  useEffect(() => {
    const p = (localStorage.getItem('pseudo') || '').trim()
    setPseudo(p || null)
  }, [])

  return (
    <main className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <header className="mb-8" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 className="title" style={{ fontSize: '2rem' }}>Esportify — Paris LoL & Tokens</h1>
          <p className="subtitle" style={{ marginTop: '.25rem' }}>
            Parie sur l’arrivée d’un skin au prochain patch, suis les notes de patch,
            explore les champions… et gagne des tokens !
          </p>
        </div>

        {/* CTA connexion/inscription si non connecté */}
        {!pseudo ? (
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <Link href="/login" className="btn-primary">Se connecter</Link>
            <Link
              href="/register"
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '0.5rem',
                border: `1px solid var(--border)`,
                backgroundColor: 'transparent',
                color: 'var(--foreground)',
              }}
            >
              S’inscrire
            </Link>
          </div>
        ) : (
          <div style={{ textAlign: 'right' }}>
            <div className="subtitle" style={{ fontSize: '.85rem' }}>Connecté en tant que</div>
            <div style={{ fontWeight: 700 }}>{pseudo}</div>
          </div>
        )}
      </header>

      {/* Comment ça marche */}
      <section className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontWeight: 600, marginBottom: '.5rem' }}>Comment ça marche ?</h2>
        <ol className="subtitle" style={{ marginLeft: '1.25rem', lineHeight: 1.6 }}>
          <li><strong>Connecte-toi</strong> ou <strong>crée un compte</strong> pour commencer.</li>
          <li>
            <Link href="/patches">Parcours les patchs</Link> pour voir les infos et <em>skins</em> susceptibles d’arriver.
          </li>
          <li>
            <Link href="/champions">Explore les champions</Link> (images & pick rate).
          </li>
          <li>
            <Link href="/bets">Crée un pari</Link> sur le champion qui pourrait recevoir un skin au prochain patch.
          </li>
          <li>
            <Link href="/wheel">Tourne la roue</Link> toutes les 60&nbsp;s pour des <strong>tokens gratuits</strong>.
          </li>
          <li>
            Quand un pari passe (<strong>won</strong>), tes <em>gains potentiels</em> sont affichés (crédit automatique des tokens prévu plus tard).
          </li>
        </ol>
      </section>

      {/* Gagner des tokens */}
      <section style={{ marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '.25rem' }}>Gagner des tokens — Roulette</h3>
          <p className="subtitle" style={{ marginBottom: '0.75rem' }}>
            La <Link href="/wheel">Wheel of Fortune</Link> est dispo toutes les <strong>1 minute</strong>.
            Chaque spin rapporte un nombre aléatoire de tokens.
          </p>
          <Link href="/wheel" className="btn-primary">Tourner la roue</Link>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '.25rem' }}>Gagner des tokens — Paris gagnants</h3>
          <p className="subtitle" style={{ marginBottom: '0.75rem' }}>
            Place des paris sur les skins à venir. Tes <strong>gains potentiels</strong> s’affichent
            dans la page des paris (crédit automatique à venir).
          </p>
          <Link href="/bets" className="btn-primary">Créer un pari</Link>
        </div>
      </section>

      {/* Accès rapide */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontWeight: 600, marginBottom: '.75rem' }}>Accès rapide</h2>
        <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <QuickLink href="/patches" title="Voir les Patchs" subtitle="Notes & skins potentiels" />
          <QuickLink href="/champions" title="Champions" subtitle="Images & pick rate" />
          <QuickLink href="/bets" title="Mes Paris" subtitle="Créer / suivre mes paris" />
          <QuickLink href="/wheel" title="Wheel of Fortune" subtitle="Tokens gratuits (1/min)" />
        </div>
      </section>

      {/* FAQ */}
      <section className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontWeight: 600, marginBottom: '.5rem' }}>FAQ rapide</h2>
        <div className="subtitle" style={{ display: 'grid', gap: '.75rem' }}>
          <div>
            <p style={{ fontWeight: 600 }}>Comment je commence ?</p>
            <p>Crée un compte ou connecte-toi, puis va sur <em>Paris</em>.</p>
          </div>
          <div>
            <p style={{ fontWeight: 600 }}>Comment obtenir des tokens ?</p>
            <p>1) Tourne la roue (toutes les 60&nbsp;s), 2) Gagne des paris.</p>
          </div>
          <div>
            <p style={{ fontWeight: 600 }}>Où voir mes tokens ?</p>
            <p>Dans la <em>Sidebar</em>, sous ton pseudo.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

function QuickLink({ href, title, subtitle }: { href: string; title: string; subtitle: string }) {
  return (
    <Link
      href={href}
      className="card"
      style={{
        padding: '1rem',
        display: 'block',
        border: `1px solid var(--border)`,
        backgroundColor: 'var(--background-secondary)',
      }}
      title={title}
    >
      <div style={{ fontWeight: 600 }}>{title}</div>
      <div className="subtitle">{subtitle}</div>
    </Link>
  )
}
