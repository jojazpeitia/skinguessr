import { CounterStrike2Alt, SkinGuessr, Valorant } from './svgs';
import Link from 'next/link';

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
                <NavBarIcon icon={<CounterStrike2Alt className="text-4xl" />} text="Counter Strike" href="/cs"/>
                <Divider/>
                <Link href={'/'}> 
                    <SkinGuessr className="text-9xl" />
                </Link>
                <Divider/>
                <NavBarIcon icon={<Valorant className="text-4xl" />} text="Valorant" href="/valorant" />
             </div>
         </div>
    );
}