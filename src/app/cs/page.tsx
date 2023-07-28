'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CSPage() {

    const [initialZoom, setInitialZoom] = useState<number>(28); 
    const [userInput, setUserInput] = useState<string>('');
    const [data, setData]= useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);


    const xAxisMovement: number = 90;  // -210 (backup value)
    const yAxisMovement: number = 50; // -215 (backup value)

    // defines a type for the image style
    type ImageStyle = {
    transform: string;
    transition: string;
    transformOrigin: string;
  };

    const imageStyle: ImageStyle = {
        transform: `scale(${initialZoom}) translateX(${xAxisMovement}px) translateY(${yAxisMovement}px)`,
        transition: 'transform 0.3s ease-in-out',
        transformOrigin: 'bottom right', // Zoom from the top-left corner
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    // client-side data fetching
    // fetches api on page load
    // ^ might need to optimize (caching)
    // https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side
    useEffect(() => {
        fetch('https://skinguessr.vercel.app/api/content')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
          })
    }, [])
    

    // Filter the suggestions based on the user input
    const filteredSuggestions = data.filter((name: any) =>
        name.toLowerCase().includes(userInput.toLowerCase())
    );

    const handleInputBlur = () => {
        // setShowSuggestions(false);
        setTimeout(() => {
            setShowSuggestions(false);
        }, 100); //100ms
    };

    const handleSuggestionSelect = (suggestion: string) => {
        setUserInput(suggestion);
        setShowSuggestions(false); // Hide the suggestions after selection if needed
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
            <div className='text-center'>
                <h1 className='mb-2 text-2xl italic'> PLACE YOUR GUESS: </h1>
                <Input 
                    value={userInput}
                    onInput={handleInputChange}
                    onFocus={() => setShowSuggestions(true)} // when element is focused
                    onBlur={handleInputBlur} // when element loses focus
                    className='shadow-sm w-96'
                />            
                {filteredSuggestions.length > 0 && userInput.length > 0 && (
                    <div className="absolute mt-2 overflow-y-auto bg-white rounded-sm shadow-md w-96 max-h-80"> 
                        <ul>
                            {showSuggestions && filteredSuggestions.map((suggestion) => {
                                const index = suggestion.toLowerCase().indexOf(userInput.toLowerCase());
                                if (index >= 0) {
                                    return (
                                        <li
                                            key={suggestion}
                                            className="px-4 py-2 cursor-pointer"
                                            onClick={() => handleSuggestionSelect(suggestion)}
                                        >
                                            {suggestion.substring(0, index)}
                                            <span className="text-red-500">
                                                {suggestion.substring(index, index + userInput.length)} 
                                            </span>
                                            {suggestion.substring(index + userInput.length)}
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li
                                            key={suggestion}
                                            className="px-4 py-2 cursor-pointer"
                                            onClick={() => handleSuggestionSelect(suggestion)}
                                        >
                                            {suggestion}
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    </div>
                )}
                <Button 
                    variant="outline" 
                    className='mt-4 text-lg shadow-sm'>SUBMIT
                </Button>
            </div> 
        </div>
    );
}