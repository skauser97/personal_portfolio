export default function About() {
  const tags = ['Python','LLMs','RAG','Voice AI','NLP','FastAPI','Biotech','Data Engineering','Streamlit','Next.js']
  return (
    <section id="about">
      <div className="section-wrap">
        <div className="about-grid reveal">
          <div>
            <div className="hex-wrap">
              <svg viewBox="0 0 180 196" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED"/>
                    <stop offset="50%" stopColor="#6366F1"/>
                    <stop offset="100%" stopColor="#22D3EE"/>
                  </linearGradient>
                  <clipPath id="hexClip">
                    <polygon points="90,8 168,50 168,146 90,188 12,146 12,50"/>
                  </clipPath>
                </defs>
                <image href="/personal_portfolio/portfolio_img.png" x="12" y="8" width="156" height="180"
                  preserveAspectRatio="xMidYMid slice" clipPath="url(#hexClip)"/>
                <polygon points="90,8 168,50 168,146 90,188 12,146 12,50"
                  fill="none" stroke="url(#hexGrad)" strokeWidth="1.5"/>
              </svg>
            </div>
            <p className="photo-meta">Bangalore, India<br/>sadi.kar97@gmail.com</p>
          </div>
          <div className="about-bio">
            <p className="section-label">About</p>
            <h2 className="section-title">Two worlds, one builder.</h2>
            <p>
              I&apos;m building a <strong>Hindi/Hinglish voice AI</strong> for NGO outreach in India —
              phone-based, no app required, designed for underserved communities with zero digital access.
              One of the most meaningful projects of my career.
            </p>
            <p>
              At <strong>Ruya Labs</strong> I work across data engineering, NLP, and semantic analysis,
              contributing to <strong>Tally.bio</strong> — a biotech intelligence platform — and exploring
              the AI/biotech space through market mapping, a recommendation agent, and published writing on the space.
            </p>
            <p>
              And I teach. Robotics, AI, and coding to kids — including at <strong>Yuvakala</strong> (Avalhalli, Bangalore)
              — because explaining something simply is the deepest form of understanding it.
            </p>
            <div className="about-tags">
              {tags.map(t => <span key={t} className="about-tag">{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
