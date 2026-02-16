import React from 'react'

const SkeletonLoader = ({ count = 12, type = 'card' }) => {
    if (type === 'card') {
        return (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
                {Array(count).fill(0).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded" style={{ background: 'rgb(14,14,18)', border: '1px solid rgb(35,35,45)' }}>
                        <div className="relative overflow-hidden" style={{ aspectRatio: '2/3', background: 'rgb(22,22,28)' }}>
                            <div className="absolute inset-0 -translate-x-full animate-shimmer"
                                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }}></div>
                        </div>
                        <div className="p-2" style={{ background: 'rgb(14,14,18)' }}>
                            <div className="h-2.5 rounded-sm mb-1.5" style={{ background: 'rgb(35,35,45)', width: '85%' }}></div>
                            <div className="h-2 rounded-sm" style={{ background: 'rgb(35,35,45)', width: '60%' }}></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {Array(count).fill(0).map((_, i) => (
                <div key={i} className="flex gap-3 p-3 rounded" style={{ background: 'rgb(14,14,18)', border: '1px solid rgb(35,35,45)' }}>
                    <div className="relative overflow-hidden rounded flex-shrink-0" style={{ width: '48px', height: '64px', background: 'rgb(22,22,28)' }}>
                        <div className="absolute inset-0 -translate-x-full animate-shimmer"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }}></div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-2">
                        <div className="h-3 rounded-sm" style={{ background: 'rgb(35,35,45)', width: '75%' }}></div>
                        <div className="h-2.5 rounded-sm" style={{ background: 'rgb(35,35,45)', width: '50%' }}></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SkeletonLoader
