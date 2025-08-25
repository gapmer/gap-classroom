import React, { useState } from 'react'
import { register, login } from '../lib/storage'
export default function Login({ onLoggedIn }){
  const [mode,setMode]=useState('login')
  const [username,setUsername]=useState('')
  const [pin,setPin]=useState('')
  function submit(e){ e.preventDefault(); try{
    if(mode==='signup'){ if(!/^\d{4}$/.test(pin)) throw new Error('ตั้งรหัสผ่านเป็นตัวเลข 4 หลัก'); onLoggedIn(register(username.trim(), pin)) }
    else { onLoggedIn(login(username.trim(), pin)) }
  }catch(err){ alert(err.message) } }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="w-full max-w-md bg-slate-900/70 border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center">KruGap Classroom</h1>
        <p className="text-center text-sm opacity-80 mt-1">เข้าสู่ระบบด้วยชื่อเล่นและรหัสผ่าน 4 หลัก</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div><label className="text-sm opacity-80">ชื่อผู้ใช้</label><input className="w-full mt-1 bg-slate-800 border border-slate-700 rounded px-3 py-2" value={username} onChange={e=>setUsername(e.target.value)} required/></div>
          <div><label className="text-sm opacity-80">รหัสผ่าน (4 หลัก)</label><input className="w-full mt-1 bg-slate-800 border border-slate-700 rounded px-3 py-2" value={pin} onChange={e=>setPin(e.target.value)} required maxLength={4} pattern="\d{4}"/></div>
          <button className="w-full py-2 bg-yellow-400 text-slate-900 font-semibold rounded-xl">{mode==='login'?'เข้าสู่ระบบ':'สมัครและเข้าใช้'}</button>
        </form>
        <div className="text-center mt-4">{mode==='login'?<button className="text-sm underline opacity-80" onClick={()=>setMode('signup')}>ยังไม่มีบัญชี? สมัครใหม่</button>:<button className="text-sm underline opacity-80" onClick={()=>setMode('login')}>มีบัญชีแล้ว? เข้าสู่ระบบ</button>}</div>
        <div className="text-xs opacity-60 mt-4">* เดโมเพื่อการศึกษาเท่านั้น รหัส 4 หลักไม่ปลอดภัยสำหรับระบบจริง</div>
      </div>
    </div>
  )
}
