const jobs = [
  { col:'cyan', company:'Project Smile', role:'AI Engineer · Pro Bono', date:'May 2026 – Present',
    bullets:[
      'Built a Hindi/Hinglish voice AI agent for an NGO — phone-based interactions for underserved communities, no app required.',
      'Designed stateful multi-turn dialogue using LangGraph; Deepgram for real-time STT with Hindi/English code-switching; Sarvam AI for natural Hindi TTS and Indic language support.',
      'Solved latency via response streaming — audio playback begins before LLM output completes; implemented mid-call state recovery for dropped calls.',
      'Backend: FastAPI + PostgreSQL for conversation history, user state, and multi-user session handling.',
    ]},
  { col:'purple', company:'Ruya Labs', role:'AI Engineer · Contract', date:'Dec 2025 – Present',
    bullets:[
      'Evaluated AI voice models across accuracy, latency, cost, and language support for healthcare deployment; integrated voice APIs into clinical workflows enabling automated patient interaction and data capture.',
      'Contributing to Tally.bio — an early-stage biotech intelligence platform; built and deployed analytical dashboards, authored published articles, and supporting website development and analytics integration.',
      'Integrated semantic retrieval using pgvector to enable AI-driven insights across document stores.',
      'Implemented sentiment analysis, text feature extraction, and sentence embeddings for NLP exploration; designed PostgreSQL schemas and performed data cleaning and preprocessing (pandas, regex).',
    ]},
  { col:'green', company:'STEM Educator', role:'Robotics · AI · Coding', date:'Sep 2024 – Oct 2025',
    bullets:[
      'Teaching robotics, AI and coding to children at Yuvakala (Avalhalli, Bangalore) and other schools.',
      'Ran hands-on workshops and summer camps — making complex AI/ML concepts accessible and joyful for young learners with no prior experience.',
    ]},
  { col:'pink', company:'NHS East Kent', role:'Data Scientist', date:'Dec 2022 – Sep 2023',
    bullets:[
      'Built XGBoost and Random Forest models to predict patient attendance from EHR/appointment records, improving resource allocation by ~20%.',
      'Achieved 88% accuracy via k-fold cross-validation and hyperparameter tuning; benchmarked against multiple baseline models.',
      'Deployed models with logging and drift monitoring; built a stakeholder dashboard enabling targeted clinical interventions.',
    ]},
  { col:'amber', company:'Deloitte', role:'Data Engineer', date:'Mar 2022 – Sep 2022',
    bullets:[
      'Built Impala/Hadoop pipelines reducing manual data handling by ~30%; orchestrated end-to-end ETL with Oozie.',
      'Modelled analytics-ready datasets for downstream BI reporting.',
    ]},
  { col:'amber', company:'LTI Mindtree', role:'Data Engineer', date:'Jun 2019 – Dec 2021',
    bullets:[
      'Designed Informatica PowerCenter workflows for enterprise-scale data integration and storage optimisation.',
      'Developed snowflake and star schema data models, improving retrieval and analytical efficiency by 20%.',
    ]},
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
