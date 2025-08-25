import React from 'react'
const MODELS={ astronaut:'https://modelviewer.dev/shared-assets/models/Astronaut.glb', robot:'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb', fox:'https://modelviewer.dev/shared-assets/models/Fox.glb' }
export default function Avatar3D({ avatar, onChange }){
  const set=(patch)=>onChange({...avatar,...patch})
  return (
    <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl overflow-hidden bg-black/20">
          <model-viewer src={MODELS[avatar.model]} camera-controls autoplay exposure="1.1" shadow-intensity="1" style={{width:'100%',height:'320px'}}></model-viewer>
        </div>
        <div className="space-y-3">
          <div><label className="text-sm opacity-80">โมเดล</label>
            <select className="w-full mt-1 bg-slate-800 border border-slate-700 rounded px-3 py-2" value={avatar.model} onChange={e=>set({model:e.target.value})}>
              <option value="astronaut">Astronaut</option><option value="robot">Robot</option><option value="fox">Fox</option>
            </select></div>
          <div><label className="text-sm opacity-80">สีธีม (กรอบ/ชื่อ)</label>
            <input type="color" className="w-full h-10 bg-transparent" value={avatar.color} onChange={e=>set({color:e.target.value})}/></div>
          <div className="text-xs opacity-70">* ต้องการแต่งทรงผม/ชุดแบบ Free Fire ให้เตรียม GLB เป็นชิ้น ๆ แล้วสลับในไฟล์นี้</div>
        </div>
      </div>
    </div>
  )
}
