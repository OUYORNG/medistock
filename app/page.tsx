'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import './style.css'
export default function App() {
  const [showLogo, setShowLogo] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setShowLogo(true);
    }, 1500);
    setTimeout(() => {
    router.push('/dashboard');
    }, 2500);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-secondary overflow-hidden">
      {/* Top-left */}
      <img src="/home/rec1.png" alt="Top Left" className="absolute top-0 left-0" />

      {/* Center Logo with Framer Motion fade-in */}
      {showLogo && (
        <motion.img
          src="/home/logo.png"
          alt="Center Logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}

      {/* Bottom-right */}
      <img src="/home/rec2.png" alt="Bottom Right" className="absolute bottom-0 right-0" />
    </div>
  );
}