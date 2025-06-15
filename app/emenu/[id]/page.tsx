'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const allProducts = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    price: 0.25,
    description: 'Pain reliever and fever reducer commonly used for headaches and minor aches.',
    promotion: 'Buy 5 for $1.00',
    img: '/product/1.png',
    size: '500mg',
    supplier: 'Sanofi',
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    price: 0.5,
    description: 'Antibiotic used to treat a variety of bacterial infections.',
    promotion: 'Buy 5 for $2.00',
    img: '/product/2.png',
    size: '250mg',
    supplier: 'Mega',
  },
  {
    id: 3,
    name: 'Ibuprofen 200mg',
    price: 0.4,
    description: 'Nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation.',
    promotion: 'Buy 5 for $1.60',
    img: '/product/3.png',
    size: '200mg',
    supplier: 'Sanofi',
  },
  {
    id: 4,
    name: 'Vitamin C 1000mg',
    price: 0.3,
    description: 'Boosts immune system, supports collagen production, and acts as an antioxidant.',
    promotion: 'Buy 5 for $1.20',
    img: '/product/4.png',
    size: '1000mg',
    supplier: 'Mega',
  },
  {
    id: 5,
    name: 'Loratadine 10mg',
    price: 0.35,
    description: 'Antihistamine used to relieve allergy symptoms such as sneezing, runny nose, and itchy eyes.',
    promotion: 'Buy 5 for $1.40',
    img: '/product/5.png',
    size: '10mg',
    supplier: 'Sanofi',
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="p-8 text-center text-red-500 font-bold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-blue-700 text-center">
        🏥 {product.name}
      </h1>

      {/* Image */}
      <div className="w-full flex justify-center">
        <img
          src={product.img}
          alt={product.name}
          className="h-52 object-contain rounded bg-gray-100 p-4"
        />
      </div>

      {/* Info */}
      <div className="space-y-2">
        <p><span className="font-semibold">Supplier:</span> {product.supplier}</p>
        <p><span className="font-semibold">Size:</span> {product.size || 'N/A'}</p>
        <p><span className="font-semibold">Description:</span> {product.description}</p>
        <p><span className="font-semibold">Promotion:</span> {product.promotion}</p>
        <p><span className="font-semibold">Price:</span> ${product.price.toFixed(2)} each</p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <label htmlFor="qty" className="font-semibold">Quantity:</label>
        <input
          id="qty"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 px-2 py-1 border rounded"
        />
      </div>

      {/* Buy Button */}
      <button
        onClick={() => alert(`You ordered ${quantity} x ${product.name}`)}
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-bold hover:bg-blue-700 transition"
      >
        Buy Now
      </button>
    </div>
  );
}
