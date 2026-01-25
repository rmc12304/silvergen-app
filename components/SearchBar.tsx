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

  function handleClear() {
    setQuery('')
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex gap-2">
        <label htmlFor="search" className="sr-only">
          Buscar empresas
        </label>
        <input
          id="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome ou cidade..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          Buscar
        </button>
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100"
          >
            Limpar
          </button>
        )}
      </div>
    </form>
  )
}
