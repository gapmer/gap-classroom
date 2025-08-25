const KEY='KG_USERS_V1'
function loadAll(){ const raw=localStorage.getItem(KEY); return raw? JSON.parse(raw) : {} }
function saveAll(all){ localStorage.setItem(KEY, JSON.stringify(all)) }
export function register(username, pin){
  const all=loadAll()
  if (all[username]) throw new Error('ชื่อนี้ถูกใช้แล้ว')
  all[username] = { username, pin, createdAt: Date.now(), avatar:{model:'astronaut', color:'#ffffff'}, progress:{}, totalStars:0, lastRankKey:'bronze' }
  saveAll(all); return all[username]
}
export function login(username, pin){
  const all=loadAll(); const u=all[username]
  if(!u) throw new Error('ไม่พบผู้ใช้'); if(u.pin!==pin) throw new Error('รหัสผ่านไม่ถูกต้อง'); return u
}
export function saveUser(user){ const all=loadAll(); all[user.username]=user; saveAll(all) }
export function getUser(username){ const all=loadAll(); return all[username]||null }
