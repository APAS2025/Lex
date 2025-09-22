
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ConversationEntry } from '../types';
import { askManual } from '../services/geminiService';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { 
    ChevronLeftIcon, 
    DocumentDownloadIcon, 
    SparklesIcon,
    WrenchScrewdriverIcon,
    QuestionMarkCircleIcon,
    ClipboardListIcon,
    PaperAirplaneIcon,
    ThumbUpIcon,
    ThumbDownIcon,
} from '../components/Icons';

const suggestedQuestions = [
    "What are the main safety precautions?",
    "List the steps for routine maintenance.",
    "What is the part number for the main filter?",
    "How do I troubleshoot a power failure error?",
];

const ManualDetail = () => {
    const { manualId } = useParams<{ manualId: string }>();
    const { manuals, vendors } = useAuth();
    const [question, setQuestion] = useState('');
    const [isAsking, setIsAsking] = useState(false);
    const [conversation, setConversation] = useState<ConversationEntry[]>([]);
    const conversationEndRef = useRef<HTMLDivElement>(null);

    const manual = useMemo(() => manuals.find(m => m.id === manualId), [manualId, manuals]);
    const vendor = useMemo(() => manual ? vendors.find(v => v.id === manual.vendorId) : undefined, [manual, vendors]);

    useEffect(() => {
        conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);
    
    const handleAsk = async (questionText: string) => {
        if (!questionText.trim() || isAsking || !manual) return;

        setIsAsking(true);
        setQuestion('');
        
        const userEntry: ConversationEntry = { id: `conv-${Date.now()}-user`, role: 'user', content: questionText };
        const loadingEntry: ConversationEntry = { id: `conv-${Date.now()}-loading`, role: 'loading', content: 'Reading the manual...' };
        
        setConversation(prev => [...prev, userEntry, loadingEntry]);

        try {
            const answer = await askManual(manual.summary, questionText);
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

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAsk(question);
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


    if (!manual || !vendor) {
        return (
            <div className="text-center container mx-auto">
                <h2 className="text-2xl font-bold">Manual not found</h2>
                <Link to="/manuals" className="text-blue-400 hover:underline mt-4 inline-flex items-center">
                    <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    Back to Manuals Library
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <Link to="/manuals" className="inline-flex items-center mb-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Back to Manuals Library
            </Link>

            {/* Manual Header */}
            <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6 md:p-8 mb-8">
                <div className="md:flex items-center md:space-x-6">
                    <img src={vendor.logoUrl} alt={vendor.name} className="h-20 w-20 object-contain rounded-lg bg-white p-1.5 shrink-0 mb-4 md:mb-0" />
                    <div>
                        <p className="text-lg font-semibold text-blue-400">{vendor.name}</p>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100">{manual.title}</h1>
                        <p className="mt-1 text-md text-slate-400">Model: {manual.modelNumber} {manual.partNumber && `• Part: ${manual.partNumber}`}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: PDF Viewer */}
                <div className="space-y-6">
                    <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 h-[80vh] flex flex-col">
                        <div className="p-4 border-b border-slate-700/50 text-center font-semibold text-slate-300">
                            Document Viewer
                        </div>
                        <div className="flex-grow p-4 flex items-center justify-center">
                             <img 
                                src={manual.coverImageUrl} 
                                alt="Manual Preview" 
                                className="w-full h-full object-contain p-4 opacity-50"
                            />
                            <p className="absolute text-slate-400 text-lg font-semibold">Interactive Viewer Placeholder</p>
                        </div>
                    </div>
                    <a href={manual.fileUrl} download className="w-full flex items-center justify-center text-center px-6 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition">
                        <DocumentDownloadIcon className="h-6 w-6 mr-2" />
                        Download PDF Manual
                    </a>
                </div>

                {/* Right Column: Interactive Panel */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-slate-900 to-blue-900/30 rounded-2xl ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/20 p-6 flex flex-col h-[calc(80vh+48px)]">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center shrink-0">
                            <QuestionMarkCircleIcon className="h-7 w-7 mr-3 text-blue-300" />
                            Interact with this Manual
                        </h3>
                        
                        {/* Suggested Questions Area */}
                        <div className="mb-4 shrink-0">
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Suggested Questions</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {suggestedQuestions.map((sq, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => handleAsk(sq)}
                                        disabled={isAsking}
                                        className="text-left text-sm p-3 bg-slate-800/60 hover:bg-slate-800 rounded-lg transition text-slate-300 disabled:opacity-50"
                                    >
                                        {sq}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Conversation Area */}
                        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-4 border-t border-slate-700/50 pt-4">
                            {conversation.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-slate-500 italic">Ask a question to begin...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                {conversation.map((entry) => (
                                    <div key={entry.id} className={`flex items-start ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {entry.role === 'gemini' && <SparklesIcon className="h-6 w-6 text-purple-400 mr-2 shrink-0 mt-1.5" />}
                                        <div className="flex flex-col">
                                            <div className={`p-3 rounded-lg max-w-sm ${
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
                                ))}
                                <div ref={conversationEndRef} />
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleFormSubmit} className="mt-4 shrink-0">
                            <div className="relative">
                                <textarea
                                    value={question}
                                    onChange={e => setQuestion(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleFormSubmit(e);
                                        }
                                    }}
                                    placeholder="Ask a follow-up question..."
                                    className="w-full px-4 py-3 pr-12 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 resize-none transition"
                                    rows={2}
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

                    <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6">
                        <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center">
                            <WrenchScrewdriverIcon className="h-7 w-7 mr-3 text-cyan-400" />
                            AI-Extracted Maintenance
                        </h3>
                         <div className="text-center text-slate-400 py-8 border-2 border-dashed border-slate-700 rounded-lg">
                            <ClipboardListIcon className="h-10 w-10 mx-auto text-slate-600 mb-2"/>
                            <p className="font-semibold">Preventative Maintenance Schedule</p>
                            <p className="text-sm">This feature is coming soon.</p>
                            <p className="text-xs mt-2">Gemini will automatically extract tasks and schedules from the manual.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManualDetail;
