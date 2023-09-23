'use client'
import { SkinGuessrBlack } from "@/components/svgs";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-72" >
      <motion.div 
        className=""
        initial={{ opacity: 0, x: 100 }} 
        animate={{ opacity: 1, x: 0, transition: {duration: 0.6}}} 
        exit={{ opacity: 0, x: 100 }} 
      >
        <SkinGuessrBlack className="w-64 mb-6 scale-125 md:scale-150"/>
      </motion.div>
      
      <motion.h1 
        className="mb-3 text-3xl md:text-4xl"
        initial={{ opacity: 0, x: -100 }} 
        animate={{ opacity: 1, x: 0, transition: {duration: 0.6}}} 
        exit={{ opacity: 0, x: -100 }} 
      >
        Get 3 chances to <br/> guess  a random skin.
      </motion.h1>
        
      <motion.h2 
        className="text-lg md:text-xl"           
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1, x: 0, transition: { delay: 0.6, duration: 0.6} }} 
        exit={{ opacity: 0 }}>
          Created by joja
      </motion.h2>
    </div>
  );
}


