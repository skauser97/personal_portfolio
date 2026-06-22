export default function Contact() {
  return (
    <section id="contact">
      <div className="section-wrap">
        <p className="section-label reveal">Contact</p>
        <h2 className="section-title reveal">Let&apos;s build something.</h2>
        <p className="reveal" style={{ color:'var(--muted)', maxWidth:'520px', lineHeight:1.8, marginBottom:'0.5rem' }}>
          Open to contract and full-time roles — AI Engineer, NLP Engineer, Voice AI, Health-tech.
          Also happy to chat about RAG systems, biotech, or voice AI.
        </p>
        <div className="contact-grid reveal">
          {[
            { label:'Email',    val:'sadi.kar97@gmail.com',                              href:'mailto:sadi.kar97@gmail.com' },
            { label:'LinkedIn', val:'linkedin.com/in/sadia-kauser',                      href:'https://www.linkedin.com/in/sadia-kauser-608676158' },
            { label:'GitHub',   val:'github.com/skauser97',                              href:'https://github.com/skauser97' },
            { label:'Location', val:'Bangalore, India (open to remote)',                  href:null },
          ].map(c => (
            <div key={c.label} className="contact-item">
              <span className="contact-label">{c.label}</span>
              {c.href
                ? <a href={c.href} target="_blank" rel="noreferrer" className="contact-val">{c.val}</a>
                : <span className="contact-val" style={{ cursor:'default' }}>{c.val}</span>
              }
            </div>
          ))}
        </div>
        <div className="contact-links reveal">
          <a href="mailto:sadi.kar97@gmail.com" className="btn-primary">Send Email</a>
          <a href="https://www.linkedin.com/in/sadia-kauser-608676158" target="_blank" rel="noreferrer" className="btn-secondary">LinkedIn</a>
          <a href="https://github.com/skauser97" target="_blank" rel="noreferrer" className="btn-secondary">GitHub</a>
        </div>
      </div>
    </section>
  )
}
