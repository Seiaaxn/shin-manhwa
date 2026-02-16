import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SkeletonLoader from '../SkeletonLoader'

const CardTerbaruComic = () => {
    const [comics, setComics] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const fetchComics = async () => {
        try {
            const response = await axios.get('https://www.sankavollerei.com/comic/terbaru')
            const rawComics = response.data.comics || []
            const filtered = rawComics.filter(item =>
                !item.title.toLowerCase().includes('apk') &&
                !item.chapter.toLowerCase().includes('download')
            )
            const processed = filtered.map(comic => {
                const slug = comic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                const link = comic.link.replace('/manga/', '/').replace('/plus/', '/')
                const imageUrl = comic.image && !comic.image.includes('lazy.jpg') ? comic.image : 'https://via.placeholder.com/300x450?text=No+Cover'
                return { ...comic, image: imageUrl, processedLink: link, slug, source: 'Terbaru', popularity: 'N/A' }
            })
            setComics(processed)
        } catch (err) { setError(err) }
        setLoading(false)
    }

    useEffect(() => { fetchComics() }, [])

    const handleClick = (comic) => {
        navigate(`/detail-comic/${comic.slug}`, {
            state: { comic: { title: comic.title, image: comic.image, chapter: comic.chapter, source: comic.source, popularity: comic.popularity }, processedLink: comic.processedLink }
        })
    }

    const SectionHeader = () => (
        <div className="widget-title-bar">
            <div className="flex items-center justify-between">
                <h2 className="section-title flex items-center gap-2.5">
                    <span className="red-line h-5"></span>
                    Terbaru Hari Ini
                </h2>
                <button className="more-btn">Lihat Semua →</button>
            </div>
            <div className="w-full h-px" style={{ background: 'rgb(35,35,45)' }}></div>
        </div>
    )

    if (loading) return <div><SectionHeader /><SkeletonLoader count={12} type="card" /></div>

    if (error) return (
        <div className="p-4 text-sm text-center rounded" style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', color: '#ef4444' }}>
            Gagal memuat data. Coba lagi nanti.
        </div>
    )

    return (
        <div>
            <SectionHeader />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
                {comics.slice(0, 12).map((comic, index) => (
                    <div key={index} onClick={() => handleClick(comic)} className="card-comic group">
                        <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                            <img
                                src={comic.image}
                                alt={comic.title}
                                className="card-comic-img"
                                onError={e => { e.currentTarget.src = 'https://via.placeholder.com/300x450?text=No+Cover' }}
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }}>
                                <div className="p-2 w-full">
                                    <div className="btn-primary py-1.5">Baca</div>
                                </div>
                            </div>
                            <span className="badge-chapter">{comic.chapter || 'New'}</span>
                        </div>
                        <div className="p-2" style={{ background: 'rgb(14,14,18)' }}>
                            <p className="text-xs font-semibold line-clamp-2 text-white leading-tight" style={{ fontFamily: "'Barlow', sans-serif" }}>
                                {comic.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardTerbaruComic
          
