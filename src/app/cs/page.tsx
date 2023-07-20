'use client'

import { useState } from 'react';
import Image from 'next/image'

export default function CSPage() {
    
    // sets initial zoom to a value of 28.
    const [initialZoom, setInitialZoom] = useState(28); 

    // const xAxisMovement = -210; 
    // const yAxisMovement = -250; 
    const xAxisMovement = 0;  // center x value 
    const yAxisMovement = 0; // center y value 

    
    const imageStyle = {
        width: '640', // matches the height of the max-w-screen
        height: '640', // matches the height of the h-max i think
        transform: `scale(${initialZoom}) translateX(${xAxisMovement}px) translateY(${yAxisMovement}px)`,
        transition: 'transform 0.3s ease-in-out',
    };

    // zooms out to the value of 11
    const handleZoomOut = () => {
        setInitialZoom(prevZoom => prevZoom - 11); 
    };
    
    return (
        <div>
            <div className="flex justify-center w-screen">
                <h1> Counter-Strike </h1>
            </div>
            <div className="flex justify-center w-screen ">
                <div className="relative max-w-screen-sm overflow-hidden border-4 border-gray-700 h-max">
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
                <div className="flex justify-center">
                    <button onClick={handleZoomOut} className="px-4 py-2 text-white bg-red-500">
                        Zoom Out
                    </button>
                </div>
            </div>
        </div>
    );
  }