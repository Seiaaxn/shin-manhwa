import React from 'react'

const ThemeToggle = () => {
    const toggleTheme = () => {
        const html = document.documentElement
        const isDark = html.getAttribute('data-theme') === 'dark'
        html.setAttribute('data-theme', isDark ? 'light' : 'dark')
    }

    return (
        <button
            onClick={toggleTheme}
            className="inline-flex items-center p-2 w-9 h-9 justify-center rounded transition-all"
            style={{ color: '#6b7280' }}
            onMouseEnter={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(220,38,38,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.color='#6b7280'; e.currentTarget.style.background='transparent'; }}
            title="Toggle Theme"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        </button>
    )
}

export default ThemeToggle
