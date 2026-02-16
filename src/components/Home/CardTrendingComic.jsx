import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SkeletonLoader from '../SkeletonLoader'

const CardTrendingComic = () => {
    const [comics, setComics] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const fetchComics = async () => {
        try {
            const response = await axios.get('https://www.sankavollerei.com/comic/trending')
            const rawComics = response.data.comics || []
            const filtered = rawComics.filter(item =>
                !item.title.toLowerCase().includes('apk') &&
                !item.chapter.toLowerCase().includes('download')
            )
            const processed = filtered.map(comic => {
                const slug = comic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                const link = comic.link.replace('/manga/', '/').replace('/plus/', '/')
                const imageUrl = comic.image && !comic.image.includes('lazy.jpg') ? comic.image : 'https://via.placeholder.com/300x450?text=No+Cover'
                return { ...comic, image: imageUrl, processedLink: link, slug, source: 'Trending' }
            })
            setComics(processed)
        } catch (err) { setError(err) }
        setLoading(false)
    }

    useEffect(() => { fetchComics() }, [])

    const handleClick = (comic) => {
        navigate(`/detail-comic/${comic.slug}`, {
            state: { comic: { title: comic.title, image: comic.image, chapter: comic.chapter, source: comic.source, popularity: comic.popularity || 'N/A' }, processedLink: comic.processedLink }
        })
    }

    const SectionHeader = () => (
        <div className="widget-title-bar">
            <div className="flex items-center justify-between">
                <h2 className="section-title flex items-center gap-2.5">
                    <span className="red-line h-5"></span>
                    Trending Minggu Ini
                </h2>
                <button className="more-btn">Lihat Semua →</button>
            </div>
            <div className="w-full h-px" style={{ background: 'rgb(35,35,45)' }}></div>
        </div>
    )

    if (loading) return <div><SectionHeader /><SkeletonLoader count={10} type="card" /></div>

    if (error) return (
        <div className="p-4 text-sm text-center rounded" style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', color: '#ef4444' }}>
            Gagal memuat data. Coba lagi nanti.
        </div>
    )

    const topThree = comics.slice(0, 3)
    const rest = comics.slice(3, 12)

    return (
        <div>
            <SectionHeader />

            {/* Top 3 — bigger cards with rank badge */}
            <div className="grid grid-cols-3 gap-2.5 mb-2.5">
                {topThree.map((comic, index) => (
                    <div key={index} onClick={() => handleClick(comic)} className="card-comic group relative">
                        <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                            <img src={comic.image} alt={comic.title} className="card-comic-img"
                                onError={e => { e.currentTarget.src = 'https://via.placeholder.com/300x450?text=No+Cover' }} />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), transparent)' }}>
                                <div className="p-2 w-full"><div className="btn-primary py-1.5">Baca</div></div>
                            </div>
                            {/* Rank badge */}
                            <div className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center font-black text-white"
                                style={{
                                    background: index === 0 ? '#dc2626' : index === 1 ? '#6b7280' : '#92400e',
                                    fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1rem',
                                    clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)'
                                }}>
                                {index + 1}
                            </div>
                            {comic.popularity && comic.popularity !== 'N/A' && (
                                <div className="absolute top-1 right-1 text-white text-xs font-bold px-1.5 py-0.5 rounded-sm"
                                    style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(220,38,38,0.5)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.6rem' }}>
                                    ★ {comic.popularity}
                                </div>
                            )}
                        </div>
                        <div className="p-2" style={{ background: 'rgb(14,14,18)' }}>
                            <p className="text-xs font-semibold line-clamp-2 text-white leading-tight">{comic.title}</p>
                            <p className="text-xs mt-0.5" style={{ color: '#dc2626', fontFamily: "'Barlow Condensed', sans-serif" }}>{comic.chapter}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Rest — smaller grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
                {rest.map((comic, index) => (
                    <div key={index} onClick={() => handleClick(comic)} className="card-comic group">
                        <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                            <img src={comic.image} alt={comic.title} className="card-comic-img"
                                onError={e => { e.currentTarget.src = 'https://via.placeholder.com/300x450?text=No+Cover' }} />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                                <div className="p-2 w-full"><div className="btn-primary py-1.5">Baca</div></div>
                            </div>
                            <span className="badge-trending">#{index + 4}</span>
                        </div>
                        <div className="p-2" style={{ background: 'rgb(14,14,18)' }}>
                            <p className="text-xs font-semibold line-clamp-2 text-white leading-tight">{comic.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardTrendingComic
                  
