'use client';
import { useState } from 'react';
import {
  ShieldCheck,
  Settings,
  Bell,
  LogOut,
  User,
} from 'lucide-react'; // Assuming you're using Lucide for icons

export default function Account() {
  const [user] = useState({
    name: 'Ouyorng',
    role: 'Admin',
    phone: '+855 97 123 4567',
    img: 'https://i.pravatar.cc/100?img=3',
  });

  const handleLogout = () => {
    alert('Logged out!');
    // Implement real logout logic here
  };

  const buttonClass =
    'w-full flex items-center gap-4 px-4 py-2 rounded text-left text-black border border-gray-300';

  return (
    <div className=" flex justify-center flex-col max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-5 text-center">
      {/* Profile Image */}
      <img
        src={'/home/pf.png'}
        alt="Profile"
        className="h-24 w-24 aspect-square mx-auto object-cover"
      />

      {/* User Info */}
      <div>
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.role}</p>
        <p className="text-gray-600">{user.phone}</p>
      </div>

      {/* Action Buttons */}
      <div style={{marginTop: "20px"}} className="space-y-2 mt-4 text-left flex flex-col gap-2">
        <button className={buttonClass}>
          <ShieldCheck size={20}  className=''/>
          Security
        </button>
        <button className={buttonClass}>
          <Settings size={20}  className=''/>
          Settings
        </button>
        <button className={buttonClass}>
          <User size={20} className='' />
          User permission
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{backgroundColor: "red", marginTop: "20px"}}
        className="w-full flex mt-4 items-center gap-3 px-4 py-2 rounded text-left text-white bg-red-500 hover:bg-red-600"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}
