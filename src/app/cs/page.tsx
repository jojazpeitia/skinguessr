'use client'

import { useState, useEffect} from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"  

import { Rajdhani } from 'next/font/google';
const rajdhani = Rajdhani({
    weight: ['500'],
    subsets: ['latin'],
    variable: '--font-rajdhani',
});

export default function CSPage() {
    const [initialZoom, setInitialZoom] = useState<number>(28); 
    const [userInput, setUserInput] = useState<string>('');
    const [imageLoading, setImageLoading] = useState(true);

    // Autofill stuff 
    const [data, setData]= useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    // Guessing stuff
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [attemptedSubmit, setAttemptedSubmit] = useState<boolean>(false);
    const [failedAttempts, setFailedAttempts] = useState<number>(0);
    const [showScareDialog, setShowScareDialog] = useState<boolean>(false)
    const [imageID, setCurrentImageID] = useState<number>(0);
    const [correctAnswer, setCorrectAnswer] = useState<string>('');

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

    // SUBMIT BUTTON HANDLER
    const handleSubmit = () => {
        const currentImage = images[imageID];

        if (userInput == currentImage.correctAnswer) {
            setIsCorrect(true);
        } else {
            setInitialZoom(prevZoom => prevZoom - 11); 
            setFailedAttempts((prevAttempts) => prevAttempts + 1); // Increment failed attempts
            setCorrectAnswer(currentImage.correctAnswer);
        }
        setAttemptedSubmit(true);
    };

    // NEXT BUTTON HANDLER
    const handleNext = () => {
        setInitialZoom(28);
        setUserInput('');
        setAttemptedSubmit(false);
        setIsCorrect(false);
        setFailedAttempts(0);

        // Generate a random image ID that is not the same as the current imageID
        // TODO: make it keep track of the images ID that were already used to prevent repeats.
        let newImageID = imageID;
        while (newImageID === imageID) {
            newImageID = Math.floor(Math.random() * images.length);
        }

        setImageLoading(true);
        setCurrentImageID(newImageID);
    };

    // fake db
    const images = [
        {   
            id: 1,
            src: "/images/awp/cu_medieval_dragon_awp.webp",
            blurUrl: "data:image/webp;base64,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",
            correctAnswer: "AWP | Dragon Lore"
        },
        {
            id: 2,
            src: "/images/awp/cu_awp_chroma_pink.webp",
            blurUrl: "data:image/webp;base64,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",
            correctAnswer: "AWP | Chromatic Aberration"
        }
    ]

    // this is called when failed attempts changes.
    useEffect(() => {
        if (failedAttempts >= 3) {
            // Show the pop-up to inform the user that they lost
            //   alert('You have lost! Please try again.');
            setShowScareDialog(true);
            // Reset the game state
            setIsCorrect(false);
            setInitialZoom(28);
            setUserInput('');
            setAttemptedSubmit(false);
            setFailedAttempts(0);

            // Generate a random image ID that is not the same as the current imageID
            // Image is being delayed so that initial zoom reset doesn't spoil the image
            // TODO: make it keep track of the images ID that were already used to prevent repeats.
            setTimeout(() => {
            let newImageID = imageID;
            while (newImageID === imageID) {
                newImageID = Math.floor(Math.random() * images.length);
            }

            setImageLoading(true);
            setCurrentImageID(newImageID);
            }, 300);
        }
    }, [failedAttempts, imageID, images.length]);

    return (
        <div className="flex flex-col items-center justify-center mx-20 space-y-5 md:space-x-20 md:flex-row md:space-y-0 md:min-w-fit">
            <div className="relative overflow-hidden border-4 border-gray-700 rounded shadow-sm h-96 w-96 ">
                <Image
                    src={images[imageID].src}
                    // blurDataURL={images[imageID].blurUrl}
                    // placeholder='blur'
                    height={4096}
                    width={4096}
                    quality={100}
                    alt="Skinmap"
                    priority={true}
                    style={imageStyle}
                    onLoadingComplete={() => {
                        console.log('Image loaded!');
                        setImageLoading(false);
                    }}
                />  
                </div>
            <div className='text-center'>
                <h1 className='mb-2 text-2xl italic'> PLACE YOUR GUESS: </h1>
                <Input 
                    value={userInput}
                    onInput={handleInputChange}
                    onFocus={() => setShowSuggestions(true)} // when element is focused
                    onBlur={handleInputBlur} // when element loses focus
                    className='text-lg shadow-sm w-96'
                />           
                {filteredSuggestions.length > 0 && userInput.length > 0 && (
                    <div className="absolute z-50 mt-2 overflow-y-auto text-lg bg-white rounded-sm shadow-md w-96 max-h-80"> 
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

                {attemptedSubmit && isCorrect ? (
                    
                    // FF9B01
                    <Button 
                    onClick={handleNext}
                    variant='outline'
                    className='w-24 mt-4 text-xl shadow-sm'>
                        Next
                    </Button>
                ) : 
                (
                    // Submit button
                    <Button 
                    onClick={handleSubmit}
                    variant="outline" 
                    className='mt-4 text-xl shadow-sm w-36'
                    disabled={imageLoading}
                    >
                        {imageLoading ? <span className='flex'> <Loader2 className='animate-spin'/> &nbsp; Loading</span> : 'Submit'}
                    </Button>
                )}
                {attemptedSubmit && isCorrect && <p className="absolute pl-40 mt-4 text-xl text-green-500">Correct!</p>}
                {attemptedSubmit && !isCorrect && <p className="absolute pl-40 mt-4 text-xl text-red-500">Incorrect!</p>}
            </div> 
            <Dialog open={showScareDialog} onOpenChange={() => setShowScareDialog(false)}>
                <DialogContent className={`${rajdhani.variable} font-sans mt-12 w-96`}>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Statistics</DialogTitle>
                        <DialogDescription className='text-md'>
                            A humble score, not worthy of praise! 
                            <br/>
                            Current Streak: 0
                            <br/>
                            Max Streak: 0
                            <br/>
                            Global Average: 0
                            <br/>
                            Answ&rsquo;r shouldst of been: <span className="text-red-500">{correctAnswer}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button className="w-24 text-lg" type="submit">Share</Button>
                    </DialogFooter>              
                </DialogContent>
            </Dialog>
        </div>
    );
}