import { useState } from 'react';
import Image from 'next/image'

export default function CSPage() {
    
    const initialZoom = 2; 
    const xAxisMovement = -158; 
    const yAxisMovement = -158; 
    
    const imageStyle = {
        transform: `scale(${initialZoom}) translateX(${xAxisMovement}px) translateY(${yAxisMovement}px)`,
    };
    
    return (
        <div >
            <div className="flex justify-center w-screen">
                <h1> Counter-Strike </h1>
            </div>
            <div className="flex justify-center w-screen">
                <div className="relative max-w-screen-sm overflow-hidden border-4 border-gray-700 h-max" >
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
            </div>
        </div>
    );
  }