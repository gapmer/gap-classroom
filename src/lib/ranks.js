export const RANKS = [
  { key: 'bronze', name: 'บรอนซ์', req: 10, subtitle: 'ระดับฝึกหัด', color: '#cd7f32' },
  { key: 'silver', name: 'ซิลเวอร์', req: 10, subtitle: 'ระดับพัฒนา', color: '#c0c0c0' },
  { key: 'gold1', name: 'โกลด์ I', req: 10, subtitle: 'ระดับกำลังสำรอง', color: '#ffd700' },
  { key: 'gold2', name: 'โกลด์ II', req: 10, subtitle: 'ระดับหน่วยรบชำนาญ', color: '#ffd700' },
  { key: 'platinum', name: 'แพลทินัม', req: 10, subtitle: 'ระดับมือปราบ', color: '#66fcf1' },
  { key: 'diamond', name: 'ไดมอนด์', req: 10, subtitle: 'ระดับหน่วยรบพิเศษ', color: '#7df9ff' },
  { key: 'heroic', name: 'ฮีโรอิก', req: 15, subtitle: 'ระดับหัวหน้าหน่วยรบพิเศษ', color: '#ff4d6d' },
  { key: 'grandmaster', name: 'แกรนด์มาสเตอร์', req: 25, subtitle: 'ระดับสูงสุดผู้บังคับบัญชา', color: '#b197fc' },
]

export const SUBJECTS = [
  { id: 'thai', name: 'ภาษาไทย' },
  { id: 'math', name: 'คณิตศาสตร์' },
  { id: 'sci', name: 'วิทยาศาสตร์' },
  { id: 'soc', name: 'สังคมศึกษา' },
  { id: 'eng', name: 'ภาษาอังกฤษ' },
  { id: 'health', name: 'สุขศึกษาและพลศึกษา' },
  { id: 'arts', name: 'ศิลปะ' },
  { id: 'tech', name: 'การงานอาชีพและเทคโนโลยี' },
]

export function computeRank(totalStars){
  let remaining = totalStars
  for (const r of RANKS){
    if (remaining < r.req) return { rank: r, starsInRank: remaining, need: r.req }
    remaining -= r.req
  }
  const gm = RANKS[RANKS.length-1]
  return { rank: gm, starsInRank: gm.req, need: gm.req }
}
