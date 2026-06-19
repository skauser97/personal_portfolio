'use client'
import { useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Timeline from '@/components/Timeline'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Educator from '@/components/Educator'
import Contact from '@/components/Contact'

export default function Home() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '58px' }}>
        <Hero />
        <About />
        <Timeline />
        <Experience />
        <Skills />
        <Projects />
        <Educator />
        <Contact />
      </main>
      <footer>
        <span className="mono">Built with Next.js · Sadia Kauser · 2026</span>
      </footer>
    </>
  )
}
