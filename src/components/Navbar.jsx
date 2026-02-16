import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faNewspaper, faFire, faBookOpen, faChartLine, faHistory, faInfinity, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const location = useLocation()

    const navLinks = [
        { name: 'Home', path: '/', icon: faHome },
        { name: 'Terbaru', path: '/terbaru', icon: faNewspaper },
        { name: 'Trending', path: '/trending', icon: faFire },
        { name: 'Pustaka', path: '/pustaka', icon: faBookOpen },
        { name: 'All Comic', path: '/unlimited', icon: faInfinity },
        { name: 'Statistics', path: '/statistics', icon: faChartLine },
        { name: 'History', path: '/history', icon: faHistory },
    ].filter(link => {
        const isProduction = import.meta.env.PROD;
        if (isProduction && link.path === '/statistics') return false;
        return true;
    });

    const isActive = (path) => location.pathname === path

    return (
        <nav id="navbar" style={{ background: 'rgb(8,8,10)', borderBottom: '1px solid rgb(35,35,45)' }} className="fixed w-full z-50 top-0 start-0">
            <div className="h-0.5 w-full" style={{ background: 'linear-gradient(to right, #dc2626, #7f1d1d, transparent)' }}></div>
            <div className="max-w-screen-xl mx-auto px-3 flex flex-wrap items-center justify-between py-2.5">
                <Link to="/" className="flex items-center space-x-2.5">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                        <div className="absolute inset-0 rounded" style={{ background: '#dc2626', opacity: 0.15 }}></div>
                        <svg className="w-5 h-5 relative z-10" style={{ color: '#dc2626' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h1 className="self-center whitespace-nowrap text-white font-black uppercase"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.2rem', letterSpacing: '0.1em' }}>
                        Komik<span style={{ color: '#dc2626' }}>Verse</span>
                    </h1>
                </Link>

                <div className="flex md:order-2 items-center space-x-1">
                    <button onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="inline-flex items-center p-2 w-9 h-9 justify-center rounded transition-all"
                        style={{ color: '#6b7280' }}
                        onMouseEnter={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(220,38,38,0.12)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color='#6b7280'; e.currentTarget.style.background='transparent'; }}>
                        <FontAwesomeIcon icon={isSearchOpen ? faTimes : faSearch} className="w-3.5 h-3.5" />
                    </button>
                    <ThemeToggle />
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="inline-flex items-center p-2 w-9 h-9 justify-center rounded md:hidden transition-all"
                        style={{ color: '#6b7280' }}
                        onMouseEnter={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(220,38,38,0.12)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color='#6b7280'; e.currentTarget.style.background='transparent'; }}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                <div className={`items-center justify-between ${isMenuOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`}>
                    <ul className="flex flex-col p-3 md:p-0 mt-3 md:mt-0 md:flex-row md:gap-0.5 w-full md:w-auto rounded"
                        style={{ background: isMenuOpen ? 'rgb(14,14,18)' : 'transparent', border: isMenuOpen ? '1px solid rgb(35,35,45)' : 'none' }}>
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link to={link.path} onClick={() => setIsMenuOpen(false)}
                                    className={`navbar-link-item flex items-center gap-1.5 ${isActive(link.path) ? 'active' : ''}`}>
                                    <FontAwesomeIcon icon={link.icon} className="w-3 h-3" />
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {isSearchOpen && (
                <div style={{ background: 'rgb(14,14,18)', borderTop: '1px solid rgb(35,35,45)' }}>
                    <div className="max-w-screen-xl mx-auto px-3 py-3">
                        <div className="max-w-2xl mx-auto flex">
                            <input type="search" autoFocus className="block p-2.5 w-full text-sm outline-none"
                                style={{ background: 'rgb(22,22,28)', color: '#f5f5f8', border: '1px solid rgb(35,35,45)', borderRight: 'none', borderRadius: '4px 0 0 4px' }}
                                placeholder="Cari judul komik..." />
                            <button type="button" className="p-2.5 text-sm font-bold text-white"
                                style={{ background: '#dc2626', borderRadius: '0 4px 4px 0', minWidth: '44px' }}>
                                <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
      
