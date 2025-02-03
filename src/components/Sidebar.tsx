import { Menu, FilePlus2, Upload } from 'lucide-react';
import { useContext, useState } from 'react';

import { ChatContext } from '@/providers';

// import RecentChatItem from './RecentChatItem';
// import SidebarMenuItem from './SidebarMenuItem';

const Sidebar = () => {
    const {
        // sendPrompt,
        // setRecentPrompt,
        startNewChat,
        // prevPrompts,
        isGenerating,
    } = useContext(ChatContext);

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebarExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    // const loadPrompt = async (prompt: string) => {
    // 	setRecentPrompt(prompt);
    // 	await sendPrompt(prompt);
    // };

    return (
        <div
            className={`hidden h-screen max-w-60 flex-col justify-between bg-brand-100 px-4 py-6 duration-500 sm:inline-flex ${
                isExpanded ? 'w-60' : 'w-[5.75rem]'
            }`}
        >
            <div>
                <button
                    onClick={toggleSidebarExpand}
                    className='grid place-items-center rounded-full p-3'
                >
                    <Menu size={24} />
                </button>

                <div
                    onClick={!isGenerating ? startNewChat : undefined}
                    className={`mt-12 inline-flex h-12 cursor-pointer items-center gap-4 rounded-full bg-brand-200 p-[0.875rem] text-lg text-brand-450 duration-300 ${
                        isExpanded ? 'w-40' : 'w-11'
                    }`}
                >
                    <FilePlus2 className='min-w-5' size={24} />
                    <p className='line-clamp-1'>New Chat</p>
                </div>

                {/* Submit Video Button */}
                <div
                    className={`mt-4 inline-flex h-12 cursor-pointer items-center gap-4 rounded-full bg-brand-200 p-[0.875rem] text-lg text-brand-450 duration-300 ${
                        isExpanded ? 'w-40' : 'w-11'
                    }`}
                >
                    <Upload className='min-w-5' size={24} />
                    <p className='line-clamp-1'>Submit Video</p>
                </div>

                {/* {isExpanded ? (
                    <div className='animate-fade-in flex flex-col'>
                        <p className='my-4 ml-1'>Recent</p>

                        <div>
                            {prevPrompts
                                .slice()
                                .reverse()
                                .map((prompt, idx) => (
                                    <RecentChatItem
                                        key={`${prompt} - ${idx}`}
                                        onClick={
                                            !isGenerating ? () => loadPrompt(prompt) : undefined
                                        }
                                        label={prompt}
                                    />
                                ))}
                        </div>
                    </div>
                ) : null} */}
            </div>

            {/* <div className='flex flex-col'>
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
            </div> */}
        </div>
    );
};

export default Sidebar;