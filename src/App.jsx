import './App.css';

function App() {
  return (
    <div className="home-container">
      <header className="home-header">
        <span className="header-pretitle">Showcase Portfolio</span>
        <h1>Croydon Client <em>Projects</em></h1>
        <div className="header-line"></div>
        <p className="subtitle">Bespoke digital experiences built for premium local brands</p>
      </header>
      
      <main className="grid">
        {/* Barsan Card */}
        <a href="/croydon/Barsan%20ELECTRICAL/index.html" className="card">
          <div className="card-image-wrapper">
            <div className="card-image" style={{ backgroundImage: "url('/croydon/Barsan%20ELECTRICAL/hero.png')" }}></div>
          </div>
          <div className="card-content">
            <span className="client-tag tag-barsan">Electrical Contractor</span>
            <h2>Barsan Electrical</h2>
            <p>A trusted local electrician serving Croydon. Safe, reliable electrical services for homes and businesses.</p>
            <div className="card-arrow arrow-barsan">
              View Project 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </a>

        {/* Boson Card */}
        <a href="/croydon/BOSON%20ELECTRICAL/index.html" className="card">
          <div className="card-image-wrapper">
            <div className="card-image" style={{ backgroundImage: "url('/croydon/BOSON%20ELECTRICAL/hero.png')" }}></div>
          </div>
          <div className="card-content">
            <span className="client-tag tag-boson">Electrical Contractor</span>
            <h2>BOSON ELECTRICAL</h2>
            <p>Modern electrical contractor offering 24/7 services across the Croydon area with a premium finish.</p>
            <div className="card-arrow arrow-boson">
              View Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </a>

        {/* D Webb Electrics Card */}
        <a href="/croydon/D%20Webb%20Electrics/index.html" className="card">
          <div className="card-image-wrapper">
            <div className="card-image" style={{ backgroundImage: "url('/croydon/D%20Webb%20Electrics/hero.png')" }}></div>
          </div>
          <div className="card-content">
            <span className="client-tag tag-dwebb">Electrical Contractor</span>
            <h2>D Webb Electrics</h2>
            <p>A premium local electrician serving South Croydon with safe, reliable, and professional electrical solutions.</p>
            <div className="card-arrow arrow-dwebb">
              View Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </a>

        {/* Knight Lights Electrical Card */}
        <a href="/croydon/Knight%20Lights%20Electrical/index.html" className="card">
          <div className="card-image-wrapper">
            <div className="card-image" style={{ backgroundImage: "url('/croydon/Knight%20Lights%20Electrical/hero.png')" }}></div>
          </div>
          <div className="card-content">
            <span className="client-tag tag-knight">Electrical Contractor</span>
            <h2>Knight Lights Electrical</h2>
            <p>Trusted local electrician in Enfield. 24/7 safe and reliable domestic and commercial electrical services.</p>
            <div className="card-arrow arrow-knight">
              View Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </a>

        {/* The Butts Group Card */}
        <a href="/croydon/The%20Butts%20Group/index.html" className="card">
          <div className="card-image-wrapper">
            <div className="card-image" style={{ backgroundImage: "url('/croydon/The%20Butts%20Group/hero.jpg')" }}></div>
          </div>
          <div className="card-content">
            <span className="client-tag tag-butts">Bespoke Home Transformation</span>
            <h2>The Butts Group</h2>
            <p>Premium bespoke renovations, luxury loft conversions, extensions, and landscape architecture in Croydon.</p>
            <div className="card-arrow arrow-butts">
              View Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </a>
      </main>
    </div>
  );
}

export default App;
