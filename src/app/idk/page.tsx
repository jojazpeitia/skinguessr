'use client'
import { motion } from "framer-motion";
import Image from "next/image"

export default function IdkPage() {
    return (
        <motion.div 
            className="flex justify-center w-screen "
            initial={{opacity: 0, y:20}} animate={{opacity:1, y:0, transition: {delay: 0.3}}} exit={{opacity: 0, y:20}}
        >
        <div className="relative overflow-hidden border-4 rounded shadow-md h-96 w-96">
            <Image
            src="/roblox-dance.gif"
            height={512}
            width={512}
            quality={100}
            alt="Dragon Lore"
            />
        </div>
     </motion.div>
    );
  }