import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBolt, faFire } from '@fortawesome/free-solid-svg-icons'

const SearchComic = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!query.trim()) return
        setLoading(true)
        try {
            const response = await fetch(`https://www.sankavollerei.com/comic/search?q=${encodeURIComponent(query)}`)
            const data = await response.json()
            setResults(data.comics || [])
        } catch {
            setResults([])
        }
        setLoading(false)
    }

    const handleComicClick = (comic) => {
        const slug = comic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        const link = comic.link?.replace('/manga/', '/').replace('/plus/', '/') || ''
        navigate(`/detail-comic/${slug}`, {
            state: { comic: { title: comic.title, image: comic.image, chapter: comic.chapter || '', source: 'Search', popularity: 'N/A' }, processedLink: link }
        })
        setResults([])
        setQuery('')
    }

    return (
        <div className="relative pt-2 pb-2">
            {/* Hero headline */}
            <div className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                    <span className="red-line h-5"></span>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#dc2626', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.15em' }}>
                        <FontAwesomeIcon icon={faBolt} className="mr-1" />
                        Update Harian
                    </span>
                </div>
                <h1 className="font-black text-white uppercase leading-none"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '0.05em', lineHeight: 1.05 }}>
                    Baca Komik<br />
                    <span style={{ color: '#dc2626' }}>Gratis</span> Indonesia
                </h1>
                <p className="mt-2 text-sm" style={{ color: '#6b7280' }}>
                    Ribuan judul manga, manhwa, dan manhua. Update setiap hari.
                </p>
            </div>

            {/* Search form */}
            <form onSubmit={handleSearch} className="flex max-w-xl">
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Cari judul komik..."
                    className="flex-1 px-4 py-3 text-sm outline-none"
                    style={{
                        background: 'rgb(14,14,18)', color: '#f5f5f8',
                        border: '1px solid rgb(35,35,45)', borderRight: 'none',
                        borderRadius: '4px 0 0 4px',
                        fontFamily: "'Barlow', sans-serif",
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(220,38,38,0.5)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgb(35,35,45)'}
                />
                <button type="submit"
                    className="px-5 py-3 text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider"
                    style={{ background: '#dc2626', borderRadius: '0 4px 4px 0', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.1em' }}>
                    {loading
                        ? <div className="w-4 h-4 border border-white border-t-transparent rounded-full" style={{ animation: 'spin 0.7s linear infinite' }}></div>
                        : <FontAwesomeIcon icon={faSearch} />}
                    Cari
                </button>
            </form>

            {/* Search results */}
            {results.length > 0 && (
                <div className="mt-2 rounded overflow-hidden max-w-xl" style={{ background: 'rgb(14,14,18)', border: '1px solid rgb(35,35,45)' }}>
                    {results.slice(0, 8).map((comic, i) => (
                        <div key={i} onClick={() => handleComicClick(comic)}
                            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors"
                            style={{ borderBottom: '1px solid rgb(22,22,28)' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.08)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <img src={comic.image || 'https://via.placeholder.com/40x56'} alt={comic.title}
                                className="w-9 h-12 object-cover rounded flex-shrink-0" style={{ border: '1px solid rgb(35,35,45)' }} />
                            <div className="min-w-0">
                                <div className="font-semibold text-sm text-white line-clamp-1">{comic.title}</div>
                                <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{comic.chapter || 'Lihat detail'}</div>
                            </div>
                            <FontAwesomeIcon icon={faFire} className="ml-auto text-xs flex-shrink-0" style={{ color: '#dc2626' }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchComic
                                   
