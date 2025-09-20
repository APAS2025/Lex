import React, { useState, useRef, useEffect } from 'react';
import type { Flashcard, ConversationEntry } from '../types';
import { XIcon, SparklesIcon, PaperAirplaneIcon, ThumbUpIcon, ThumbDownIcon } from './Icons';
import { askAICoach } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';

interface AICoachModalProps {
    isOpen: boolean;
    onClose: () => void;
    card: Flashcard;
}

const AICoachModal: React.FC<AICoachModalProps> = ({ isOpen, onClose, card }) => {
    const [conversation, setConversation] = useState<ConversationEntry[]>([]);
    const [question, setQuestion] = useState('');
    const [isAsking, setIsAsking] = useState(false);
    const conversationEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setConversation([]); // Reset conversation when modal opens
        }
    }, [isOpen]);

    useEffect(() => {
        conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

    const handleAsk = async (e: React.FormEvent) => {
        e.preventDefault();
        const questionText = question.trim();
        if (!questionText || isAsking) return;

        setIsAsking(true);
        setQuestion('');

        const userEntry: ConversationEntry = { id: `conv-${Date.now()}-user`, role: 'user', content: questionText };
        const newConversationState = [...conversation, userEntry];
        const loadingEntry: ConversationEntry = { id: `conv-${Date.now()}-loading`, role: 'loading', content: 'Thinking...' };
        
        setConversation([...newConversationState, loadingEntry]);

        try {
            const answer = await askAICoach(card.front.content, card.back.content, newConversationState);
            setConversation(prev => [
                ...prev.filter(e => e.id !== loadingEntry.id),
                { id: `conv-${Date.now()}-gemini`, role: 'gemini', content: answer }
            ]);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
             setConversation(prev => [
                ...prev.filter(e => e.id !== loadingEntry.id),
                { id: `conv-${Date.now()}-error`, role: 'error', content: errorMessage }
            ]);
        } finally {
            setIsAsking(false);
        }
    };

    const handleFeedback = (id: string, feedback: 'up' | 'down') => {
        setConversation(conv => conv.map(entry => {
            if (entry.id === id) {
                return { ...entry, feedback: entry.feedback === feedback ? undefined : feedback };
            }
            return entry;
        }));
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity"
            onClick={onClose}
        >
            <div 
                className="bg-slate-900 rounded-xl ring-1 ring-white/10 w-full max-w-2xl h-[85vh] flex flex-col relative shadow-2xl shadow-blue-500/10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 flex justify-between items-center border-b border-slate-700/50 shrink-0">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <SparklesIcon className="h-6 w-6 mr-3 text-purple-400" />
                        AI Coach: <span className="text-blue-400 ml-2 truncate">{card.front.content}</span>
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                
                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {/* Initial message */}
                    <div className="flex items-start justify-start">
                        <SparklesIcon className="h-6 w-6 text-purple-400 mr-2 shrink-0 mt-1.5" />
                        <div className="p-3 rounded-lg max-w-md bg-slate-800 text-slate-200">
                           <p>I'm your AI Study Buddy! Ask me anything about this card to understand it better.</p>
                           <p className="mt-2 text-sm text-slate-400">For example: "Explain this like I'm 15" or "Give me a real-world example."</p>
                        </div>
                    </div>

                    {conversation.map((entry) => (
                        <div key={entry.id} className={`flex items-start ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {entry.role === 'gemini' && <SparklesIcon className="h-6 w-6 text-purple-400 mr-2 shrink-0 mt-1.5" />}
                            <div className="flex flex-col">
                                <div className={`p-3 rounded-lg max-w-md ${
                                    entry.role === 'user' ? 'bg-blue-600 text-white' : 
                                    entry.role === 'gemini' ? 'bg-slate-800 text-slate-200' : 
                                    entry.role === 'error' ? 'bg-red-900/50 text-red-300 ring-1 ring-red-500/50' : 
                                    'bg-slate-800 text-slate-400'
                                }`}>
                                    {entry.role === 'loading' ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                                            <span>{entry.content}</span>
                                        </div>
                                    ) : entry.role === 'gemini' ? (
                                        <MarkdownRenderer content={entry.content} />
                                    ) : (
                                        <p className="whitespace-pre-wrap">{entry.content}</p>
                                    )}
                                </div>
                                 {entry.role === 'gemini' && (
                                    <div className="mt-2 flex items-center space-x-2">
                                        <button onClick={() => handleFeedback(entry.id, 'up')} className={`p-1.5 rounded-full transition-colors ${entry.feedback === 'up' ? 'bg-blue-600/50 text-blue-300' : 'text-slate-500 hover:text-blue-400 hover:bg-slate-700'}`} aria-label="Good answer">
                                            <ThumbUpIcon className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleFeedback(entry.id, 'down')} className={`p-1.5 rounded-full transition-colors ${entry.feedback === 'down' ? 'bg-red-600/50 text-red-300' : 'text-slate-500 hover:text-red-400 hover:bg-slate-700'}`} aria-label="Bad answer">
                                            <ThumbDownIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <div ref={conversationEndRef} />
                </div>
                
                <div className="p-4 border-t border-slate-700/50 shrink-0">
                     <form onSubmit={handleAsk}>
                        <div className="relative">
                            <textarea
                                value={question}
                                onChange={e => setQuestion(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleAsk(e);
                                    }
                                }}
                                placeholder="Ask a follow-up question..."
                                className="w-full pl-4 pr-12 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 resize-none transition"
                                rows={1}
                                disabled={isAsking}
                            />
                            <button 
                                type="submit" 
                                disabled={isAsking || !question.trim()} 
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition"
                                aria-label="Send message"
                            >
                                <PaperAirplaneIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AICoachModal;