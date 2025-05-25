import { useEffect, useState } from 'react'

interface Server {
  id: number
  name: string
  url: string
}

export default function Home() {
  const [servers, setServers] = useState<Server[]>([])
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    fetch('/api/servers')
      .then(res => res.json())
      .then(setServers)
      .catch(console.error)
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/servers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, url })
    })
    if (res.ok) {
      setName('')
      setUrl('')
      const data = await res.json()
      setServers(data)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1rem' }}>
      <h1>MCP Observability</h1>
      <form onSubmit={handleAdd} style={{ marginBottom: '1rem' }}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Server name"
          required
        />
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Server URL"
          required
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {servers.map(server => (
          <li key={server.id}>{server.name} - {server.url}</li>
        ))}
      </ul>
    </div>
  )
}
