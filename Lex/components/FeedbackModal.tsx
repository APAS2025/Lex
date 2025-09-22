
import { useState, type FormEvent } from 'react';
import { XIcon, CheckIcon } from './Icons';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    termName: string;
}

const FeedbackModal = ({ isOpen, onClose, termName }: FeedbackModalProps) => {
    const [feedbackType, setFeedbackType] = useState('Suggestion');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSubmitting(true);
        // Simulate an API call
        setTimeout(() => {
            console.log({ termName, feedbackType, message, email });
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1000);
    };
    
    const handleClose = () => {
        if (isSubmitting) return;
        // Reset state before closing
        setTimeout(() => {
            setIsSubmitted(false);
            setMessage('');
            setEmail('');
            setFeedbackType('Suggestion');
        }, 200); // allow for fade-out animation
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-slate-800 rounded-xl ring-1 ring-white/10 w-full max-w-lg relative shadow-2xl shadow-blue-500/10 transform transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors" aria-label="Close">
                    <XIcon className="h-6 w-6" />
                </button>

                {isSubmitted ? (
                    <div className="p-8 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 mb-4">
                           <CheckIcon className="h-6 w-6 text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
                        <p className="text-slate-400 mb-6">Your feedback has been submitted. We appreciate you helping us improve The Language of Water.</p>
                        <button
                            onClick={handleClose}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Provide Feedback</h2>
                            <p className="text-slate-400 mb-6">Your insights on <span className="font-semibold text-blue-400">{termName}</span> are valuable.</p>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="feedbackType" className="block text-sm font-medium text-slate-300">Feedback Type</label>
                                    <select
                                        id="feedbackType"
                                        value={feedbackType}
                                        onChange={(e) => setFeedbackType(e.target.value)}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm text-white"
                                    >
                                        <option>Suggestion</option>
                                        <option>Correction</option>
                                        <option>Question</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        placeholder="Please provide details..."
                                        className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm text-white resize-none"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email (Optional)</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your.email@example.com"
                                        className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm text-white"
                                    />
                                    <p className="mt-1 text-xs text-slate-500">We'll only use this to follow up on your feedback.</p>
                                </div>
                            </form>
                        </div>
                        <div className="px-8 py-4 bg-slate-900/50 rounded-b-xl flex justify-end items-center space-x-3">
                             <button
                                type="button"
                                onClick={handleClose}
                                className="px-6 py-2 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition"
                            >
                                Cancel
                            </button>
                             <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isSubmitting || !message.trim()}
                                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 transition"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FeedbackModal;
