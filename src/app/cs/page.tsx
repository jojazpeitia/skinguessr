'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input";

export default function CSPage() {
    
    // sets initial zoom to a value of 28.
    const [initialZoom, setInitialZoom] = useState(28);  

    const xAxisMovement = 90;  // -210 (backup value)
    const yAxisMovement = 50; // -215 (backup value)

    
    const imageStyle = {
        transform: `scale(${initialZoom}) translateX(${xAxisMovement}px) translateY(${yAxisMovement}px)`,
        transition: 'transform 0.3s ease-in-out',
        transformOrigin: 'bottom right', // Zoom from the top-left corner
    };

    // zooms out to the value of 11
    const handleZoomOut = () => {
        setInitialZoom(prevZoom => prevZoom - 11); 
    };
    
    return (
        <div className="flex flex-col items-center justify-center mx-20 space-y-5 md:space-x-20 md:flex-row md:space-y-0 md:min-w-fit">
            <div className="relative overflow-hidden border-4 border-gray-700 rounded shadow-sm h-96 w-96 ">
                <Image
                src="/images/awp/cu_medieval_dragon_awp.png"
                height={4096}
                width={4096}
                quality={100}
                alt="Dragon Lore"
                priority={true}
                style={imageStyle}
                />   
            </div>
            <div className='text-center '>
                <h1 className='mb-2'> Place your guess: </h1>
                <Input className='shadow-sm w-96'/>
                <button onClick={handleZoomOut} className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md">
                        Zoom Out
                </button>
            </div>
        </div>
    );
  }