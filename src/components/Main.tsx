import { Loader, SendHorizonal, UserRound } from 'lucide-react';
import { useContext } from 'react';
import { ChatContext } from '@/providers';

const Main = () => {
    const {
        sendPrompt,
        setPrompt,
        // recentPrompt,
        prompt,
        // isPending,
        isGenerating,
        // output,
        showResult,
    } = useContext(ChatContext);

    const handleSendPrompt = () => {
        if (prompt.trim()) sendPrompt(prompt);
    };

    return (
        <div className='relative h-screen flex-1 pb-[2vh]'>
            <nav className='flex items-center justify-end px-5 py-[1.375rem] text-base font-light text-brand-300'>
                <div className='grid h-10 w-10 place-items-center rounded-full bg-brand-100'>
                    <UserRound className='min-w-4' size={16} />
                </div>
            </nav>

            <div className='mx-auto max-w-[55rem]'>
                {!showResult ? (
                    <div className='no-scrollbar h-[calc(100vh-5.25rem)] overflow-y-scroll px-[5%]'>
                        <div className='flex h-3/4 items-center justify-center pt-10'>
                            <p className='text-6xl font-medium text-brand-400'>
                                <span className='bg-gradient-to-br from-[#4285f4] via-[#9b72cb] to-[#d96570] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'>
                                    Glimpse
                                </span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='no-scrollbar h-[calc(100vh-5.25rem)] overflow-y-scroll px-[5%] pb-40'>
                        {/* ... existing chat content ... */}
                    </div>
                )}

                <div className='absolute bottom-1/3 mx-auto w-full max-w-[55rem] px-5 pt-2 backdrop-blur-sm'>
                    <div className='flex items-center justify-between gap-5 rounded-full bg-brand-100 px-5 py-3'>
                        <input
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
                            className='flex-1 border-none bg-transparent text-black outline-none'
                            type='text'
                            placeholder='Enter a prompt here'
                            value={prompt}
                            disabled={isGenerating}
                        />

                        <div className='flex items-center gap-2 text-brand-400'>
                            {isGenerating ? (
                                <Loader className='min-w-4 animate-spin' size={20} />
                            ) : (
                                <SendHorizonal
                                    onClick={handleSendPrompt}
                                    className={`min-w-4 cursor-pointer ${
                                        prompt ? 'text-black' : 'text-gray-400'
                                    }`}
                                    size={20}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;