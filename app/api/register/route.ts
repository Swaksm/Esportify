import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise'

type UserRow = RowDataPacket & { id: number }

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const pseudo = String(body?.pseudo || '').trim()
    const motDePasse = String(body?.mot_de_passe || '')

    if (!pseudo || !motDePasse) {
      return json({ success: false, message: 'Champs manquants' }, 400)
    }

    // pseudo déjà pris ?
    const [exist] = await db.query<UserRow[]>(
      'SELECT id FROM users WHERE pseudo = ? LIMIT 1',
      [pseudo]
    )
    if (exist.length) {
      return json({ success: false, message: 'Pseudo déjà utilisé' }, 409)
    }

    // crée l’utilisateur (tokens=0, last_spin NULL)
    const [ins] = await db.query<ResultSetHeader>(
      'INSERT INTO users (pseudo, mot_de_passe, admin, tokens, last_spin) VALUES (?, ?, 0, 0, NULL)',
      [pseudo, motDePasse]
    )
    if (!ins.insertId) {
      return json({ success: false, message: 'Insertion échouée' }, 500)
    }

    return json({ success: true, user_id: ins.insertId })
  } catch (e) {
    console.error('[POST /api/register]', e)
    return json({ success: false, message: 'Erreur serveur' }, 500)
  }
}

function json(body: unknown, status = 200) {
  return new NextResponse(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
