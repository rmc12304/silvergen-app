'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('busca') || '')

  useEffect(() => {
    setQuery(searchParams.get('busca') || '')
  }, [searchParams])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/?busca=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <label htmlFor="search" className="sr-only">
          Buscar empresas
        </label>
        <input
          id="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome ou cidade..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
    </div>
  )
}
