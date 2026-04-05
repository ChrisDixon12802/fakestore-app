function About() {
  return (
    <div className="about-page">
      <h1>About NEXORA</h1>
      <div className="about-content">
        <section>
          <h2>Our Story</h2>
          <p>
            NEXORA is your premier destination for quality products at great
            prices. We curate the finest selection of fashion, electronics, and
            jewelry to bring you the best shopping experience.
          </p>
        </section>

        <section>
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-box">
              <span className="feature-icon">🚚</span>
              <h3>Free Shipping</h3>
              <p>On all orders over $50</p>
            </div>
            <div className="feature-box">
              <span className="feature-icon">🔒</span>
              <h3>Secure Payment</h3>
              <p>100% secure transactions</p>
            </div>
            <div className="feature-box">
              <span className="feature-icon">↩️</span>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="feature-box">
              <span className="feature-icon">⭐</span>
              <h3>Quality Products</h3>
              <p>Carefully curated selection</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
