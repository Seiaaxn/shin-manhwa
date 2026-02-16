import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import SearchComic from '../components/Home/SearchComic'
import CardTerbaruComic from '../components/Home/CardTerbaruComic'
import CardTrendingComic from '../components/Home/CardTrendingComic'
import SEO from '../components/SEO'

const Home = () => {
  return (
    <>
      <SEO
        title="Komik-Verse - Baca Komik Gratis Bahasa Indonesia Terbaru"
        description="Baca komik online gratis di Komik-Verse. Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia. Update setiap hari!"
        keywords="komik indonesia, baca komik gratis, komik online, manga indonesia, manhwa indonesia"
        url="https://juju-manhwa-2-0.vercel.app/"
      />
      <div className="min-h-screen" style={{ background: 'rgb(8,8,10)', color: '#f5f5f8' }}>
        <div className="max-w-screen-xl mx-auto px-3 pt-4 pb-8">

          {/* Terbaru */}
          <div className="mt-8">
            <CardTerbaruComic />
          </div>

          {/* Trending */}
          <div className="mt-10">
            <CardTrendingComic />
          </div>

          {/* Pustaka CTA */}
          <div className="mt-10 rounded" style={{ background: 'rgb(14,14,18)', border: '1px solid rgb(35,35,45)' }}>
            <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)' }}>
                  <FontAwesomeIcon icon={faBookOpen} style={{ color: '#ef4444' }} className="text-lg" />
                </div>
                <div>
                  <h2 className="font-black text-white uppercase tracking-wide"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.05rem', letterSpacing: '0.08em' }}>
                    Pustaka Komik
                  </h2>
                  <p className="text-sm mt-0.5" style={{ color: '#6b7280' }}>Jelajahi koleksi lengkap ribuan judul komik</p>
                </div>
              </div>
              <Link to="/pustaka"
                className="flex items-center gap-2 font-bold text-white text-sm px-4 py-2 rounded whitespace-nowrap uppercase tracking-widest transition-colors"
                style={{ background: '#dc2626', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.1em' }}
                onMouseEnter={e => e.currentTarget.style.background = '#b91c1c'}
                onMouseLeave={e => e.currentTarget.style.background = '#dc2626'}>
                Lihat Semua
                <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ background: 'rgb(8,8,10)', borderTop: '1px solid rgb(35,35,45)' }} className="mt-8">
          <div className="h-0.5" style={{ background: 'linear-gradient(to right, #dc2626, transparent)' }}></div>
          <div className="max-w-screen-xl mx-auto px-3 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)' }}>
                  <svg className="w-4 h-4" style={{ color: '#dc2626' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="font-black text-white uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.1em' }}>
                  Shin<span style={{ color: '#dc2626' }}>Verse</span>
                </span>
              </div>
              <p className="text-xs" style={{ color: '#4b5563' }}>
                © {new Date().getFullYear()} Komik-Verse — Platform baca komik online
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home
                      
