'use client'
import React, { useState } from 'react';

type SaleItem = {
    id: number;
    saleId: string;
    saleDate: string;
    saleAmount: number;
    salePerson: string;
};

type SaleData = {
    id: number;
    date: string;
    data: SaleItem[];
};

const allSalesData: SaleData[] = [
    {
        id: 1,
        date: "September 15, 2025",
        data: [
            { id: 1, saleId: "#6213", saleDate: "14-Jun-2025 12:00 PM", saleAmount: 25.41, salePerson: "Chenda Sok" },
            { id: 2, saleId: "#6214", saleDate: "14-Jun-2025 12:00 PM", saleAmount: 12.56, salePerson: "Sombath Sok" },
            { id: 3, saleId: "#6215", saleDate: "14-Jun-2025 12:00 PM", saleAmount: 10.51, salePerson: "Sophea Sok" },
        ]
    },
    {
        id: 2,
        date: "September 14, 2025",
        data: [
            { id: 1, saleId: "#5122", saleDate: "14-Jun-2025 12:00 PM", saleAmount: 25.41, salePerson: "Chenda Sok" },
            { id: 2, saleId: "#5121", saleDate: "14-Jun-2025 12:00 PM", saleAmount: 10.56, salePerson: "Sombath Sok" },
        ]
    }
];

const SaleCard = ({ saleData }: { saleData: SaleData }) => (
    <div className='flex flex-col gap-4'>
        <h1 className='text-gray-500'>{saleData.date}</h1>
        {saleData.data.map((sale) => (
            <div key={sale.id} className='flex justify-between border border-gray-200 p-4 rounded-2xl'>
                <div className="left flex justify-center items-center gap-4">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 19V0H18V19L15 17L12 19L9 17L6 19L3 17L0 19ZM14 6V4H12V6H14ZM10 6V4H4V6H10ZM10 8H4V10H10V8ZM12 10H14V8H12V10Z" fill="#64748B" />
                    </svg>                    <div>
                        <h2 className='text-xl font-semibold'>{sale.saleId}</h2>
                        <p className='text-sm'>{sale.saleDate}</p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <div>
                        <h2 className='text-lg font-semibold text-green-600'>{sale.saleAmount}</h2>
                        <p className='text-sm'>{sale.salePerson}</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.667 4.16667C11.667 3.25 10.917 2.5 10.0003 2.5C9.08366 2.5 8.33366 3.25 8.33366 4.16667C8.33366 5.08333 9.08366 5.83333 10.0003 5.83333C10.917 5.83333 11.667 5.08333 11.667 4.16667Z" fill="#0F0F0F" />
                        <path d="M11.667 15.8334C11.667 14.9167 10.917 14.1667 10.0003 14.1667C9.08366 14.1667 8.33366 14.9167 8.33366 15.8334C8.33366 16.7501 9.08366 17.5001 10.0003 17.5001C10.917 17.5001 11.667 16.7501 11.667 15.8334Z" fill="#0F0F0F" />
                        <path d="M11.667 9.99992C11.667 9.08325 10.917 8.33325 10.0003 8.33325C9.08366 8.33325 8.33366 9.08325 8.33366 9.99992C8.33366 10.9166 9.08366 11.6666 10.0003 11.6666C10.917 11.6666 11.667 10.9166 11.667 9.99992Z" fill="#0F0F0F" />
                    </svg>                </div>
            </div>
        ))}
    </div>
);

const Page = () => {
    const totalSales = 156052.56;
    const [filterDate, setFilterDate] = useState<string>("All");

    const filteredSales = filterDate === "All"
        ? allSalesData
        : allSalesData.filter((item) => item.date === filterDate);

    const uniqueDates = Array.from(new Set(allSalesData.map(s => s.date)));

    return (
        <div className='flex flex-col gap-12'>
            <div className='flex justify-between items-start'>
                <div>
                    <h1 className='text-xl font-semibold'>Total Sales</h1>
                    <h1 className='text-2xl font-bold text-green-500'>$ {totalSales.toLocaleString()}</h1>
                </div>

                {/* Filter Section */}
                <div className='flex gap-2'>
                    <select id='filterDate'
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className='bg-gray-200 h-8 rounded-2xl text-sm font-medium'
                    >
                        <option value="All">All Dates</option>
                        {uniqueDates.map((date) => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Render Filtered Data */}
            {filteredSales.map((saleData) => (
                <SaleCard key={saleData.id} saleData={saleData} />
            ))}
        </div>
    );
};

export default Page;
