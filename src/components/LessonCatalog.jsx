import React from 'react'
import { SUBJECTS } from '../lib/ranks'
import { Link } from 'react-router-dom'
export default function LessonCatalog({ user }){
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {SUBJECTS.map(s=> (
        <Link key={s.id} to={`/subject/${s.id}`} className="group rounded-2xl p-5 bg-slate-900/60 border border-slate-800 hover:border-yellow-400 transition">
          <div className="text-xl font-semibold group-hover:text-yellow-300">{s.name}</div>
          <div className="text-sm opacity-70 mt-1">หลักสูตรแกนกลางขั้นพื้นฐาน</div>
          <div className="mt-3 text-xs opacity-70">ความคืบหน้า: {Object.keys(user.progress[s.id]?.lessonsPassed||{}).length} บท</div>
        </Link>
      ))}
    </div>
  )
}
