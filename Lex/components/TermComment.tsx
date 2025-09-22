
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// FIX: Added missing type import
import type { TermComment, User } from '../types';
import { useAuth } from '../context/AuthContext';
import { getTierById } from '../utils/gamification';
// FIX: Added missing icon import
import { ArrowUturnUpIcon } from './Icons';

interface TermCommentProps {
    comment: TermComment;
    onAddReply: (parentId: string, text: string) => void;
}

const formatTimestamp = (timestamp: string): string => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const diffSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);

    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return commentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const TermCommentComponent = ({ comment, onAddReply }: TermCommentProps) => {
    const { currentUser } = useAuth();
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');

    const tier = getTierById((comment.user as User).tierId);

    const handlePostReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        onAddReply(comment.id, replyText);
        setReplyText('');
        setShowReplyForm(false);
    };

    return (
        <div className="flex items-start space-x-3">
            <Link to={`/profile/${comment.user.id}`}>
                <img src={comment.user.avatarUrl} alt={comment.user.name} className="h-10 w-10 rounded-full shrink-0"/>
            </Link>
            <div className="flex-grow">
                <div className="bg-slate-900/50 p-3 rounded-lg ring-1 ring-slate-700/50">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 flex-wrap">
                            <Link to={`/profile/${comment.user.id}`} className="font-bold text-slate-200 text-sm hover:underline">{comment.user.name}</Link>
                            {tier && (
                                <span className="text-xs font-semibold text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded-full ring-1 ring-inset ring-cyan-500/30">
                                    {tier.name}
                                </span>
                            )}
                        </div>
                        <span className="text-xs text-slate-400 shrink-0 ml-2">{formatTimestamp(comment.timestamp)}</span>
                    </div>
                    <p className="text-slate-300 mt-1 text-sm whitespace-pre-wrap">{comment.text}</p>
                </div>
                <div className="mt-2 pl-2">
                    <button 
                        onClick={() => setShowReplyForm(!showReplyForm)}
                        className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        <ArrowUturnUpIcon className="h-4 w-4 transform -scale-y-100" />
                        <span>Reply</span>
                    </button>
                </div>

                {showReplyForm && (
                     <form onSubmit={handlePostReply} className="flex items-start space-x-3 mt-3">
                        <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-8 w-8 rounded-full shrink-0"/>
                        <div className="flex-grow">
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder={`Replying to ${comment.user.name}...`}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 resize-none transition"
                                rows={2}
                                autoFocus
                            />
                            <div className="text-right mt-2 space-x-2">
                                <button type="button" onClick={() => setShowReplyForm(false)} className="px-3 py-1 text-xs font-semibold text-slate-300 hover:bg-slate-700 rounded-md transition">Cancel</button>
                                <button type="submit" disabled={!replyText.trim()} className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition">Reply</button>
                            </div>
                        </div>
                    </form>
                )}
                
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4 border-l-2 border-slate-700/50 pl-4">
                        {comment.replies.map(reply => (
                            <TermCommentComponent key={reply.id} comment={reply} onAddReply={onAddReply} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TermCommentComponent;
