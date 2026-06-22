const jobs = [
  { col:'cyan', company:'Project Smile', role:'AI Engineer · Contract', date:'May 2026 – Present',
    bullets:[
      'Building a phone-based Hindi/Hinglish voice AI for Project Smile (NGO) via Twilio — core system functional, in active development.',
      'Deepgram for real-time STT with Hindi/English code-switching; Qwen (open-source LLM) for generation; evaluated multiple STT/TTS providers including Sarvam AI for Indic language support.',
      'Solved latency via response streaming — audio playback begins before LLM output completes; implemented mid-call state recovery for dropped calls.',
      'Built stateful multi-turn conversation orchestration using LangGraph; currently evaluating latency and LLM cost tradeoffs to determine production approach.',
    ]},
  { col:'purple', company:'Ruya Labs', role:'AI Engineer · Early Contributor', date:'Dec 2025 – Present',
    bullets:[
      'Working across multiple early-stage AI projects under Ruya Labs — an emerging AI venture spanning healthcare, biotech, and voice AI.',
      <>Currently contributing to <a href="https://tally.bio" target="_blank" rel="noreferrer" style={{color:'var(--cyn)'}}>Tally.bio</a> — a biotech intelligence platform; building analytical dashboards, authoring published articles, and supporting website development and analytics integration.</>,
      'Previously led two POC explorations: voice model evaluation for healthcare (accuracy, latency, cost, multilingual support) and NLP/semantic analysis pipeline (pgvector, sentence embeddings, sentiment analysis, text feature extraction).',
      'Designed PostgreSQL schemas for raw and processed data; performed data cleaning and preprocessing using Python (pandas, regex).',
    ]},
  { col:'green', company:'STEM Educator', role:'Robotics · AI · Coding', date:'Sep 2024 – Oct 2025',
    bullets:[
      'Teaching robotics, Python, and Scratch to kids across Bangalore — at Iwan, Yuvakala (Avalhalli), and through private sessions.',
      'Ran hands-on workshops and summer camps — making complex AI/ML concepts accessible and joyful for young learners with no prior experience.',
    ]},
  { col:'pink', company:'NHS East Kent', role:'Data Scientist', date:'Dec 2022 – Sep 2023',
    bullets:[
      'Built XGBoost and Random Forest models on 1M+ EHR/appointment records to predict patient attendance; reduced features from ~15 to 7 through selection, improving clinical resource allocation by ~20%.',
      'Achieved 88% accuracy via k-fold cross-validation and hyperparameter tuning; benchmarked against multiple baseline models.',
      'Deployed models with logging and drift monitoring; built a stakeholder dashboard enabling targeted clinical interventions.',
    ]},
  { col:'amber', company:'Deloitte', role:'Data Engineer', date:'Mar 2022 – Sep 2022',
    bullets:[
      'Built and maintained Impala/Hadoop pipelines for large-scale data ingestion, normalisation, and transformation; orchestrated end-to-end ETL workflows with Oozie.',
      'Modelled analytics-ready datasets for downstream BI reporting.',
    ]},
  { col:'amber', company:'LTI Mindtree', role:'Data Engineer', date:'Jun 2019 – Dec 2021',
    bullets:[
      'Designed Informatica PowerCenter workflows for enterprise-scale data integration and storage optimisation.',
      'Developed snowflake and star schema data models to support analytical reporting and improve query performance.',
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
