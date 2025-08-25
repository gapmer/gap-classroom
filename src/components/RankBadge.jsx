import React from 'react'
import { RANKS } from '../lib/ranks'
export default function RankBadge({ rankKey, starsInRank, need }){
  const r = RANKS.find(x=>x.key===rankKey) || RANKS[0]
  const pct = Math.min(100, Math.round((starsInRank/need)*100))
  return (
    <div className="rounded-2xl p-4 bg-slate-800/60 border border-slate-700 shadow">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background:r.color}}><span className="font-bold text-slate-900">★</span></div>
        <div><div className="font-semibold text-lg">{r.name}</div><div className="text-xs opacity-80">{r.subtitle}</div></div>
      </div>
      <div className="mt-3 h-2 bg-slate-700 rounded overflow-hidden"><div className="h-2 bg-yellow-400" style={{width:pct+'%'}}></div></div>
      <div className="mt-1 text-xs text-right opacity-80">{starsInRank} / {need} ดาว</div>
    </div>
  )
}
