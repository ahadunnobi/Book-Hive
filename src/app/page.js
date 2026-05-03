import Image from "next/image";
import "./page.css";

export default function Home() {
  return (
    <div className="page-container">
      {/* Navigation */}
      <nav className="nav glass">
        <div className="nav-content">
          <div className="logo-text gradient-text">BookHive</div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content animate-fade-in">
            <h1 className="hero-title">
              Your Digital Library <span className="gradient-text">Reimagined</span>
            </h1>
            <p className="hero-subtitle">
              Organize your collection, track your reading progress, and discover your next favorite story in a beautiful, minimalist space.
            </p>
            <div className="hero-actions">
              <button className="btn-primary-large">Start Your Collection</button>
              <button className="btn-secondary-large">Learn More</button>
            </div>
          </div>
          <div className="hero-image-container animate-float">
            <Image
              src="/bookhive-hero.png"
              alt="Futuristic Library"
              width={600}
              height={400}
              className="hero-image glass"
              priority
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features">
          <h2 className="section-title">Why BookHive?</h2>
          <div className="features-grid">
            <div className="feature-card glass">
              <div className="feature-icon">📚</div>
              <h3>Smart Organizing</h3>
              <p>Automatically categorize your books by genre, author, and reading status.</p>
            </div>
            <div className="feature-card glass">
              <div className="feature-icon">✨</div>
              <h3>AI Discovery</h3>
              <p>Get personalized recommendations based on your unique reading taste.</p>
            </div>
            <div className="feature-card glass">
              <div className="feature-icon">🤝</div>
              <h3>Social Sharing</h3>
              <p>Connect with other readers and share your favorite quotes and reviews.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 BookHive. Built with passion for readers.</p>
      </footer>
    </div>
  );
}
