'use client'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        background: 'none', border: '1px solid var(--border)',
        borderRadius: '8px', padding: '0.35rem 0.65rem',
        cursor: 'pointer', color: 'var(--muted)',
        fontSize: '1rem', lineHeight: 1,
        transition: 'border-color 0.2s, color 0.2s',
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
