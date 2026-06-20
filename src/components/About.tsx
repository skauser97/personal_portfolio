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
              I&apos;m building a voice agent for <strong>Project Smile</strong>, an NGO in Bangalore —
              Hindi/Hinglish, phone-based, always on. Calls come in from everywhere: missing person reports,
              shelters wanting to partner, donors, volunteers. The agent handles the noise, routes what matters,
              and logs what needs a human.
            </p>
            <p>
              At <strong>Ruya Labs</strong> I work across data engineering, NLP, and semantic analysis,
              contributing to <strong>Tally.bio</strong> — a biotech intelligence platform — and exploring
              the AI/biotech space through market mapping, a recommendation agent, and published writing on the space.
            </p>
            <p>
              And I teach. Robotics, Python, and Scratch to kids across Bangalore — at Iwan, Yuvakala in Avalhalli,
              and in private sessions — because if you can explain it to a ten-year-old, you actually know it.
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
