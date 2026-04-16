import React, { useState, useEffect } from 'react';
import { productApi } from '../api';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import ProductDetailModal from './ProductDetailModal';

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    productApi.getAll()
      .then(res => {
        setProducts(res.data.content || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not connect to the store. Please refresh.');
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div style={{ background: 'white', borderRadius: '4px', padding: '40px', textAlign: 'center', color: '#878787' }}>
      Loading items...
    </div>
  );

  if (error) return (
    <div style={{ background: 'white', borderRadius: '4px', padding: '40px', textAlign: 'center', color: '#c0392b' }}>
      {error}
    </div>
  );

  return (
    <div style={{ background: 'white', borderRadius: '4px', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#212121' }}>Recommended For You</h2>
        <button style={{ background: '#2874f0', color: 'white', padding: '10px 24px', borderRadius: '2px', fontWeight: 600, fontSize: '14px', textTransform: 'uppercase' }}>
          View All
        </button>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#878787' }}>
          <ShoppingCart size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
          <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No products yet</p>
          <p style={{ fontSize: '14px' }}>Products will appear here once they are added to the store.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1px', background: '#f0f0f0' }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} onOpen={() => setSelectedProduct(product)} />
          ))}
        </div>
      )}

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};

const ProductCard = ({ product, onOpen }) => {
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const fakeOriginalPrice = (product.price * 1.4).toFixed(0);
  const fakeDiscount = Math.floor(Math.random() * 30) + 10;

  const handleCart = (e) => {
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <div
      style={{
        background: 'white',
        padding: '20px',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
      onClick={onOpen}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Wishlist */}
      <button
        onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
        style={{
          position: 'absolute', top: '12px', right: '12px',
          color: liked ? '#ff4444' : '#cccccc',
          transition: 'color 0.2s ease'
        }}
      >
        <Heart size={20} fill={liked ? '#ff4444' : 'none'} />
      </button>

      {/* Product Image */}
      <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
        <img
          src={product.imageUrl || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400`}
          alt={product.name}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply', transition: 'transform 0.3s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>

      {/* Product name */}
      <p style={{ fontSize: '14px', fontWeight: 500, color: '#212121', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {product.name}
      </p>

      {/* Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ background: '#388e3c', color: 'white', fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '2px' }}>
          4.2 <Star size={9} fill="white" color="white" />
        </span>
        <span style={{ fontSize: '12px', color: '#878787' }}>(1,234)</span>
      </div>

      {/* Pricing */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#212121' }}>${product.price}</span>
        <span style={{ fontSize: '13px', color: '#878787', textDecoration: 'line-through' }}>${fakeOriginalPrice}</span>
        <span style={{ fontSize: '13px', color: '#388e3c', fontWeight: 600 }}>{fakeDiscount}% off</span>
      </div>

      {/* Brand */}
      <p style={{ fontSize: '12px', color: '#878787' }}>{product.brand}</p>

      {/* Add to Cart */}
      <button
        onClick={handleCart}
        style={{
          marginTop: '8px',
          width: '100%',
          background: addedToCart ? '#388e3c' : '#fb641b',
          color: 'white',
          padding: '10px 0',
          borderRadius: '2px',
          fontWeight: 700,
          fontSize: '13px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          transition: 'background 0.3s ease',
          opacity: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}
        className="cart-btn"
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0'}
      >
        <ShoppingCart size={15} />
        {addedToCart ? 'Added!' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductDashboard;
