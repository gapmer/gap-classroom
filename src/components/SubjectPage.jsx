import React from 'react'
import { Link, useParams } from 'react-router-dom'
const TOTAL=10
export default function SubjectPage({ user }){
  const { subjectId } = useParams()
  const passed = user.progress[subjectId]?.lessonsPassed || {}
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">บทเรียนของวิชา</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {Array.from({length: TOTAL}).map((_,i)=>{
          const done = passed[i] !== undefined
          return (
            <Link key={i} to={`/quiz/${subjectId}/${i}`} className={"rounded-xl p-4 border bg-slate-900/60 " + (done ? "border-green-500" : "border-slate-800 hover:border-yellow-400")}>
              <div className="flex items-center justify-between"><div className="font-semibold">บทที่ {i+1}</div><div className="text-sm opacity-70">{done?'ผ่านแล้ว ⭐':'เริ่มแบบทดสอบ'}</div></div>
            </Link>
          )
        })}
      </div>
      <Link to="/app" className="inline-block text-sm underline opacity-80">← กลับหน้าแรก</Link>
    </div>
  )
}
