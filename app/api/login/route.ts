import { NextResponse } from 'next/server'
import { db } from '../../../db'
import type { RowDataPacket } from 'mysql2'

// Définition du type User correspondant à ta table
interface User extends RowDataPacket {
  id: number
  pseudo: string
  mot_de_passe: string
  admin: number
}

export async function POST(req: Request) {
  try {
    const { pseudo, mot_de_passe } = await req.json()

    // Chercher l'utilisateur par pseudo + mot de passe
    const [rows] = await db.query<User[]>(
      'SELECT * FROM users WHERE pseudo = ? AND mot_de_passe = ? LIMIT 1',
      [pseudo, mot_de_passe]
    )

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Identifiants incorrects' },
        { status: 401 }
      )
    }

    // Utilisateur trouvé
    const user = rows[0]

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        pseudo: user.pseudo,
        admin: user.admin
      }
    })
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
