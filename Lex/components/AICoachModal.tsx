
import React, { useState, useRef, useEffect } from 'react';
// FIX: Added missing type imports
import type { Flashcard, ConversationEntry } from '../types';
// FIX: Added missing icon imports
import { XIcon, SparklesIcon, PaperAirplaneIcon, ThumbUpIcon, ThumbDownIcon } from './Icons';
import { askAICoach } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';

interface AICoachModalProps {
    isOpen: boolean;
    onClose: () => void;
    card: Flashcard;
}

const AICoachModal = ({ isOpen, onClose, card }: AICoachModalProps) => {
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
        const loadingEntry: ConversationEntry = { id: `conv-${Date.now()}-loading`, role: 'loading', content: 'Coach is thinking...' };
        
        setConversation([...newConversationState, loadingEntry]);

        try {
            const answer = await askAICoach(card.front.content, card.back.content, newConversationState);
            const geminiEntry: ConversationEntry = { id: `conv-${Date.now()}-gemini`, role: 'gemini', content: answer };
            setConversation(prev => [
                ...prev.filter(e => e.id !== loadingEntry.id),
                geminiEntry
            ]);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            const errorEntry: ConversationEntry = { id: `conv-${Date.now()}-error`, role: 'error', content: errorMessage };
            setConversation(prev => [
                ...prev.filter(e => e.id !== loadingEntry.id),
                errorEntry
            ]);
        } finally {
            setIsAsking(false);
        }
    };
    
    const handleFeedback = (id: string, feedback: 'up' | 'down') => {
        setConversation(conv => conv.map(entry => {
            if (entry.id === id) {
                // Toggle off if same feedback is clicked again
                return { ...entry, feedback: entry.feedback === feedback ? undefined : feedback };
            }
            return entry;
        }));
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-slate-800 rounded-xl ring-1 ring-white/10 w-full max-w-2xl h-[80vh] flex flex-col relative shadow-2xl shadow-purple-500/10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 flex justify-between items-center border-b border-slate-700/50 shrink-0">
                    <div className="flex items-center space-x-3">
                        <SparklesIcon className="h-6 w-6 text-purple-400" />
                        <h2 className="text-xl font-bold text-white">AI Coach</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                
                <div className="p-4 bg-slate-900/50 text-center text-sm">
                    <p className="text-slate-300">Topic: <span className="font-semibold text-blue-300">{card.front.content}</span></p>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {conversation.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <SparklesIcon className="h-12 w-12 text-slate-600 mb-4" />
                            <h3 className="text-lg font-semibold text-slate-200">Ask me anything!</h3>
                            <p className="text-slate-400">Want an example, a simpler explanation, or a deep dive? Just ask.</p>
                        </div>
                    ) : (
                        conversation.map((entry) => (
                            <div key={entry.id} className={`flex items-start gap-3 ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {entry.role === 'gemini' && <SparklesIcon className="h-6 w-6 text-purple-400 shrink-0 mt-1.5" />}
                                <div className="flex flex-col">
                                    <div className={`p-3 rounded-lg max-w-md ${
                                        entry.role === 'user' ? 'bg-blue-600 text-white' : 
                                        entry.role === 'gemini' ? 'bg-slate-700/50 text-slate-200' : 
                                        entry.role === 'error' ? 'bg-red-900/50 text-red-300 ring-1 ring-red-500/50' : 
                                        'bg-slate-700/50 text-slate-400'
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
                        ))
                    )}
                    <div ref={conversationEndRef} />
                </div>

                <form onSubmit={handleAsk} className="p-4 border-t border-slate-700/50 shrink-0">
                    <div className="relative">
                        <input
                            type="text"
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                            placeholder="Ask a follow-up question..."
                            className="w-full pl-4 pr-12 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 transition"
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
    );
};

export default AICoachModal;
