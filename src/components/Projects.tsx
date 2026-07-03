const GH_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
)
const LIVE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
)

const projects = [
  {
    featured: true,
    tags: [['health','Healthcare'],['ai','RAG'],['ai','Advanced Retrieval']],
    title: 'Healthcare Safety RAG',
    desc: 'FDA drug alerts, CDC infection control guidelines, WHO surgical checklists — made conversational in plain English, with citations. Hybrid search (BM25 + dense embeddings + RRF), cross-encoder reranking, and hierarchical chunking. Every fix is measured.',
    metrics: ['Recall@5: 0.61 → 0.81','Faithfulness: 0.72 → 0.83','50 labelled Q&A pairs'],
    techs: ['Python','ChromaDB','BM25','BGE Embeddings','Cross-encoder','Streamlit','Ollama / OpenAI'],
    gh: 'https://github.com/skauser97/healthcare_safety',
  },
  {
    tags: [['bio','Biotech'],['live','Live'],['data','Data Viz']],
    title: 'Biotech × AI Market Map',
    desc: 'Interactive map of 244 companies at the AI/biotech intersection — 5 views including radial rings, funding bubble charts, and a Sankey deal-flow diagram. Built with Next.js + D3, deployed on GitHub Pages.',
    metrics: ['244 companies · 14 categories · 5 views'],
    techs: ['Next.js 14','TypeScript','D3','Tailwind','Fuse.js'],
    gh: 'https://github.com/skauser97/biotech_ai_map',
    live: 'https://skauser97.github.io/biotech_ai_map/',
  },
  {
    tags: [['bio','Biotech'],['ai','ReAct Agent'],['live','Live']],
    title: 'Biotech Research Agent',
    desc: 'ReAct agent that answers complex biotech questions by querying real scientific databases — PubMed, ClinicalTrials.gov, UniProt, OpenTargets, ChEMBL, NCBI Gene. Ask about KRAS inhibitors in phase 2/3 trials and get sourced, structured answers.',
    metrics: [],
    techs: ['Python','Groq / LLaMA 3','PubMed API','ClinicalTrials.gov','Streamlit'],
    gh: 'https://github.com/skauser97/biotech_agent',
    live: 'https://biotech-research-agent.streamlit.app/',
  },
  {
    tags: [['health','Healthcare'],['ai','NLP']],
    title: 'Clinical Readmission NLP',
    desc: 'NLP pipeline on 4,999 de-identified medical transcriptions across 40 clinical specialties (MTSamples). Text classification, feature extraction, and specialty prediction from raw clinical notes.',
    metrics: [],
    techs: ['Python','scikit-learn','NLP','Kaggle / MTSamples'],
    gh: 'https://github.com/skauser97/Clinical-readmission',
  },
]

const tagCls: Record<string,string> = { health:'pt-health', ai:'pt-ai', bio:'pt-bio', data:'pt-data', live:'pt-live' }

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-wrap">
        <p className="section-label reveal">Projects</p>
        <h2 className="section-title reveal">Things I&apos;ve built.</h2>
        <div className="proj-grid">
          {projects.map((p,i) => (
            <div key={i} className={`proj-card reveal${p.featured ? ' featured' : ''}`}>
              <div className="proj-tag-row">
                {p.tags.map(([cls,label]) => (
                  <span key={label} className={`proj-tag ${tagCls[cls]}`}>{label}</span>
                ))}
              </div>
              <div className="proj-title">{p.title}</div>
              <div className="proj-desc">{p.desc}</div>
              {p.metrics.length > 0 && (
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                  {p.metrics.map(m => <span key={m} className="proj-metric">{m}</span>)}
                </div>
              )}
              <div className="proj-footer">
                <div className="proj-techs">
                  {p.techs.map(t => <span key={t} className="proj-tech">{t}</span>)}
                </div>
                <div className="proj-links">
                  {p.live && <a className="proj-link" href={p.live} target="_blank" rel="noreferrer">{LIVE_ICON}Live</a>}
                  <a className="proj-link" href={p.gh} target="_blank" rel="noreferrer">{GH_ICON}GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
