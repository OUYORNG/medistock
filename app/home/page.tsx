'use client';

import { useState } from 'react';
import { FaGoogle, FaFacebook, FaTiktok } from 'react-icons/fa';

export default function AuthPage() {
  const defaultEmail = '1';
  const defaultPassword = '1';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email === defaultEmail && password === defaultPassword) {
      window.location.href = '/dashboard';
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-white">
      {/* Logo */}
      <div className="flex-1 flex bg-secondary w-full justify-center items-center">
        <img src="/home/logo.png" alt="Logo" />
      </div>

      {/* Login Form */}
      <div className="flex-1 flex p-4 flex-col justify-center items-center w-full px-6">
        <h1 className="text-2xl font-bold mb-4">Welcome Back 👋</h1>

        <form className="w-full max-w-sm space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="text-right">
            <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-primary text-white py-2 rounded-md font-semibold"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => window.location.href = '/register'}
            className="w-full border border-primary text-primary py-2 rounded-md font-semibold"
          >
            Register
          </button>
        </form>
      </div>

      {/* Social Login */}
      <div className="p-6">
        <p className="text-gray-500 mb-2 text-center">Or continue with</p>
        <div className="flex justify-center gap-6 text-2xl text-gray-600">
          <a href="#"><FaGoogle /></a>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTiktok /></a>
        </div>
      </div>
    </div>
  );
}
