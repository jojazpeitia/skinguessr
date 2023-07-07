import React from 'react';
import { CounterStrike2Alt, SkinGuessr, Valorant } from './svgs';

const TopBar: React.FC = () => {
    return (
        // Top Bar
        <div className="fixed flex items-center justify-center w-screen h-16 text-white shadow-lg bg-primary">
            <div className="flex items-center space-x-8">
                <TopBarIcon icon={<CounterStrike2Alt className="text-4xl" />} text="Counter Strike" />
                <Divider/>
                <SkinGuessr className="text-9xl" />
                <Divider/>
                <TopBarIcon icon={<Valorant className="text-4xl" />} text="Valorant" />
            </div>
        </div>
    );
};


type TopBarIconProps = {
    icon: React.ReactNode;
    text?: string;
}

const TopBarIcon = ({ icon, text = 'tooltip 💡'}: TopBarIconProps) => (
    <div className='topbar-icon group'>
        {icon}

        <span className="topbar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
);

const Divider = () => <hr className="topbar-hr"/>;

export default TopBar;