'use client';
import { useState } from 'react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      price: 0.25,
      quantity: 2,
      img: '/product/1.png',
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      price: 0.5,
      quantity: 3,
      img: '/product/2.png',
    },
  ]);

  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash');
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  async function handleOrder() {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setLoading(true);

    // Prepare order details text for Telegram
    const itemsText = cartItems
      .map((item) => `${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const orderDetails = `
    🛒 New Order Received:

Delivery: ${deliveryType}
Payment: ${paymentMethod}
Total: $${total}

Items:
${itemsText}

Report's Link: https://report.medistock.app/
    `;

    try {
      const res = await fetch('/api/sendTelegramOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderDetails }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('Order placed and notification sent!');
        setCartItems([]);
      } else {
        alert('Failed to send order notification.');
      }
    } catch (error) {
      alert('Error sending order: ' + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700 text-center">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-medium">🪹 No cart found.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border p-4 rounded shadow-sm">
              <img src={item.img} alt={item.name} className="w-20 h-20 object-contain bg-gray-100 rounded" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                <p className="font-bold text-blue-700">= ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}

          <div className="text-right text-lg font-semibold">
            Total: <span className="text-green-700">${total}</span>
          </div>

          {/* Delivery Option */}
          <div className="space-y-2">
            <p className="font-medium">Select Delivery Option:</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={deliveryType === 'pickup'}
                  onChange={() => setDeliveryType('pickup')}
                />
                Pickup
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="delivery"
                  checked={deliveryType === 'delivery'}
                  onChange={() => setDeliveryType('delivery')}
                />
                Delivery
              </label>
            </div>
          </div>

          {/* Payment Option */}
          <div className="space-y-2">
            <p className="font-medium">Select Payment Method:</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                Cash
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                />
                Online Payment
              </label>
            </div>
          </div>

          {/* Order Button */}
          <button
            onClick={handleOrder}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Order Now'}
          </button>
        </div>
      )}
    </div>
  );
}
