'use client'
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      className="flex justify-center w-screen text-xl italic"
      initial={{opacity: 0, y:20}} animate={{opacity:1, y:0, transition: {delay: 0.3}}} exit={{opacity: 0, y:20}}
    > 
        Home
    </motion.div>
  );
}


