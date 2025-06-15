'use client'
import { useRouter } from "next/navigation";
import { ChartLineMultiple } from "../com/chart";

const Card = ({ number, title }: { number: string, title: string }) => {
  return (
    <div className="flex flex-col p-4 border border-gray-300  rounded-2xl items-start justify-center">
      <h1 className={"text-2xl font-bold text-green-500"}>{number}</h1>
      <p className={"text-xl font-bold"}>{title}</p>
    </div>
  )
}

interface Cashier {
  id: number;
  name: string;
  role: string;
  balance: string;
  image: string;
  change: string;
}

const cashier: Cashier[] = [
  {
    id: 1,
    name: "Soksombath",
    role: "Cashier",
    balance: "$43.5",
    image: "/us/photo_2025-06-05_18-50-23.png",
    change: "+10%"
  },
  {
    id: 2,
    name: "OUYORNG",
    role: "Cashier",
    balance: "$22.5",
    image: "/us/photo_2025-06-05_18-50-23.png",
    change: "+10%"
  },
  {
    id: 3,
    name: "LY VIRAK",
    role: "Cashier",
    balance: "$12.5",
    image: "/us/photo_2025-06-05_18-50-23.png",
    change: "+10%"
  },
  {
    id: 4,
    name: "PANHA",
    role: "Cashier",
    balance: "$65.7",
    image: "/us/photo_2025-06-05_18-50-23.png",
    change: "+10%"
  },
]


const Cashier = ({ cashier }: { cashier: Cashier }) => {
  return (
    <div className="flex flex-col rounded-2xl">
      <div className="flex justify-between items-center w-full border border-gray-300 p-4 rounded-2xl">
        <div className="flex gap-2">
          <img src="/us/photo_2025-06-05_18-50-23.png" alt="" className="aspect-square w-14 h-14" />
          <div>
            <p className="font-semibold text-2xl">{cashier.name}</p>
            <p>{cashier.role}</p>
          </div>
        </div>
        <div className="flex justify-end flex-col items-end">
          <p className="text-2xl font-semibold text-gray-950">{cashier.balance}</p>
          <p className="text-green-500">(+10%)</p>
        </div>
      </div>
    </div>
  )
}
export default function DocsPage() {
  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-2 gap-4">
          <Card number="58" title="Products" />
          <Card number="3" title="Total User" />
          <Card number="$234.42" title="Sales" />
          <Card number="5" title="Expired Products" />
        </div>
        <div className="flex items-center gap-4 p-4 bg-yellow-100 rounded-2xl">
          <div className="p-4 rounded-full w-12 h-12 flex justify-center bg-yellow-400">
            <svg width="20" height="20" viewBox="0 0 4 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.44744 0.559996C1.62173 0.483244 1.81011 0.443686 2.00055 0.443848C2.19087 0.443894 2.37908 0.483606 2.55319 0.56045C2.7273 0.637293 2.88349 0.749582 3.01178 0.890153C3.14007 1.03072 3.23766 1.19649 3.29831 1.37688C3.35896 1.55727 3.38136 1.74832 3.36405 1.93785L2.81805 7.94685C2.79683 8.14887 2.70155 8.33588 2.55059 8.47181C2.39963 8.60774 2.20369 8.68296 2.00055 8.68296C1.79742 8.68296 1.60148 8.60774 1.45052 8.47181C1.29956 8.33588 1.20428 8.14887 1.18305 7.94685L0.635554 1.93785C0.618241 1.7482 0.640673 1.55702 0.701416 1.37653C0.76216 1.19603 0.859879 1.03019 0.988334 0.8896C1.11679 0.749005 1.27316 0.636747 1.44744 0.559996Z" fill="white" />
              <path d="M3.3091 11.2476C3.3091 11.9703 2.72327 12.5561 2.00061 12.5561C1.27795 12.5561 0.692125 11.9703 0.692125 11.2476C0.692125 10.5249 1.27795 9.93912 2.00061 9.93912C2.72327 9.93912 3.3091 10.5249 3.3091 11.2476Z" fill="white" />
            </svg>
          </div>
          <div>
            <p className="text-red-500">Warning !!</p>
            <p>Paracetamol 500mg (Batch #A123) expired on June 10, 2025</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Cashier</h1>
          {cashier.map((cashier) => (
            <Cashier key={cashier.id} cashier={cashier} />
          ))}
        </div>
        <ChartLineMultiple />
      </div>
    </div>
  );
}

