'use client'
import { useEffect, useRef } from 'react'

export default function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = ref.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')!
    let aid: number

    const COLORS = { accent:[129,140,248], accent2:[167,139,250], accent3:[59,130,246] }
    const [ar,ag,ab]   = COLORS.accent
    const [a2r,a2g,a2b] = COLORS.accent2
    const [a3r,a3g,a3b] = COLORS.accent3

    const DPR = Math.min(window.devicePixelRatio||1, 2)
    let W = 0, H = 0
    let gT = 0, lastTS = 0, sRY = 0
    const HOLD = 4400, MT = 2100
    const N = 80
    let ph = 0, morphing = false, holdT = 0, morphT = 0
    let from: {x:number;y:number;z:number;si:number}[] = []
    let to:   {x:number;y:number;z:number;si:number}[] = []
    const pulses: {ci:number;t:number;sp:number;c:boolean}[] = []
    let lastPulse = 0
    const mRef = { x: 0.5, y: 0.5 }

    const eio = (t:number) => t<.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2
    const lerp = (a:number,b:number,t:number) => a+(b-a)*t
    const GOLD = Math.PI*(3-Math.sqrt(5))

    const resize = () => {
      W = cvs.offsetWidth || window.innerWidth
      H = cvs.offsetHeight || window.innerHeight
      cvs.width = W*DPR; cvs.height = H*DPR
      ctx.setTransform(DPR,0,0,DPR,0,0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Sphere geometry (Fibonacci / golden angle)
    const SN: [number,number,number][] = []
    for (let i=0;i<N;i++) {
      const yu=1-(i/(N-1))*2, rad=Math.sqrt(Math.max(0,1-yu*yu)), th=GOLD*i
      SN.push([Math.cos(th)*rad, yu, Math.sin(th)*rad])
    }
    const SC: [number,number][] = []
    for (let i=0;i<N;i++) for (let j=i+1;j<N;j++) {
      const d=SN[i][0]*SN[j][0]+SN[i][1]*SN[j][1]+SN[i][2]*SN[j][2]
      if (Math.acos(Math.min(1,Math.max(-1,d)))<0.54) SC.push([i,j])
    }

    const proj = (x:number,y:number,z:number) => {
      const sc=Math.min(W,H)*0.255, fov=3.5, d=fov/(fov+z+0.001)
      return { sx: W*0.71+x*d*sc, sy: H/2+y*d*sc, d }
    }

    type Pt = { x:number; y:number; z:number; si:number }

    const getDNA = (t:number): Pt[] => {
      const n=40, R=0.64, Ht=1.85, pos:Pt[] = new Array(N)
      for (let i=0;i<n;i++) {
        const f=i/(n-1), a=f*4.6*Math.PI+t*0.28, y=-Ht/2+f*Ht
        pos[i]   = { x:Math.sin(a)*R, y, z:Math.cos(a)*R, si:0 }
        pos[i+n] = { x:-Math.sin(a)*R, y, z:-Math.cos(a)*R, si:1 }
      }
      return pos
    }

    const getSphere = (ry:number): Pt[] => {
      const pos:Pt[] = new Array(N)
      const [cy2,sy2]=[Math.cos(ry),Math.sin(ry)]
      const [cxt,sxt]=[Math.cos(0.22),Math.sin(0.22)]
      const mx=(mRef.x-0.5)*0.38, my=(mRef.y-0.5)*0.30
      const [cmx,smx]=[Math.cos(mx),Math.sin(mx)]
      const [cmy,smy]=[Math.cos(my),Math.sin(my)]
      for (let i=0;i<N;i++) {
        let [x,y,z]=SN[i]
        ;[x,z]=[x*cy2+z*sy2,-x*sy2+z*cy2]
        ;[y,z]=[y*cxt-z*sxt,y*sxt+z*cxt]
        ;[x,z]=[x*cmx+z*smx,-x*smx+z*cmx]
        ;[y,z]=[y*cmy-z*smy,y*smy+z*cmy]
        pos[i]={ x,y,z,si:2 }
      }
      return pos
    }

    const getWave = (t:number): Pt[] => {
      const sc=Math.min(W,H)*0.255, pos:Pt[]=[]
      const LD=[
        {cx:(0.54-0.71)*W/sc, w:0.14*W/sc, amp:0.17*H/sc, ph:0,   n:27},
        {cx:(0.68-0.71)*W/sc, w:0.10*W/sc, amp:0.14*H/sc, ph:1.6, n:26},
        {cx:(0.80-0.71)*W/sc, w:0.12*W/sc, amp:0.16*H/sc, ph:3.1, n:27},
      ]
      LD.forEach(({cx,w,amp,ph:lph,n},li)=>{
        const brt=0.78+0.22*Math.sin(t*0.9+lph)
        for (let i=0;i<n;i++) {
          const f=i/(n-1), x=cx-w/2+f*w, yy=Math.sin(f*Math.PI)*amp*brt
          pos.push({ x, y:(i%2===0?-1:1)*yy, z:0, si:3+li })
        }
      })
      return pos
    }

    const getPos = (p:number,t:number):Pt[] => p===0?getDNA(t):p===1?getSphere(sRY):getWave(t)

    const drawDNA = (pos:Pt[], alp=1) => {
      if (alp<.01) return
      ctx.globalAlpha=alp
      const sA:Pt[]=[], sB:Pt[]=[]
      pos.forEach(p=>{ if(p.si===0)sA.push(p); else if(p.si===1)sB.push(p) })
      for (let i=0;i<Math.min(sA.length,sB.length);i+=2) {
        const pa=proj(sA[i].x,sA[i].y,sA[i].z), pb=proj(sB[i].x,sB[i].y,sB[i].z)
        ctx.beginPath(); ctx.moveTo(pa.sx,pa.sy); ctx.lineTo(pb.sx,pb.sy)
        ctx.strokeStyle=`rgba(${ar},${ag},${ab},0.32)`; ctx.lineWidth=1.0; ctx.stroke()
      }
      ;[[sA,[a2r,a2g,a2b]],[sB,[a3r,a3g,a3b]]].forEach(([strand,col])=>{
        const s=strand as Pt[], [r,g,b]=col as number[]
        if (!s.length) return
        ctx.beginPath()
        s.forEach((p,i)=>{ const {sx,sy}=proj(p.x,p.y,p.z); i===0?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy) })
        ctx.strokeStyle=`rgba(${r},${g},${b},0.88)`; ctx.lineWidth=1.8
        ctx.shadowColor=`rgb(${r},${g},${b})`; ctx.shadowBlur=14; ctx.stroke(); ctx.shadowBlur=0
      })
      ;[...pos].sort((a,b2)=>a.z-b2.z).forEach(p=>{
        const {sx,sy,d}=proj(p.x,p.y,p.z)
        const [r,g,b]=p.si===0?[a2r,a2g,a2b]:[a3r,a3g,a3b]
        const nr=1.8+d*6.2
        ctx.shadowColor=`rgb(${r},${g},${b})`; ctx.shadowBlur=nr*4.0
        ctx.fillStyle=`rgba(${r},${g},${b},${0.5+d*0.5})`
        ctx.beginPath(); ctx.arc(sx,sy,nr,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0
      })
      ctx.globalAlpha=1
    }

    const drawSphere = (pos:Pt[], alp=1) => {
      if (alp<.01) return
      const PP=pos.map(p=>proj(p.x,p.y,p.z))
      SC.forEach(([a,b2])=>{
        const pa=PP[a],pb=PP[b2],avg=(pa.d+pb.d)/2
        if (avg<0.42) return
        ctx.globalAlpha=alp*Math.min(0.72,(avg-0.42)*1.30)
        if (avg>0.65){ctx.shadowColor=`rgb(${ar},${ag},${ab})`;ctx.shadowBlur=7}
        ctx.strokeStyle=`rgb(${ar},${ag},${ab})`; ctx.lineWidth=1.0
        ctx.beginPath(); ctx.moveTo(pa.sx,pa.sy); ctx.lineTo(pb.sx,pb.sy); ctx.stroke(); ctx.shadowBlur=0
      })
      ctx.globalAlpha=alp
      if (gT-lastPulse>0.07&&pulses.length<24) {
        pulses.push({ci:Math.floor(Math.random()*SC.length),t:0,sp:0.007+Math.random()*0.010,c:Math.random()>0.5})
        lastPulse=gT
      }
      for (let i=pulses.length-1;i>=0;i--) {
        const p=pulses[i]; p.t+=p.sp
        if (p.t>1){pulses.splice(i,1);continue}
        const [a2,b2]=SC[p.ci]
        if (!PP[a2]||!PP[b2]) continue
        const px=lerp(PP[a2].sx,PP[b2].sx,p.t), py=lerp(PP[a2].sy,PP[b2].sy,p.t)
        const [r,g,b3]=p.c?[a3r,a3g,a3b]:[a2r,a2g,a2b]
        ctx.globalAlpha=alp*0.9
        ctx.shadowColor=`rgb(${r},${g},${b3})`; ctx.shadowBlur=20
        ctx.fillStyle=`rgb(${r},${g},${b3})`
        ctx.beginPath(); ctx.arc(px,py,3.2,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0
      }
      ctx.globalAlpha=alp
      PP.forEach(({sx,sy,d},i)=>{
        const iB=i%6===0
        const [r,g,b]=iB?[a3r,a3g,a3b]:[a2r,a2g,a2b]
        ctx.shadowColor=`rgb(${r},${g},${b})`; ctx.shadowBlur=(iB?18:9)*d
        ctx.fillStyle=`rgba(${r},${g},${b},${0.40+d*0.60})`
        ctx.beginPath(); ctx.arc(sx,sy,1.2+d*3.5,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0
      })
      ctx.globalAlpha=1
    }

    const drawWave = (alp=1) => {
      if (alp<.01) return
      ctx.globalAlpha=alp
      const cy2=H/2, x0=W*0.47, xW=W*0.46
      const STRANDS=52, STEPS=320, maxA=H*0.20
      for (let si=0;si<STRANDS;si++) {
        const spread=(si/(STRANDS-1))*2-1, ct=Math.abs(spread)
        const isCore=ct<0.07
        const r=Math.round(lerp(a2r,a3r,Math.pow(ct,0.50)))
        const g=Math.round(lerp(a2g,a3g,Math.pow(ct,0.50)))
        const b=Math.round(lerp(a2b,a3b,Math.pow(ct,0.50)))
        const opa=isCore?1.0:Math.pow(1-ct,1.9)*0.96
        const lw=isCore?3.0:Math.max(0.2,(1-ct)*1.2)
        const fv=1+spread*0.025
        ctx.beginPath()
        ctx.strokeStyle=`rgba(${r},${g},${b},${opa})`; ctx.lineWidth=lw
        if (isCore){ctx.shadowColor=`rgb(${r},${g},${b})`;ctx.shadowBlur=32}
        else if (ct<0.26){ctx.shadowColor=`rgb(${r},${g},${b})`;ctx.shadowBlur=9}
        for (let xi=0;xi<=STEPS;xi++) {
          const f=xi/STEPS, x=x0+f*xW
          const carrier=Math.sin(f*Math.PI*2*2.5*fv-gT*0.28)
          const env=Math.pow(Math.sin(f*Math.PI),0.46)*(1.0+Math.sin(f*Math.PI*2*0.7+gT*0.10)*0.46)
          const y=cy2+carrier*env*maxA*spread
          xi===0?ctx.moveTo(x,y):ctx.lineTo(x,y)
        }
        ctx.stroke(); ctx.shadowBlur=0
      }
      ctx.beginPath(); ctx.moveTo(x0,cy2); ctx.lineTo(x0+xW,cy2)
      ctx.strokeStyle=`rgba(${a2r},${a2g},${a2b},0.30)`; ctx.lineWidth=0.8
      ctx.shadowColor=`rgb(${a2r},${a2g},${a2b})`; ctx.shadowBlur=8
      ctx.stroke(); ctx.shadowBlur=0; ctx.globalAlpha=1
    }

    const drawPts = (pts:Pt[], alp:number) => {
      if (alp<.01) return
      ctx.globalAlpha=alp
      pts.forEach(p=>{
        const {sx,sy}=proj(p.x,p.y,p.z||0)
        const [r,g,b]=p.si===0?[a2r,a2g,a2b]:p.si===1?[a3r,a3g,a3b]:[ar,ag,ab]
        ctx.shadowColor=`rgb(${r},${g},${b})`; ctx.shadowBlur=9
        ctx.fillStyle=`rgba(${r},${g},${b},0.9)`
        ctx.beginPath(); ctx.arc(sx,sy,2.8,0,Math.PI*2); ctx.fill()
      })
      ctx.shadowBlur=0; ctx.globalAlpha=1
    }

    const frame = (ts:number) => {
      if (!lastTS) lastTS=ts
      const dt=Math.min((ts-lastTS)/1000,.05); lastTS=ts; gT+=dt
      if (!morphing&&ts-holdT>=HOLD) {
        morphing=true; morphT=ts
        from=[...getPos(ph,gT)]
        to=[...getPos((ph+1)%3,gT)]
        pulses.length=0
      }
      if (morphing&&ts-morphT>=MT) { morphing=false; ph=(ph+1)%3; holdT=ts }
      if (ph===1||(morphing&&(ph+1)%3===1)) sRY+=dt*0.20
      ctx.clearRect(0,0,W,H)
      if (!morphing) {
        if (ph===0) drawDNA(getDNA(gT))
        else if (ph===1) drawSphere(getSphere(sRY))
        else drawWave()
      } else {
        const mt=eio(Math.min(1,(ts-morphT)/MT)), fa=1-mt, nph=(ph+1)%3
        if (ph===0) drawDNA(getDNA(gT),fa)
        else if (ph===1) drawSphere(getSphere(sRY),fa)
        else drawWave(fa)
        if (nph===0) drawDNA(getDNA(gT),mt)
        else if (nph===1) drawSphere(getSphere(sRY),mt)
        else drawWave(mt)
        const pts=from.map((f2,i)=>({
          x:lerp(f2.x,(to[i]||f2).x,mt),
          y:lerp(f2.y,(to[i]||f2).y,mt),
          z:lerp(f2.z||0,(to[i]||f2).z||0,mt),
          si:f2.si
        }))
        drawPts(pts, Math.sin(mt*Math.PI)*0.88)
      }
      aid=requestAnimationFrame(frame)
    }

    // Mouse tracking
    const heroEl = cvs.parentElement
    const onMouse = (e:MouseEvent) => {
      if (!heroEl) return
      const r=heroEl.getBoundingClientRect()
      mRef.x=(e.clientX-r.left)/r.width
      mRef.y=(e.clientY-r.top)/r.height
    }
    heroEl?.addEventListener('mousemove', onMouse)

    aid = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(aid)
      window.removeEventListener('resize', resize)
      heroEl?.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.85,
      }}
    />
  )
}
