import React from 'react';
import { FaPlus, FaHorse } from 'react-icons/fa';


const SideBar: React.FC = () => {
    return (
        <div className='fixed top-0 left-0 flex flex-col w-16 h-screen m-0 text-white shadow-lg bg-primary'>
            <SideBarIcon icon={<FaHorse size="28"/>} text='Home'/>
            <Divider />
            <SideBarIcon icon={<FaPlus size="22"/>} text='Add'/>
        </div>
    );
};


type SideBarIconProps = {
    icon: React.ReactNode;
    text?: string;
}

const SideBarIcon = ({ icon, text = 'tooltip 💡'}: SideBarIconProps) => (
    <div className='sidebar-icon group'>
        {icon}

        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
);

const Divider = () => <hr className="sidebar-hr"/>;

export default SideBar;