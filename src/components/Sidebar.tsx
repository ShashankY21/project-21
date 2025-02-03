import { Menu, FilePlus2, Upload } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '@/providers';

const Sidebar = () => {
    const { startNewChat } = useContext(ChatContext);
    const [isExpanded, setIsExpanded] = useState(true);
    const navigate = useNavigate();

    return (
        <div className={`hidden h-screen flex-col justify-between bg-brand-100 px-4 py-6 duration-500 sm:flex ${
            isExpanded ? 'w-60' : 'w-20'
        }`}>
            <div>
                {/* Menu Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className='grid h-10 w-10 place-items-center rounded-full p-2 hover:bg-brand-400'
                >
                    <Menu size={24} />
                </button>

                {/* New Chat Button */}
                <div
                    onClick={() => {
                        startNewChat();
                        navigate('/');
                    }}
                    className={`mt-12 flex h-12 cursor-pointer items-center gap-4 rounded-full bg-brand-400 p-3 text-brand-450 duration-300 ${
                        isExpanded ? 'w-full px-4' : 'w-12 justify-center'
                    }`}
                >
                    <FilePlus2 className='min-w-[24px]' size={24} />
                    {isExpanded && (
                        <span className='whitespace-nowrap text-lg'>New Chat</span>
                    )}
                </div>

                {/* Submit Video Button - Only shown when expanded */}
                {isExpanded && (
                    <div
                        onClick={() => navigate('/submit-video')}
                        className='mt-4 flex h-12 w-full cursor-pointer items-center gap-4 rounded-full bg-brand-400 px-4 p-3 text-brand-450 duration-300'
                    >
                        <Upload className='min-w-[24px]' size={24} />
                        <span className='whitespace-nowrap text-lg'>Submit Video</span>
                    </div>
                )}

                {/* { <div className='flex flex-col'>
                {[
                    { label: 'Activity', icon: History },
                    { label: 'Help', icon: CircleHelp },
                    { label: 'Settings', icon: Settings },
                ].map(({ label, icon }, idx) => (
                    <SidebarMenuItem
                        key={idx}
                        Icon={icon}
                        label={label}
                        isExpanded={isExpanded}
                    />
                ))}
            </div> } */}
            </div>
        </div>
    );
};

export default Sidebar;