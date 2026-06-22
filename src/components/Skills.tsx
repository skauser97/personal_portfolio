'use client'
import { useEffect, useRef } from 'react'

const chips = [
  { icon:'🐍', label:'Python' },         { icon:'🤖', label:'LLMs / GPT' },
  { icon:'🔊', label:'Voice AI' },        { icon:'📚', label:'RAG Pipelines' },
  { icon:'🧠', label:'NLP / spaCy' },    { icon:'⚡', label:'FastAPI' },
  { icon:'📊', label:'SQL / dbt' },      { icon:'🔬', label:'Biotech Research' },
  { icon:'☁️', label:'AWS / GCP' },      { icon:'⚛️', label:'React / Next.js' },
  { icon:'🐳', label:'Docker' },          { icon:'📈', label:'Data Engineering' },
]

const bars = [
  { name:'Python',       level:'Advanced',      w:92, cls:'pf-pur' },
  { name:'LLMs & Prompting', level:'Proficient',  w:78, cls:'pf-pur' },
  { name:'Voice AI',     level:'Proficient',    w:72, cls:'pf-cyn' },
  { name:'RAG Systems',  level:'Proficient',    w:80, cls:'pf-cyn' },
  { name:'SQL',          level:'Proficient',    w:82, cls:'pf-grn' },
  { name:'ML / sklearn', level:'Proficient',    w:78, cls:'pf-grn' },
  { name:'Data Engineering', level:'Proficient',w:75, cls:'pf-amb' },
  { name:'FastAPI',      level:'Competent',     w:72, cls:'pf-amb' },
]

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        e.target.querySelectorAll<HTMLElement>('.prof-fill[data-w]').forEach((bar, i) => {
          setTimeout(() => { bar.style.width = bar.dataset.w + '%' }, i * 80)
        })
        e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
        obs.unobserve(e.target)
      })
    }, { threshold: 0.2 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef}>
      <div className="section-wrap">
        <p className="section-label reveal">Technical Stack</p>
        <h2 className="section-title reveal">Tools of the trade.</h2>
        <div className="skills-grid reveal">
          {chips.map(c => (
            <div key={c.label} className="skill-chip">
              <span className="skill-icon">{c.icon}</span>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
        <div className="skills-divider reveal"><span>Proficiency</span></div>
        <div className="prof-grid reveal">
          {bars.map(b => (
            <div key={b.name} className="prof-item">
              <div className="prof-top">
                <span className="prof-name">{b.name}</span>
                <span className="prof-level">{b.level}</span>
              </div>
              <div className="prof-track">
                <div className={`prof-fill ${b.cls}`} data-w={b.w} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
