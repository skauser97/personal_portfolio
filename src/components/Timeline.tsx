'use client'
import { useEffect, useRef } from 'react'

const NODES = [
  { year: '2015', label: 'Medical Electronics', sub: 'BMS College of Engineering',  col: [167,139,250] },
  { year: '2019', label: 'Data & Consulting',   sub: 'LTI Mindtree · Deloitte',     col: [245,158,11]  },
  { year: '2022', label: 'Health Data Science', sub: 'University of Exeter',         col: [34,211,238]  },
  { year: '2023', label: 'NHS East Kent',        sub: 'Data Analyst',                col: [244,114,182] },
  { year: '2024', label: 'AI Engineer',          sub: 'Ruya Labs · NGO Voice AI',   col: [99,102,241]  },
  { year: '2026', label: 'Builder',              sub: 'Hilmy · Biotech · Teaching', col: [52,211,153]  },
]

export default function Timeline() {
  const ref = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0, H = 0

    function resize() {
      W = wrap!.offsetWidth  || window.innerWidth
      H = 320
      canvas!.style.width  = W + 'px'
      canvas!.style.height = H + 'px'
      canvas!.width  = W * DPR
      canvas!.height = H * DPR
      ctx.setTransform(1,0,0,1,0,0)
      ctx.scale(DPR, DPR)
    }
    resize()
    window.addEventListener('resize', resize)

    // Node positions — padded so first/last labels don't clip
    const PAD = 90
    const NODE_POS = NODES.map((_, i) => ({
      fx: (PAD + i * ((W - PAD*2) / (NODES.length - 1))) / W,
      fy: i % 2 === 0 ? 0.72 : 0.28,
    }))

    // Catmull-Rom spline
    type P2 = {x:number;y:number}
    function catmullRom(p0:P2,p1:P2,p2:P2,p3:P2,t:number):P2 {
      const t2=t*t,t3=t2*t
      return {
        x:0.5*((2*p1.x)+(-p0.x+p2.x)*t+(2*p0.x-5*p1.x+4*p2.x-p3.x)*t2+(-p0.x+3*p1.x-3*p2.x+p3.x)*t3),
        y:0.5*((2*p1.y)+(-p0.y+p2.y)*t+(2*p0.y-5*p1.y+4*p2.y-p3.y)*t2+(-p0.y+3*p1.y-3*p2.y+p3.y)*t3),
      }
    }

    function buildPath() {
      const pts = NODE_POS.map(n=>({x:n.fx*W, y:n.fy*H}))
      const PATH:P2[] = []
      const STEPS = 500
      const seg = Math.floor(STEPS / (pts.length-1))
      for (let i=0;i<pts.length-1;i++) {
        const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)]
        for (let s=0;s<seg;s++) PATH.push(catmullRom(p0,p1,p2,p3,s/seg))
      }
      PATH.push(pts[pts.length-1])
      return PATH
    }

    let PATH = buildPath()
    let PLEN = PATH.length

    // State
    let packetT = 0, phase: 'travel'|'pause' = 'travel'
    let activeNode = -1, visitedUpTo = -1
    let pauseTimer = 0, wheelRot = 0, prevPacketT = 0, lastTS = 0
    const SPEED = 0.00020
    const NODE_PAUSE = 1800
    const RESET_PAUSE = 900
    const expand = NODES.map(()=>0)

    function lerp(a:number,b:number,t:number){return a+(b-a)*t}
    function clamp(v:number,lo:number,hi:number){return Math.max(lo,Math.min(hi,v))}

    // Check which node is closest to current packetT
    const nodeTs = NODES.map((_,i)=>i/(NODES.length-1))

    function drawBike(cx:number,cy:number,angle:number) {
      const WR = 9
      ctx.save()
      ctx.translate(cx,cy); ctx.rotate(angle)

      // Wheels
      for (const ax of [-WR*1.22, WR*1.22]) {
        ctx.beginPath(); ctx.arc(ax, WR*0.1, WR, 0, Math.PI*2)
        ctx.strokeStyle='rgba(167,139,250,0.9)'; ctx.lineWidth=1.3; ctx.stroke()
        for (let s=0;s<6;s++) {
          const sa=wheelRot+s*(Math.PI/3)
          ctx.beginPath()
          ctx.moveTo(ax, WR*0.1)
          ctx.lineTo(ax+Math.cos(sa)*WR*0.85, WR*0.1+Math.sin(sa)*WR*0.85)
          ctx.strokeStyle='rgba(167,139,250,0.4)'; ctx.lineWidth=0.7; ctx.stroke()
        }
      }

      // Frame
      const bb:P2={x:0,y:WR*0.05}
      const hT:P2={x:WR*0.85,y:-WR*1.05}
      const sC:P2={x:-WR*0.35,y:-WR*1.35}
      ctx.strokeStyle='rgba(129,140,248,0.95)'; ctx.lineWidth=1.4
      const lines:[[P2,P2]][] = [
        [[-WR*1.22,WR*0.1] as unknown as P2, bb as P2],
        [bb, sC],
        [sC, hT],
        [bb, hT],
        [[-WR*1.22,WR*0.1] as unknown as P2, sC],
        [hT, [WR*1.22,WR*0.1] as unknown as P2],
      ]
      lines.forEach(([a,b])=>{
        const ap=a as unknown as {x:number;y:number}
        const bp=b as unknown as {x:number;y:number}
        ctx.beginPath(); ctx.moveTo(ap.x??a[0],ap.y??a[1]); ctx.lineTo(bp.x??b[0],bp.y??b[1]); ctx.stroke()
      })

      // Handlebar
      ctx.beginPath(); ctx.moveTo(hT.x-WR*0.05,hT.y); ctx.lineTo(hT.x+WR*0.25,hT.y-WR*0.2)
      ctx.stroke()

      // Seat
      ctx.beginPath()
      ctx.moveTo(sC.x-WR*0.35,sC.y-WR*0.15); ctx.lineTo(sC.x+WR*0.35,sC.y-WR*0.15)
      ctx.strokeStyle='rgba(167,139,250,0.9)'; ctx.stroke()

      // Rider torso
      ctx.beginPath()
      ctx.moveTo(sC.x,sC.y)
      ctx.quadraticCurveTo(sC.x+WR*0.2,sC.y-WR*0.7,hT.x-WR*0.1,hT.y-WR*0.3)
      ctx.strokeStyle='rgba(34,211,238,0.9)'; ctx.lineWidth=1.6; ctx.stroke()

      // Head
      ctx.beginPath()
      ctx.arc(sC.x+WR*0.25,sC.y-WR*1.0,WR*0.32,0,Math.PI*2)
      ctx.fillStyle='rgba(34,211,238,0.9)'; ctx.fill()

      ctx.restore()
    }

    function frame(ts:number) {
      const dt = ts-(lastTS||ts); lastTS=ts
      ctx.clearRect(0,0,W,H)

      // Rebuild path if canvas resized
      const pts = NODE_POS.map(n=>({x:n.fx*W,y:n.fy*H}))

      // Draw track (grey)
      ctx.beginPath()
      PATH.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y))
      ctx.strokeStyle='rgba(99,102,241,0.18)'; ctx.lineWidth=2.5; ctx.stroke()

      // Draw visited glow
      const visitIdx = Math.floor(clamp(packetT,0,0.9999)*(PLEN-1))
      if (visitedUpTo >= 0) {
        ctx.beginPath()
        PATH.slice(0,visitIdx+2).forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y))
        const grad = ctx.createLinearGradient(PATH[0].x,0,PATH[visitIdx].x,0)
        grad.addColorStop(0,'rgba(167,139,250,0.7)')
        grad.addColorStop(0.5,'rgba(34,211,238,0.6)')
        grad.addColorStop(1,'rgba(52,211,153,0.5)')
        ctx.strokeStyle=grad; ctx.lineWidth=2.5; ctx.stroke()
      }

      // Draw nodes
      NODES.forEach((n,i)=>{
        const px=pts[i].x, py=pts[i].y
        const target = i<=visitedUpTo ? 1 : 0
        expand[i] = lerp(expand[i], target, 0.07)
        const [r,g,b] = n.col
        const baseR=7, bonusR=expand[i]*9
        const dotR=baseR+bonusR

        // Outer glow
        const grd=ctx.createRadialGradient(px,py,0,px,py,dotR*3)
        grd.addColorStop(0,`rgba(${r},${g},${b},${0.25*expand[i]})`)
        grd.addColorStop(1,`rgba(${r},${g},${b},0)`)
        ctx.beginPath(); ctx.arc(px,py,dotR*3,0,Math.PI*2)
        ctx.fillStyle=grd; ctx.fill()

        // Ring
        ctx.beginPath(); ctx.arc(px,py,dotR,0,Math.PI*2)
        ctx.strokeStyle=`rgba(${r},${g},${b},${0.5+expand[i]*0.5})`
        ctx.lineWidth=2; ctx.stroke()

        // Fill
        ctx.beginPath(); ctx.arc(px,py,dotR-2,0,Math.PI*2)
        ctx.fillStyle=`rgba(${r},${g},${b},${0.15+expand[i]*0.5})`
        ctx.fill()

        // Inner dot
        ctx.beginPath(); ctx.arc(px,py,3+expand[i]*2,0,Math.PI*2)
        ctx.fillStyle=`rgba(${r},${g},${b},${0.7+expand[i]*0.3})`
        ctx.shadowColor=`rgb(${r},${g},${b})`; ctx.shadowBlur=expand[i]*14
        ctx.fill(); ctx.shadowBlur=0

        // Label — above or below based on position
        const labelAlpha = clamp(expand[i]*2.5,0,1)
        if (labelAlpha > 0.05) {
          const above = py < H*0.5
          const ly = above ? py-dotR-18 : py+dotR+16

          const isLight = document.documentElement.classList.contains('light')
          const textMain  = isLight ? 'rgba(15,10,40,0.95)'  : 'rgba(226,232,240,0.95)'
          const textMuted = isLight ? 'rgba(50,40,80,0.75)'  : 'rgba(100,116,139,0.85)'

          // Year
          ctx.globalAlpha=labelAlpha
          ctx.fillStyle=`rgb(${r},${g},${b})`
          ctx.font='bold 11px "JetBrains Mono",monospace'
          ctx.textAlign='center'
          ctx.fillText(n.year, px, ly)

          // Label
          ctx.fillStyle=textMain
          ctx.font='bold 10px "JetBrains Mono",monospace'
          ctx.fillText(n.label, px, ly+14)

          // Sub
          ctx.fillStyle=textMuted
          ctx.font='9px "JetBrains Mono",monospace'
          ctx.fillText(n.sub, px, ly+26)

          ctx.globalAlpha=1
        }
      })

      // Bike position & movement
      const idx = Math.floor(clamp(packetT,0,0.9999)*(PLEN-1))
      const pos = PATH[idx]

      if (phase==='travel') {
        prevPacketT=packetT
        packetT+=dt*SPEED
        wheelRot+=(packetT-prevPacketT)*PLEN*0.55

        // Check node proximity
        for (let ni=0;ni<NODES.length;ni++) {
          if (ni<=activeNode) continue
          const nt=nodeTs[ni]
          if (Math.abs(packetT-nt)<0.012) {
            activeNode=ni; visitedUpTo=ni; phase='pause'; pauseTimer=0; break
          }
        }
        if (packetT>=1) {
          activeNode=NODES.length-1; visitedUpTo=NODES.length-1
          phase='pause'; pauseTimer=0
        }
      } else {
        pauseTimer+=dt
        const duration = activeNode===NODES.length-1 ? NODE_PAUSE+RESET_PAUSE : NODE_PAUSE
        if (pauseTimer>=duration) {
          if (activeNode===NODES.length-1) {
            packetT=0; prevPacketT=0; activeNode=-1; visitedUpTo=-1
          }
          phase='travel'
        }
      }

      const ahead=PATH[Math.min(idx+4,PLEN-1)]
      const angle=Math.atan2(ahead.y-pos.y,ahead.x-pos.x)
      drawBike(pos.x,pos.y,angle)

      animId=requestAnimationFrame(frame)
    }

    animId=requestAnimationFrame(frame)
    return ()=>{ cancelAnimationFrame(animId); window.removeEventListener('resize',resize) }
  }, [])

  return (
    <section id="timeline" style={{ borderBottom:'1px solid var(--border)' }}>
      <div className="section-wrap">
        <p className="section-label reveal">Career Path</p>
        <h2 className="section-title reveal">The journey so far.</h2>
        <div ref={wrapRef} className="reveal" style={{ width:'100%', marginTop:'2rem', position:'relative' }}>
          <canvas
            ref={ref}
            style={{
              display:'block',
              width:'100%',
              borderRadius:'14px',
            }}
          />
        </div>
      </div>
    </section>
  )
}
