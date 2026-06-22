export default function Educator() {
  return (
    <section id="educator">
      <div className="section-wrap">
        <p className="section-label reveal">Beyond Work</p>
        <h2 className="section-title reveal">Teaching, writing, and researching.</h2>
        <div className="educator-grid">
          <div className="educator-card reveal">
            <h3>🤖 Teaching Kids AI & Robotics</h3>
            <p>
              Teaching robotics, Python, and Scratch to kids across Bangalore — at <strong>Iwan</strong>,
              <strong> Yuvakala</strong> (Avalhalli), and in private sessions.
              Hands-on workshops and summer camps; making AI/ML concepts accessible
              to learners with no prior experience.
            </p>
          </div>
          <div className="educator-card reveal">
            <h3>🔬 Writing About Biotech</h3>
            <p>
              Publishing articles on AI × biology — drug discovery, genomics, clinical trial
              intelligence — via <a href="https://tally.bio" target="_blank" rel="noreferrer" style={{color:'var(--cyn)'}}>Tally.bio</a>.
              Making cutting-edge science legible to a wider audience.
            </p>
          </div>
          <div className="educator-card reveal">
            <h3>🧬 Biotech Market Research</h3>
            <p>
              Built a map of 244 AI × biotech companies — tracking funding,
              categories, and deal flow. Part of the ongoing intelligence work at{' '}
              <a href="https://tally.bio" target="_blank" rel="noreferrer" style={{color:'var(--cyn)'}}>Tally.bio</a>.
            </p>
          </div>
          <div className="educator-card reveal">
            <h3>🎙️ Project Smile — Voice AI</h3>
            <p>
              Building a 24/7 phone-based Hindi/Hinglish voice agent for Project Smile,
              an NGO in Bangalore. Handles incoming calls, triages noise, routes what
              matters — so the team can focus on people, not paperwork.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
