import React from 'react';
import { X, ShoppingCart, Star, Shield, Truck, RotateCcw } from 'lucide-react';

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  const fakeOriginalPrice = (product.price * 1.4).toFixed(0);
  const fakeDiscount = 29;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }}
      />

      {/* Modal */}
      <div style={{
        position: 'relative',
        background: 'white',
        borderRadius: '4px',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        animation: 'slideUp 0.25s ease-out'
      }}>
        <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, color: '#878787', padding: '4px', borderRadius: '50%', background: '#f5f5f5', display: 'flex' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '460px' }}>
          {/* Left: Image */}
          <div style={{ padding: '40px', borderRight: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
            <img
              src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800'}
              alt={product.name}
              style={{ maxWidth: '100%', maxHeight: '320px', objectFit: 'contain', mixBlendMode: 'multiply' }}
            />
          </div>

          {/* Right: Details */}
          <div style={{ padding: '32px' }}>
            <span style={{ fontSize: '12px', color: '#2874f0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {product.brand}
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212121', margin: '8px 0 12px', lineHeight: 1.3 }}>
              {product.name}
            </h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ background: '#388e3c', color: 'white', fontSize: '12px', fontWeight: 700, padding: '3px 8px', borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                4.2 <Star size={10} fill="white" color="white" />
              </span>
              <span style={{ fontSize: '14px', color: '#878787' }}>1,234 Ratings & 256 Reviews</span>
            </div>

            <hr style={{ borderColor: '#f0f0f0', marginBottom: '16px' }} />

            {/* Pricing */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '28px', fontWeight: 700, color: '#212121' }}>${product.price}</span>
                <span style={{ fontSize: '16px', color: '#878787', textDecoration: 'line-through' }}>${fakeOriginalPrice}</span>
                <span style={{ fontSize: '16px', color: '#388e3c', fontWeight: 700 }}>{fakeDiscount}% off</span>
              </div>
              <p style={{ fontSize: '12px', color: '#878787', marginTop: '4px' }}>Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#212121', marginBottom: '8px' }}>About this product</h4>
              <p style={{ fontSize: '14px', color: '#4a4a4a', lineHeight: 1.7 }}>
                {product.description || 'No description available.'}
              </p>
            </div>

            {/* Stock */}
            <p style={{ fontSize: '13px', color: product.stockQuantity > 10 ? '#388e3c' : '#e53935', fontWeight: 600, marginBottom: '20px' }}>
              {product.stockQuantity > 10
                ? `✓ In Stock (${product.stockQuantity} units available)`
                : product.stockQuantity > 0
                  ? `⚠ Only ${product.stockQuantity} left!`
                  : '✗ Out of Stock'}
            </p>

            {/* Feature Pills */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {[
                { icon: <Truck size={14} />, text: 'Free Delivery' },
                { icon: <RotateCcw size={14} />, text: '7 Day Return' },
                { icon: <Shield size={14} />, text: '1 Year Warranty' }
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#4a4a4a', background: '#f5f5f5', padding: '5px 10px', borderRadius: '2px' }}>
                  {item.icon} {item.text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                flex: 1,
                background: '#fb641b',
                color: 'white',
                padding: '14px',
                borderRadius: '2px',
                fontWeight: 700,
                fontSize: '14px',
                textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button style={{
                flex: 1,
                background: '#2874f0',
                color: 'white',
                padding: '14px',
                borderRadius: '2px',
                fontWeight: 700,
                fontSize: '14px',
                textTransform: 'uppercase',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
