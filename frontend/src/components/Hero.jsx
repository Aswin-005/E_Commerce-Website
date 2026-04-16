import React from 'react';

const Hero = () => {
  return (
    <div style={{ marginBottom: '12px' }}>
      {/* Promo Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #2874f0 0%, #1a5dc8 100%)',
        borderRadius: '4px',
        padding: '28px 32px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{ zIndex: 1 }}>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', opacity: 0.8, marginBottom: '8px' }}>LIVE NOW</p>
          <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.1 }}>Big Saving Days</h1>
          <p style={{ fontSize: '15px', opacity: 0.85 }}>19th – 23rd August &nbsp;|&nbsp; Up to <strong>80% OFF</strong> on top brands</p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button style={{ background: '#fb641b', color: 'white', padding: '10px 28px', borderRadius: '2px', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              Shop Now
            </button>
            <button style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '10px 24px', borderRadius: '2px', fontWeight: 600, fontSize: '14px', border: '1px solid rgba(255,255,255,0.4)' }}>
              View Offers
            </button>
          </div>
        </div>

        {/* Decorative deals strip */}
        <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
          {[
            { label: 'Mobiles', value: 'From $199' },
            { label: 'Laptops', value: 'Up to 40% Off' },
            { label: 'Wearables', value: 'From $49' }
          ].map(item => (
            <div key={item.label} style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '4px',
              padding: '12px 16px',
              textAlign: 'center',
              minWidth: '110px'
            }}>
              <span style={{ fontSize: '12px', opacity: 0.75, display: 'block', marginBottom: '4px' }}>{item.label}</span>
              <span style={{ fontSize: '14px', fontWeight: 700 }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Background decoration */}
        <div style={{ position: 'absolute', right: '-40px', top: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>
        <div style={{ position: 'absolute', right: '80px', bottom: '-80px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }}></div>
      </div>
    </div>
  );
};

export default Hero;
