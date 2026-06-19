const jobs = [
  { col:'cyan',   company:'NGO Voice AI Agent', role:'AI Engineer · Freelance', date:'2024 – Present',
    bullets:['Built a Hindi/Hinglish phone-based voice AI for NGO outreach in rural India','No app required — works on any mobile; designed for underserved, low-literacy communities','Deployed end-to-end: ASR → LLM → TTS pipeline on a live phone line'] },
  { col:'purple', company:'Ruya Labs', role:'AI / Data Engineer', date:'2024 – Present',
    bullets:['Data engineering, NLP and semantic analysis (POC)','Building robust pipelines for structured and unstructured data','Contributed to early-stage AI product development'] },
  { col:'green',  company:'STEM Educator', role:'Robotics · AI · Coding', date:'2023 – Present',
    bullets:['Teaching robotics, AI and coding to children at Yuvakala (Avalhalli, Bangalore)','Making complex concepts accessible and joyful for young learners'] },
  { col:'pink',   company:'NHS East Kent', role:'Data Analyst', date:'Sep 2023 – Sep 2024',
    bullets:['Healthcare data analysis supporting clinical and operational decision-making','Worked with sensitive patient data under strict IG/GDPR frameworks'] },
  { col:'amber',  company:'Deloitte', role:'Analyst', date:'2021 – 2022',
    bullets:['Data analysis and reporting in a consulting environment','Cross-functional stakeholder engagement'] },
  { col:'amber',  company:'LTI Mindtree', role:'Graduate Engineer', date:'2019 – 2021',
    bullets:['Software engineering and data workflows','Exposure to enterprise-scale systems and agile delivery'] },
]

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-wrap">
        <p className="section-label reveal">Work Experience</p>
        <h2 className="section-title reveal">Where I&apos;ve built things.</h2>
        <div className="exp-timeline">
          {jobs.map((j,i) => (
            <div key={i} className="exp-entry reveal" data-col={j.col}>
              <div className="exp-dot" />
              <div>
                <div className="exp-company">{j.company}</div>
                <div className="exp-role">{j.role}</div>
                <div className="exp-date">{j.date}</div>
                <ul className="exp-bullets">
                  {j.bullets.map((b,k) => <li key={k}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="edu-divider reveal"><span>Education</span></div>
        <div className="edu-cards reveal">
          <div className="edu-card">MSc Health Data Science · University of Exeter · 2022–2023</div>
          <div className="edu-card">BE Medical Electronics · BMS College of Engineering · 2015–2019</div>
        </div>
      </div>
    </section>
  )
}
