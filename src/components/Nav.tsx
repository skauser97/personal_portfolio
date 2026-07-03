'use client'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#about',      label: 'About' },
  { href: '#timeline',   label: 'Timeline' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills',     label: 'Skills' },
  { href: '#projects',   label: 'Projects' },
  { href: '#contact',    label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className="nav-bar" style={{ boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none' }}>
      <span className="nav-logo">SK.97</span>
      <ul className="nav-links">
        {links.map(l => (
          <li key={l.href}><a href={l.href}>{l.label}</a></li>
        ))}
      </ul>
      <div className="nav-right">
        <ThemeToggle />
        <a href="#contact" className="btn-primary nav-hire" style={{ padding: '0.4rem 1rem', fontSize: '0.78rem' }}>
          Hire me
        </a>
        <button
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav-mobile-panel${open ? ' open' : ''}`}>
        <ul>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn-primary" onClick={() => setOpen(false)}>Hire me</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
