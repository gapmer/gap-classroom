import React, { useMemo, useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import RankBadge from './components/RankBadge'
import Avatar3D from './components/Avatar3D'
import LessonCatalog from './components/LessonCatalog'
import SubjectPage from './components/SubjectPage'
import QuizRunner from './components/QuizRunner'
import { getUser, saveUser } from './lib/storage'
import { computeRank } from './lib/ranks'

export default function App(){
  const [user, setUser] = useState(()=>{
    const cached = localStorage.getItem('KG_LAST_USER')
    return cached ? getUser(cached) : null
  })
  const nav = useNavigate()

  const rankState = useMemo(()=> computeRank(user?.totalStars || 0), [user?.totalStars])

  function onLoggedIn(u){ localStorage.setItem('KG_LAST_USER', u.username); setUser(u); nav('/app') }

  if(!user) return <Login onLoggedIn={onLoggedIn} />

  return (
    <div>
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4 md:p-5">
          <Link to="/app" className="font-bold tracking-wide">KruGap</Link>
          <nav className="flex items-center gap-3">
            <Link to="/app" className="opacity-80 hover:opacity-100">หน้าแรก</Link>
            <Link to="/profile" className="opacity-80 hover:opacity-100">โปรไฟล์</Link>
            <button onClick={()=>{localStorage.removeItem('KG_LAST_USER');}} className="ml-3 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-sm" onMouseDown={()=>setUser(null)}>ออกจากระบบ</button>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Home user={user} rankState={rankState} />} />
          <Route path="/app" element={<Home user={user} rankState={rankState} />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="/subject/:subjectId" element={<SubjectPage user={user} />} />
          <Route path="/quiz/:subjectId/:lessonIndex" element={<QuizRunner user={user} setUser={setUser} />} />
        </Routes>
      </main>
    </div>
  )
}

function Home({ user, rankState }){
  return (
    <div className="space-y-6">
      <section className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-3xl p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{background:user.avatar.color}}><span className="text-2xl">👩‍🎓</span></div>
            <div><div className="text-xl font-semibold">{user.username}</div><div className="text-xs opacity-70">ยศล่าสุด</div></div>
          </div>
          <div className="mt-4"><RankBadge rankKey={rankState.rank.key} starsInRank={rankState.starsInRank} need={rankState.need} /></div>
          <div className="mt-3 text-sm opacity-80">ดาวรวมทั้งหมด: {user.totalStars}</div>
        </div>
        <div className="rounded-3xl p-6 bg-slate-900/60 border border-slate-800">
          <div className="font-semibold mb-2">เป้าหมาย</div>
          <ol className="list-decimal list-inside opacity-80 text-sm space-y-1"><li>เลือกห้องเรียน</li><li>ทำแบบทดสอบ ≥ 60%</li><li>สะสมดาว • เลื่อนยศ</li></ol>
        </div>
      </section>
      <section><h2 className="text-xl font-semibold mb-3">ห้องเรียนหลักสูตรแกนกลาง (8 วิชา)</h2><LessonCatalog user={user} /></section>
    </div>
  )
}

function Profile({ user, setUser }){
  function updateAvatar(v){ const u={...user, avatar:v}; saveUser(u); setUser(u) }
  return (
    <div className="space-y-6">
      <div className="rounded-3xl p-6 bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full" style={{background:user.avatar.color}}></div>
          <div><div className="text-lg font-semibold">{user.username}</div><div className="text-xs opacity-70">{user.lastRankKey}</div></div>
        </div>
      </div>
      <Avatar3D avatar={user.avatar} onChange={updateAvatar} />
      <div className="rounded-3xl p-6 bg-slate-900/60 border border-slate-800"><div className="font-semibold mb-2">สรุปความคืบหน้า</div><div className="text-sm opacity-80">ดาวรวม: {user.totalStars}</div></div>
    </div>
  )
}
