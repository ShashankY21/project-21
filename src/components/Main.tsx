import { Loader, SendHorizonal, UserRound } from 'lucide-react';
import { useContext, useState } from 'react';
import { ChatContext } from '@/providers';

const Main = () => {
    const {
        sendPrompt,
        setPrompt,
        recentPrompt,
        prompt,
        isPending,
        isGenerating,
        output,
        showResult,
        // startNewChat, // Ensure this is imported from context
    } = useContext(ChatContext);

    const [hasResponse, setHasResponse] = useState(false);

    const handleSendPrompt = () => {
        if (prompt.trim()) {
            sendPrompt(prompt);
            if (!hasResponse) setHasResponse(true);
        }
    };

    return (
        <div className='relative h-screen flex-1 pb-[5vh]'>
            <nav className='flex items-center justify-end px-5 py-[1.375rem] text-base font-light text-brand-300'>
                <div className='grid h-10 w-10 place-items-center rounded-full bg-brand-100'>
                    <UserRound className='min-w-4' size={16} />
                </div>
            </nav>

            <div className='mx-auto max-w-[55rem] h-full flex flex-col'>
                {!showResult ? (
                    <div className='flex-1 flex flex-col items-center justify-center'>
                        <p className='text-6xl font-medium mb-20' style={{
                            background: 'linear-gradient(180deg, #1d73f3 28%, #ff985e 91%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            opacity: 0.78
                        }}>
                            Glimpse
                        </p>
                        
                        <div className={`absolute bottom-32 w-full max-w-[55rem] px-5 transition-all duration-300`}>
                            <div className='flex items-center justify-between gap-5 rounded-full bg-brand-100 px-5 py-4 h-14'>
                                <input
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
                                    className='flex-1 h-full border-none bg-transparent text-black outline-none'
                                    type='text'
                                    placeholder='Enter a prompt here'
                                    value={prompt}
                                    disabled={isGenerating}
                                />
                                <SendHorizonal
                                    onClick={handleSendPrompt}
                                    className={`min-w-4 cursor-pointer ${
                                        prompt ? 'text-blue-500' : 'text-gray-400'
                                    }`}
                                    size={20}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='no-scrollbar flex-1 overflow-y-auto px-[5%] pb-40'>
                        <div className='flex flex-col gap-8 pt-8'>
                            {/* User Prompt Bubble */}
                            <div className='flex justify-end'>
                                <div 
                                    className='max-w-[80%] rounded-bl-3xl rounded-br-3xl rounded-tl-3xl p-4' 
                                    style={{ backgroundColor: '#dae5f4' }}
                                >
                                    <p className='text-black'>{recentPrompt}</p>
                                </div>
                            </div>

                            {/* Bot Response Bubble */}
                            <div className='flex justify-start'>
                                <div 
                                    className='max-w-[80%] rounded-bl-3xl rounded-br-3xl rounded-tr-3xl p-4' 
                                    style={{ backgroundColor: 'rgba(218, 229, 244, 0.5)' }}
                                >
                                    {isPending ? (
                                        <div className='flex flex-col gap-2'>
                                            <div className='h-4 w-full animate-pulse rounded bg-gray-200'/>
                                            <div className='h-4 w-4/5 animate-pulse rounded bg-gray-200'/>
                                            <div className='h-4 w-3/5 animate-pulse rounded bg-gray-200'/>
                                        </div>
                                    ) : (
                                        <p dangerouslySetInnerHTML={{ __html: output }} />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='absolute bottom-20 w-full max-w-[55rem] px-5 pt-4 backdrop-blur-sm'>
                            <div className='flex items-center justify-between gap-5 rounded-full bg-brand-100 px-5 py-4 h-14'>
                                <input
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
                                    className='flex-1 h-full border-none bg-transparent text-black outline-none'
                                    type='text'
                                    placeholder='Enter a prompt here'
                                    value={prompt}
                                    disabled={isGenerating}
                                />
                                {isGenerating ? (
                                    <Loader className='min-w-4 animate-spin' size={20} />
                                ) : (
                                    <SendHorizonal
                                        onClick={handleSendPrompt}
                                        className={`min-w-4 cursor-pointer ${
                                            prompt ? 'text-blue-500' : 'text-gray-400'
                                        }`}
                                        size={20}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;