import { createContext, useState, useRef, useCallback } from 'react';
import { runChat } from '@/libs/gemini';

type ChatContextProps = {
    sendPrompt: (prompt: string) => Promise<void>;
    setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
    setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
    startNewChat: () => void;
    prevPrompts: string[];
    recentPrompt: string;
    prompt: string;
    isPending: boolean;
    isGenerating: boolean;
    output: string;
    showResult: boolean;
};

export const ChatContext = createContext<ChatContextProps>({} as ChatContextProps);

export const ChatContextProvider = ({ children }: React.PropsWithChildren) => {
    const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prompt, setPrompt] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [output, setOutput] = useState('');
    const [showResult, setShowResult] = useState(false);
    const typingTimeout = useRef<NodeJS.Timeout[]>([]);

    const startNewChat = useCallback(() => {
        setRecentPrompt('');
        setOutput('');
        setPrompt('');
        setIsPending(false);
        setIsGenerating(false);
        setShowResult(false);
        typingTimeout.current.forEach(clearTimeout);
        typingTimeout.current = [];
    }, []);

    const sendPrompt = useCallback(async (prompt: string) => {
        try {
            setIsGenerating(true);
            setIsPending(true);
            setRecentPrompt(prompt);
            setShowResult(true);

            setPrevPrompts(prev => [...prev.filter(p => p !== prompt), prompt]);

            const { data, error } = await runChat(prompt);
            if (error) throw new Error(error);

            const formattedResponse = data!
                .split('**')
                .map((word, idx) => idx % 2 ? `<strong>${word}</strong>` : word)
                .join('')
                .split('*')
                .join('<br />');

            setOutput('');
            const words = formattedResponse.split(' ');
            
            typingTimeout.current = words.map((word, idx) => 
                setTimeout(() => {
                    setOutput(prev => prev + word + ' ');
                }, 40 * idx)
            );

        } catch (error) {
            setOutput(`<span class="text-red-500">${
                error instanceof Error ? error.message : 'An error occurred'
            }</span>`);
        } finally {
            setIsPending(false);
            setIsGenerating(false);
        }
    }, []);

    return (
        <ChatContext.Provider
            value={{
                sendPrompt,
                setPrevPrompts,
                setRecentPrompt,
                setPrompt,
                startNewChat,
                prevPrompts,
                recentPrompt,
                prompt,
                isPending,
                isGenerating,
                output,
                showResult,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};