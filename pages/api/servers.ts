import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, url } = req.body
    await query('INSERT INTO servers (name, url) VALUES ($1, $2)', [name, url])
  }
  const servers = await query('SELECT id, name, url FROM servers ORDER BY id DESC')
  res.status(200).json(servers.rows)
}
