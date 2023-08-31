'use client'
import { CounterStrike2Alt, SkinGuessr} from '@/components/svgs';
import { FaHorse } from 'react-icons/fa';
import Link from 'next/link';
import { motion} from "framer-motion";

interface NavBarIconProps {
    icon: React.ReactNode;
    text: string | null;
    href: any | null;
}

const NavBarIcon = ({ icon, text = 'tooltip 💡', href}: NavBarIconProps) => (
    <div className='navbar-icon group'>
        <Link href={href}>
            {icon}
            <span className="navbar-tooltip group-hover:scale-100">
                {text}
            </span>
        </Link>
    </div>
);

const Divider = () => <hr className="navbar-hr"/>;

export default function NavMenu() {
    return (
         <div className="flex items-center justify-center w-screen h-16 text-white shadow-lg bg-primary">
             <div className="flex items-center space-x-8">
                <motion.div whileTap={{ scale: 0.87 }}>
                    <NavBarIcon icon={<CounterStrike2Alt className="text-4xl" />} text="Counter Strike" href="/cs"/>
                </motion.div>
                <Divider/>
                <motion.div whileTap={{ scale: 0.87 }}>
                    <Link href={'/'}> 
                        <SkinGuessr className="text-9xl" />
                    </Link>
                </motion.div>
                <Divider/>
                <motion.div whileTap={{ scale: 0.87 }}>
                    <NavBarIcon icon={<FaHorse className="h-6 text-4xl fill-white" />} text="Contact" href="/idk" />
                </motion.div>
             </div>
         </div>
    );
}