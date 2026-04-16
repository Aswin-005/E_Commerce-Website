import React, { useState } from 'react';
import { authApi } from '../api';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [status, setStatus] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Processing...');
    try {
      const res = isLogin 
        ? await authApi.login({ email: formData.email, password: formData.password })
        : await authApi.register(formData);
      
      localStorage.setItem('token', res.data.token);
      setStatus('Success! Redirecting...');
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 800);
    } catch (err) {
      setStatus(err.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="bg-white w-full max-w-4xl min-h-[500px] flex rounded-sm shadow-2xl relative animate-slide overflow-hidden">
        
        {/* Left Side: Marketplace Promo */}
        <div className="hidden md:flex flex-[0.4] bg-primary-color text-white p-10 flex-col">
          <h2 className="text-3xl font-bold mb-4">{isLogin ? 'Login' : 'Looks like you\'re new here!'}</h2>
          <p className="text-lg text-white/80 leading-relaxed">
            {isLogin 
              ? 'Get access to your Orders, Wishlist and Recommendations' 
              : 'Sign up with your email to get started'}
          </p>
          <div className="mt-auto opacity-20">
            <div className="w-full h-32 border-b-2 border-white/50 relative">
              <div className="absolute bottom-0 right-10 w-20 h-20 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-10 flex flex-col">
          <button onClick={onClose} className="absolute top-4 right-4 text-dim hover:text-gray-900 transition-colors">
            <X size={24} />
          </button>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input 
                    type="text" required
                    className="w-full border-b border-border-color py-2 outline-none focus:border-primary-color transition-colors peer placeholder-transparent"
                    id="firstName" placeholder="First Name"
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                  />
                  <label htmlFor="firstName" className="absolute left-0 -top-3.5 text-xs text-dim peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all">First Name</label>
                </div>
                <div className="relative">
                  <input 
                    type="text" required
                    className="w-full border-b border-border-color py-2 outline-none focus:border-primary-color transition-colors peer placeholder-transparent"
                    id="lastName" placeholder="Last Name"
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                  />
                  <label htmlFor="lastName" className="absolute left-0 -top-3.5 text-xs text-dim peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all">Last Name</label>
                </div>
              </div>
            )}
            
            <div className="relative">
              <input 
                type="email" required
                className="w-full border-b border-border-color py-2 outline-none focus:border-primary-color transition-colors peer placeholder-transparent"
                id="email" placeholder="Email"
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs text-dim peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all">Enter Email/Mobile number</label>
            </div>

            <div className="relative">
              <input 
                type="password" required
                className="w-full border-b border-border-color py-2 outline-none focus:border-primary-color transition-colors peer placeholder-transparent"
                id="password" placeholder="Password"
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
              <label htmlFor="password" className="absolute left-0 -top-3.5 text-xs text-dim peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all">Enter Password</label>
            </div>

            {status && <p className="text-xs font-semibold text-secondary-color">{status}</p>}

            <p className="text-[11px] text-dim">
              By continuing, you agree to FlipStore's <span className="text-primary-color cursor-pointer">Terms of Use</span> and <span className="text-primary-color cursor-pointer">Privacy Policy</span>.
            </p>

            <button type="submit" className="w-full bg-secondary-color text-white py-3.5 font-bold rounded-sm shadow-[0_2px_4px_0_rgba(0,0,0,0.2)] hover:shadow-lg transition-all">
              {isLogin ? 'Login' : 'CONTINUE'}
            </button>
          </form>

          <div className="mt-auto text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-color font-bold text-sm hover:bg-primary-color/5 px-4 py-2 w-full transition-colors"
            >
              {isLogin ? 'New to FlipStore? Create an account' : 'Existing User? Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
