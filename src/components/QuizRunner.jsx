import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { saveUser } from '../lib/storage'
const BANK=[
  { q: '5 + 7 = ?', choices: ['10','11','12','13'], a: 2 },
  { q: 'เสียงสระในคำว่า "เรา" มีกี่เสียง?', choices: ['1','2','3','4'], a: 1 },
  { q: 'รัฐธรรมนูญคืออะไร?', choices: ['กฎหมายสูงสุดของประเทศ','หนังสือเรียน','เพลงชาติ','แบบฝึกหัด'], a: 0 },
  { q: 'ภาษาอังกฤษ: Cat แปลว่าอะไร?', choices: ['หมา','แมว','นก','ปลา'], a: 1 },
  { q: 'ระบบสุริยะมีดวงอาทิตย์เป็น', choices: ['ดาวเคราะห์','ดาวฤกษ์','ดาวหาง','ดวงจันทร์'], a: 1 },
]
export default function QuizRunner({ user, setUser }){
  const { subjectId, lessonIndex } = useParams()
  const nav = useNavigate()
  const [answers,setAnswers]=useState(Array(BANK.length).fill(null))
  const [submitted,setSubmitted]=useState(false)
  const [scorePct,setScorePct]=useState(0)
  function choose(i,c){ const a=[...answers]; a[i]=c; setAnswers(a) }
  function submit(){
    const correct = answers.reduce((acc,a,i)=> acc + (a===BANK[i].a?1:0), 0)
    const pct = Math.round((correct/BANK.length)*100)
    setScorePct(pct); setSubmitted(true)
    if(pct>=60){
      const prog = user.progress[subjectId] || { lessonsPassed:{} }
      if (prog.lessonsPassed[lessonIndex] === undefined){
        prog.lessonsPassed[lessonIndex] = pct
        user.progress[subjectId] = prog
        const total = Object.values(user.progress).reduce((s, x)=> s + Object.keys(x.lessonsPassed||{}).length, 0)
        user.totalStars = total
        saveUser(user); setUser({...user})
      }
    }
  }
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">แบบทดสอบบทที่ {Number(lessonIndex)+1}</h2>
      <div className="space-y-3">
        {BANK.map((item,i)=>(
          <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="font-medium">{i+1}. {item.q}</div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {item.choices.map((c,idx)=>(
                <label key={idx} className={"cursor-pointer px-3 py-2 rounded border " + (answers[i]===idx ? "border-yellow-400 bg-slate-800" : "border-slate-700 bg-slate-900/40")}>
                  <input type="radio" name={"q"+i} className="hidden" onChange={()=>choose(i,idx)}/>
                  {c}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {!submitted ? (
        <button onClick={submit} className="px-6 py-2 bg-yellow-400 text-slate-900 rounded-xl font-semibold">ส่งคำตอบ</button>
      ) : (
        <div className="space-y-3">
          <div className="text-xl">คะแนน: <span className="font-bold">{scorePct}%</span> ({scorePct>=60?'ผ่าน ✅ +1 ดาว':'ยังไม่ผ่าน ลองใหม่ได้'})</div>
          <button onClick={()=>nav(-1)} className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700">กลับรายการบทเรียน</button>
        </div>
      )}
    </div>
  )
}
