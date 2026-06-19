'use client'
import dynamic from 'next/dynamic'

const NeuralCanvas = dynamic(() => import('./NeuralCanvas'), { ssr: false })

export default function Hero() {
  return (
    <section id="hero">
      <NeuralCanvas />
      <div className="hero-inner">
        <p className="hero-eyebrow reveal">AI Engineer · NLP · Voice AI · Biotech</p>
        <h1 className="hero-name reveal">Sadia<br />Kauser</h1>
        <p className="hero-title reveal">
          Building intelligent systems at the edge of <span>language</span>, <span>health</span> and <span>biology</span>.
        </p>
        <div className="hero-btns reveal">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="https://www.linkedin.com/in/sadia-kauser-608676158" target="_blank" rel="noreferrer" className="btn-secondary">LinkedIn</a>
          <a href="https://github.com/skauser97" target="_blank" rel="noreferrer" className="btn-secondary">GitHub</a>
        </div>
      </div>
    </section>
  )
}
