'use client'
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";

const categories = [
  "All",
  "DKSH",
  "MEGA WE CARE",
  "SANOFI",
  "GETZ",
  "GLENMARK",
];

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  barcode?: string;
  qty: number;
  expiryDate: string;
};

export default function ProductList() {
  // const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Paracetamol",
      price: 1.99,
      category: "DKSH",
      image: "/product/1.png",
      qty: 10,
      barcode: "1234567890123",
      expiryDate: "2025-09-15",
    },
    {
      id: 2,
      name: "Ibuprofen",
      price: 2.49,
      category: "DKSH",
      image: "/product/2.png",
      qty: 5,
      barcode: "1234567890456",
      expiryDate: "2026-01-01",
    },
    {
      id: 3,
      name: "Vitamin C",
      price: 3.99,
      category: "MEGA WE CARE",
      image: "/product/3.png",
      qty: 20,
      barcode: "1234567890789",
      expiryDate: "2024-12-01",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    qty: "",
    expiryDate: "",
  });

  const handleScan = (_err: any, result: any) => {
    if (result?.text) {
      setBarcode(result.text);
      setScanning(false);
    }
  };

  const handleSave = async () => {
    const newProduct: Product = {
      id: editId ?? Date.now(),
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
      image: form.image || "/product/default.png",
      barcode,
      qty: parseInt(form.qty),
      expiryDate: form.expiryDate,
    };

    const expiry = new Date(newProduct.expiryDate);
    const warningDate = new Date("2025-10-01");

    if (expiry <= warningDate) {
      const warningItem = `${newProduct.name} - Qty: ${newProduct.qty} - $${newProduct.price.toFixed(2)} - Expiry: ${newProduct.expiryDate}`;

      const orderDetails = `
  ⚠️ *Product Nearly Expired!*
  ----------------------------
  ${warningItem}
  
  📦 View in App: https://report.medistock.app/
      `.trim();

      try {
        const res = await fetch('/api/sendTelegramOrder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderDetails }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          alert('🚨 Telegram alert sent!');
        } else {
          alert('❌ Failed to notify via Telegram.');
        }
      } catch (error) {
        alert('Error sending Telegram message: ' + error);
      }

      alert("⚠️ This product is nearly expired!");
    }

    if (editId) {
      setProducts(products.map((p) => (p.id === editId ? newProduct : p)));
    } else {
      setProducts([newProduct, ...products]);
    }

    // Reset form
    setForm({ name: "", price: "", category: "", image: "", qty: "", expiryDate: "" });
    setBarcode("");
    setFormVisible(false);
    setEditId(null);
  };


  const handleEdit = (product: Product) => {
    setFormVisible(true);
    setEditId(product.id);
    setBarcode(product.barcode || "");
    setForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      qty: product.qty.toString(),
      expiryDate: product.expiryDate,
    });
  };

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Medicine Product List</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setFormVisible(true);
            setForm({ name: "", price: "", category: "", image: "", qty: "", expiryDate: "" });
            setEditId(null);
            setBarcode("");
          }}
        >
          +
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full max-w-[400px]"
        />
        <div className="w-[300px]">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Form */}
      {formVisible && (
        <div className="border p-4 rounded bg-gray-50 max-w-[400px] space-y-2">
          <div>
            <button
              onClick={() => setScanning(!scanning)}
              className="bg-gray-700 text-white px-4 py-1 rounded"
            >
              {scanning ? "Stop Scanning" : "Scan Barcode"}
            </button>
          </div>

          {scanning && (
            <div className="border w-full h-[300px] mb-4">
              <BarcodeScanner onUpdate={handleScan} width={400} height={300} />
            </div>
          )}

          <input
            placeholder="Barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="block border p-1 w-full"
          />

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="block border p-1 w-full"
          />

          <input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="block border p-1 w-full"
          />

          <input
            placeholder="Quantity"
            type="number"
            value={form.qty}
            onChange={(e) => setForm({ ...form, qty: e.target.value })}
            className="block border p-1 w-full"
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="block border p-1 w-full"
          >
            <option value="">Select Category</option>
            {categories.filter((c) => c !== "All").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            placeholder="Image Path"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="block border p-1 w-full"
          />

          <input
            type="date"
            value={form.expiryDate}
            onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            className="block border p-1 w-full"
          />

          <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">
            {editId ? "Update" : "Save Product"}
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow max-w-[400px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Qty: {product.qty}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
            {product.barcode && (
              <p className="text-sm text-gray-500">Barcode: {product.barcode}</p>
            )}
            <p className="text-sm text-gray-500">Expiry: {product.expiryDate}</p>
            <button
              onClick={() => handleEdit(product)}
              className="mt-2 px-4 py-1 rounded bg-yellow-500 text-white"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
