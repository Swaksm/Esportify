import { NextResponse } from 'next/server'
import { db } from '../../../db'
import type { RowDataPacket } from 'mysql2'

// Type User pour la table
interface User extends RowDataPacket {
  id: number
  pseudo: string
  mot_de_passe: string
  admin: number
}

export async function POST(req: Request) {
  try {
    const { pseudo, mot_de_passe } = await req.json()

    // Vérifier que le pseudo n'existe pas déjà
    const [rows] = await db.query<User[]>(
      'SELECT * FROM users WHERE pseudo = ? LIMIT 1',
      [pseudo]
    )

    if (rows.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Pseudo déjà utilisé' },
        { status: 409 }
      )
    }

    // Ajouter l'utilisateur en base (admin = 0 par défaut)
    await db.query(
      'INSERT INTO users (pseudo, mot_de_passe, admin) VALUES (?, ?, 0)',
      [pseudo, mot_de_passe]
    )

    return NextResponse.json({ success: true, message: 'Utilisateur créé' })
  } catch (error) {
    console.error('Erreur register:', error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
