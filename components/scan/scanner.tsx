'use client'
import { useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";

export default function App() {
  const [data, setData] = useState("Not Found");
  const [scanning, setScanning] = useState(true);

  return (
    <div style={{ position: 'relative' }} className="w-fit h-[200px] flex justify-center flex-col">
      {scanning && (
        <BarcodeScanner
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) {
              setData(result.getText());
              setScanning(false);  // turn off camera by hiding scanner
            } else {
              setData("Not Found");
            }
          }}
        />
      )}
      
      {/* Scan frame */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '60%',
          height: '30%',
          // border: '2px solid #00FF00'/,  // green frame
          borderRadius: 8,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          boxSizing: 'border-box',
        }}
      >
        {/* Animated red horizontal line */}
        {scanning && (
          <div style={{
            position: 'absolute',
            top: '100%', 
            left: 0,
            width: '100%',
            height: 2,
            backgroundColor: 'red',
            opacity: 0,
            animation: 'fadeInOut 2s infinite alternate',
            transform: 'translateY(-50%)',
          }} />
        )}
      </div>
      
      <p style={{ textAlign: 'center', marginTop: 10 }}>{data}</p>

      {/* Hide the default overlay */}
      <style jsx global>{`
        /* Assuming the overlay has this class - inspect the rendered DOM for exact class names */
        .react-qr-barcode-scanner__overlay,
        .overlay {
          display: none !important;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
