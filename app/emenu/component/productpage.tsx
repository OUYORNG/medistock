'use client';
import { useState } from 'react';

export default function ProductPage() {
  const [search, setSearch] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      price: 0.25,
      description: 'Pain reliever and fever reducer commonly used for headaches and minor aches.',
      promotion: 'Buy 5 for $1.00',
      img: '/product/1.png',
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      price: 0.5,
      description: 'Antibiotic used to treat a variety of bacterial infections.',
      promotion: 'Buy 5 for $2.00',
      img: '/product/2.png',
    },
    {
      id: 3,
      name: 'Ibuprofen 200mg',
      price: 0.4,
      description: 'Nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation.',
      promotion: 'Buy 5 for $1.60',
      img: '/product/3.png',
    },
    {
      id: 4,
      name: 'Vitamin C 1000mg',
      price: 0.3,
      description: 'Boosts immune system, supports collagen production, and acts as an antioxidant.',
      promotion: 'Buy 5 for $1.20',
      img: '/product/4.png',
    },
    {
      id: 5,
      name: 'Loratadine 10mg',
      price: 0.35,
      description: 'Antihistamine used to relieve allergy symptoms such as sneezing, runny nose, and itchy eyes.',
      promotion: 'Buy 5 for $1.40',
      img: '/product/5.png',
    },
  ];

  const carouselImages = [
    '/product/banner1.png',
    '/product/banner2.png',
    '/product/banner3.png',
  ];

  const filteredProducts = products.filter((product) =>
    (product.name + product.description).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 text-center text-2xl font-bold rounded-t-lg">
        🏥 Ouyorng Medical Store
      </header>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        <img
          src={carouselImages[currentSlide]}
          alt="Carousel"
          className="w-full h-52 object-cover"
        />
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full ${currentSlide === idx ? 'bg-white' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Product List */}
      <div className="px-4 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p.id} className="border rounded-lg shadow hover:shadow-md transition p-4">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-32 object-contain rounded bg-gray-50"
              />
              <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.description}</p>
              <p className="text-blue-600 font-medium mt-1">${p.price.toFixed(2)} each</p>
              <p className="text-sm text-green-600 mt-1">{p.promotion}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No products found.</p>
        )}
      </div>
    </div>
  );
}
