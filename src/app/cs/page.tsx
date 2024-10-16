'use client'

import { useState, useEffect} from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"
import { motion, Variants } from "framer-motion";
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

    const [initialZoom, setInitialZoom] = useState<number>(28); // 28 (backupvalue) 
    // const xAxisMovement: number = 90;  // -210 (backup value)
    // const yAxisMovement: number = 50; // -215 (backup value)
    const xAxisMovement: number = 120;
    const yAxisMovement: number = 310;

    // Database Data retrieval
    const [skinData, setSkinData]= useState<any[]>([]);

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
    // fetches api's on page load
    // ^ might need to optimize (caching)
    // https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side
    useEffect(() => {

        // skinname api
        fetch('https://skinguessr.vercel.app/api/content')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
        })

        // database api
        fetch('https://skinguessr.vercel.app/api/skindata')
        .then((res) => res.json())
        .then((data) => {
          setSkinData(data)
        })

        // console.log(skinData.length)
    }, [])

    // Filter the suggestions based on the user input
    const filteredSuggestions = data
    .filter((name: any) => name.toLowerCase().includes(userInput.toLowerCase()))
    .slice(0, 30);

    const handleInputBlur = () => {
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
        const currentImage = skinData[imageID];

        if (userInput == currentImage.correctanswer) {
            setIsCorrect(true);
        } else {
            setInitialZoom(prevZoom => prevZoom - 11); 
            setFailedAttempts((prevAttempts) => prevAttempts + 1); // Increment failed attempts
            setCorrectAnswer(currentImage.correctanswer);
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
            newImageID = Math.floor(Math.random() * skinData.length);
        }

        setImageLoading(true);
        setCurrentImageID(newImageID);
    };

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
                newImageID = Math.floor(Math.random() * skinData.length);
            }

            setImageLoading(true);
            setCurrentImageID(newImageID);
            }, 300);
        }
    }, [failedAttempts, imageID, skinData.length]);

    return (
        <motion.div 
            className="flex flex-col items-center justify-center mx-20 space-y-5 md:space-x-20 md:flex-row md:space-y-0 md:min-w-fit"
            initial={{opacity: 0, y:20}} 
            animate={{opacity: 1, y:0, transition: {delay: 0.3, duration: 0.3}}} 
            exit={{opacity: 0, y:20}}
        >
            <div className="relative overflow-hidden border-4 rounded-lg shadow-md w-96">
                {skinData && skinData[imageID] && skinData[imageID]['src'] && (
                    <Image
                        src={skinData[imageID]['src']}
                        height={4096}
                        width={4096}
                        quality={100}
                        alt="Skinmap"
                        priority={true}
                        style={imageStyle}
                        className="pointer-events-none" // Add this class to disable pointer events
                        onLoadingComplete={() => {
                            setImageLoading(false);
                        }}
                    />  
                )}
            </div>
            <div className='text-center'>
                <label htmlFor="userInput" className='mb-2 text-2xl italic'> PLACE YOUR GUESS: </label>
                <motion.div whileTap={{ scale: 0.97 }}>
                    <Input 
                        id='userInput'
                        value={userInput}
                        onInput={handleInputChange}
                        onFocus={() => setShowSuggestions(true)} // when element is focused
                        onBlur={handleInputBlur} // when element loses focus
                        className='text-lg shadow-sm w-96'
                    />    
                </motion.div>   
                {filteredSuggestions.length > 0 && userInput.length > 0 && (
                    <motion.div initial={"closed"} animate={showSuggestions ? "open" : "closed"} variants={{
                        // Suggestions Animation
                            // open: {
                            //     opacity: 1,
                            //     y: 0,
                            //     transition: { type: "spring", stiffness: 300, damping: 24 }
                            // },
                            // closed: { 
                            //     opacity: 0, 
                            //     y: 20, 
                            //     transition: {duration: 0.2 } 
                            // }
                        }}>   
                        <div className="absolute z-50 mt-2 overflow-y-auto text-lg bg-white rounded-sm shadow-md w-96 max-h-80">  
                            <motion.ul variants={{
                                // List Item Animations
                                open: {
                                  clipPath: "inset(0% 0% 0% 0% round 10px)",
                                  transition: {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.5,
                                    delayChildren: 0.3,
                                    staggerChildren: 0.05
                                    }
                                },
                                closed: {
                                  clipPath: "inset(10% 50% 90% 50% round 10px)",
                                  transition: {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.3
                                  }
                                }
                              }}>
                                {showSuggestions && filteredSuggestions.map((suggestion) => {
                                    const index = suggestion.toLowerCase().indexOf(userInput.toLowerCase());
                                        return (
                                            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" key={suggestion} onClick={() => handleSuggestionSelect(suggestion)}>
                                                {suggestion.substring(0, index)}
                                                <span className="text-red-500">
                                                    {suggestion.substring(index, index + userInput.length)} 
                                                </span>
                                                {suggestion.substring(index + userInput.length)}
                                            </li>
                                        );
                                })}
                            </motion.ul>
                        </div>
                    </motion.div> 
                )}
                {attemptedSubmit && isCorrect ? (
                    // Next Button
                    <motion.div whileTap={{ scale: 0.87 }}>
                        <Button 
                            onClick={handleNext}
                            variant='outline'
                            className='mt-4 text-xl shadow-sm w-36'>
                                Next
                        </Button>
                    </motion.div>
                ) : 
                (
                    // Submit button
                    <motion.div whileTap={{ scale: 0.87 }}>
                        <Button 
                            onClick={handleSubmit}
                            variant="outline" 
                            className='mt-4 text-xl shadow-sm w-36'
                            disabled={imageLoading}
                        >
                            {imageLoading ? <span className='flex'> <Loader2 className='animate-spin'/> &nbsp; Loading</span> : 'Submit'}
                        </Button>
                    </motion.div>
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
        </motion.div>
    );
}