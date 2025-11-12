'use client'

import { useEffect, useMemo, useState } from 'react'

type Champion = {
  id: number
  name: string
  image_url: string
  pick_rate?: number | null
}

export default function ChampionsPage() {
  const [champions, setChampions] = useState<Champion[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedChamp, setSelectedChamp] = useState<Champion | null>(null)

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const res = await fetch('/api/champions', { cache: 'no-store' })
        if (!res.ok) throw new Error('Erreur lors de la récupération des champions')
        const data = (await res.json()) as Champion[]
        setChampions(
          data.map(c => ({
            ...c,
            pick_rate:
              c.pick_rate === null || typeof c.pick_rate === 'undefined'
                ? undefined
                : Number(c.pick_rate),
          }))
        )
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchChampions()
  }, [])

  // Fermeture modal via ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedChamp(null)
    }
    if (selectedChamp) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedChamp])

  return (
    <main className="p-4">
      <Header count={champions.length} />

      {loading ? (
        <SkeletonGrid />
      ) : (
        <div
  className="grid gap-2"
  style={{
    gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
  }}
>
  {champions.map((champ) => (
    <button
      key={champ.id}
      className="relative group rounded overflow-hidden"
      title={champ.name}
      onClick={() => setSelectedChamp(champ)}
      style={{
        border: '1px solid var(--border)',
        background: 'var(--background-secondary)',
      }}
    >
      <img
        src={champ.image_url}
        alt={champ.name}
        className="w-16 h-16 object-cover block transition-transform duration-150 group-hover:scale-105"
      />
      {typeof champ.pick_rate !== 'undefined' && Number.isFinite(Number(champ.pick_rate)) && (
        <span
          className="absolute bottom-0 right-0 text-[11px] leading-3 px-2 py-0.5 rounded-tl"
          style={{
            backgroundColor: 'rgba(0,0,0,0.55)',
            color: 'var(--accent)',
            borderTop: '1px solid var(--border)',
            borderLeft: '1px solid var(--border)',
          }}
        >
          {Number(champ.pick_rate).toFixed(1)}%
        </span>
      )}
    </button>
  ))}
</div>

      )}

      {/* Popup */}
      {selectedChamp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
          onClick={() => setSelectedChamp(null)}
        >
          <div
            className="w-[min(92vw,420px)] rounded-xl p-5"
            style={{
              backgroundColor: 'var(--background-secondary)',
              border: '1px solid var(--border)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <img
                src={selectedChamp.image_url}
                alt={selectedChamp.name}
                className="w-16 h-16 rounded-lg object-cover"
                style={{ border: '1px solid var(--border)' }}
              />
              <div className="min-w-0">
                <h2 className="truncate" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  {selectedChamp.name}
                </h2>
                {typeof selectedChamp.pick_rate !== 'undefined' &&
                  Number.isFinite(Number(selectedChamp.pick_rate)) && (
                    <div className="mt-1 text-sm" style={{ color: 'var(--foreground-secondary)' }}>
                      Pick rate&nbsp;:&nbsp;
                      <span style={{ color: 'var(--foreground)' }}>
                        {Number(selectedChamp.pick_rate).toFixed(2)}%
                      </span>
                    </div>
                  )}
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                className="px-3 py-2 rounded"
                onClick={() => setSelectedChamp(null)}
                style={{
                  border: '1px solid var(--border)',
                  backgroundColor: 'transparent',
                  color: 'var(--foreground)',
                }}
              >
                Fermer (Esc)
              </button>
              <a
                href={`/bets?championId=${selectedChamp.id}`}
                className="px-3 py-2 rounded font-semibold"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}
              >
                Parier sur {selectedChamp.name}
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ------- Sous-composants ------- */

function Header({ count }: { count: number }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h1 className="text-xl font-bold" style={{ color: 'var(--accent)' }}>
        Champions
      </h1>
      <div
        className="text-xs px-2 py-1 rounded"
        style={{ border: '1px solid var(--border)', color: 'var(--foreground-secondary)' }}
      >
        {count} items
      </div>
    </div>
  )
}

function SkeletonGrid() {
  // grille squelette compacte
  const placeholders = useMemo(() => Array.from({ length: 60 }), [])
  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))',
      }}
    >
      {placeholders.map((_, i) => (
        <div
          key={i}
          className="w-11 h-11 rounded animate-pulse"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        />
      ))}
    </div>
  )
}
