import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductDashboard from './components/ProductDashboard';
import AuthModal from './components/AuthModal';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f3f6' }}>
      <Navbar onAuthClick={() => setIsAuthOpen(true)} />
      
      {/* Category Navigation Bar */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e0e0e0', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '32px', overflowX: 'auto', padding: '12px 0' }}>
            {['Electronics', 'Mobiles', 'Fashion', 'Home', 'Appliances', 'Beauty', 'Sports', 'Grocery'].map(cat => (
              <button key={cat} style={{ fontSize: '13px', fontWeight: 500, color: '#212121', whiteSpace: 'nowrap', padding: '4px 0', borderBottom: '2px solid transparent' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#2874f0'; e.currentTarget.style.borderBottomColor = '#2874f0'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#212121'; e.currentTarget.style.borderBottomColor = 'transparent'; }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container" style={{ paddingTop: '12px', paddingBottom: '40px' }}>
        <Hero />
        <ProductDashboard />
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <footer style={{ backgroundColor: '#172337', color: '#c5ccd4', padding: '40px 0', marginTop: '40px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', marginBottom: '32px' }}>
            {[
              { title: 'ABOUT', links: ['About Us', 'Careers', 'Press'] },
              { title: 'HELP', links: ['Payments', 'Shipping', 'Cancellation', 'FAQ'] },
              { title: 'POLICY', links: ['Return Policy', 'Terms of Use', 'Security', 'Privacy'] }
            ].map(section => (
              <div key={section.title}>
                <p style={{ color: '#878787', fontSize: '12px', fontWeight: 600, marginBottom: '16px' }}>{section.title}</p>
                {section.links.map(link => (
                  <a key={link} href="#" style={{ display: 'block', color: '#c5ccd4', fontSize: '14px', marginBottom: '10px', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = '#c5ccd4'}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #3a4a5c', paddingTop: '24px', textAlign: 'center', fontSize: '13px', color: '#878787' }}>
            © 2024 FlipStore.com. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
