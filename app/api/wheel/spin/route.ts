import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise'

type UserRow = RowDataPacket & { id: number; tokens: number | string; last_spin: Date | string | null }

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as { user_id?: unknown; pseudo?: unknown }

    // 1) Résoudre l'ID: priorité à user_id, sinon via pseudo
    let userId = Number(body.user_id)
    if (!Number.isFinite(userId) || userId <= 0) {
      const pseudo = typeof body.pseudo === 'string' ? body.pseudo.trim() : ''
      if (!pseudo) return j({ error: 'user_id ou pseudo requis' }, 400)
      const [r1] = await db.query<UserRow[]>(
        'SELECT id FROM users WHERE pseudo = ? LIMIT 1',
        [pseudo]
      )
      if (!r1.length) return j({ error: 'Utilisateur introuvable' }, 404)
      userId = r1[0].id
    }

    // 2) Lire tokens + last_spin
    const [r2] = await db.query<UserRow[]>(
      'SELECT tokens, last_spin FROM users WHERE id = ? LIMIT 1',
      [userId]
    )
    if (!r2.length) return j({ error: 'Utilisateur introuvable' }, 404)

    // 3) Cooldown 60s
    const last = r2[0].last_spin ? new Date(r2[0].last_spin) : null
    if (last) {
      const diff = Date.now() - last.getTime()
      if (diff < 60_000) {
        const retry_after = Math.ceil((60_000 - diff) / 1000)
        return j({ error: 'Cooldown', retry_after }, 429)
      }
    }

    // 4) Gain 5..100
    const gain = Math.floor(Math.random() * 96) + 5

    // 5) Crédit + last_spin
    const [upd] = await db.query<ResultSetHeader>(
      'UPDATE users SET tokens = tokens + ?, last_spin = NOW() WHERE id = ?',
      [gain, userId]
    )
    if (!upd.affectedRows) return j({ error: 'MAJ tokens impossible' }, 500)

    // 6) Total
    const [r3] = await db.query<UserRow[]>(
      'SELECT tokens FROM users WHERE id = ? LIMIT 1',
      [userId]
    )
    const total = Number(r3[0]?.tokens ?? 0)

    return j({ gain, tokens: Number.isFinite(total) ? total : 0 })
  } catch (e) {
    console.error('[POST /api/wheel/spin]', e)
    return j({ error: 'DB error' }, 500)
  }
}

function j(body: unknown, status = 200) {
  return new NextResponse(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
      'Surrogate-Control': 'no-store',
    },
  })
}
