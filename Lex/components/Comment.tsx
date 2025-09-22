
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// FIX: Added missing type import
import type { Comment as CommentType, User } from '../types';
import { useAuth } from '../context/AuthContext';
import { getTierById } from '../utils/gamification';
// FIX: Added missing icon imports
import { ThumbUpIcon, ArrowUturnUpIcon } from './Icons';

interface CommentProps {
    comment: CommentType;
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


const Comment = ({ comment }: CommentProps) => {
    const { currentUser } = useAuth();
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [likes, setLikes] = useState(comment.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [replies, setReplies] = useState(comment.replies || []);

    const tier = getTierById((comment.user as User).tierId);

    const handleLike = () => {
        setLikes(isLiked ? likes - 1 : likes + 1);
        setIsLiked(!isLiked);
    };

    const handlePostReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        const newReply: CommentType = {
            id: `c-${Date.now()}`,
            user: currentUser,
            // FIX: Added required fields to conform to the Comment type from the database schema.
            user_id: currentUser.id,
            video_id: comment.video_id,
            parent_comment_id: comment.id,
            text: replyText,
            timestamp: new Date().toISOString(),
            likes: 0,
            replies: [],
        };
        
        setReplies([newReply, ...replies]);
        setReplyText('');
        setShowReplyForm(false);
    };

    return (
        <div className="flex items-start space-x-3 sm:space-x-4">
            <Link to={`/profile/${comment.user.id}`}>
                <img src={comment.user.avatarUrl} alt={comment.user.name} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full shrink-0"/>
            </Link>
            <div className="flex-grow">
                <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 flex-wrap">
                            <Link to={`/profile/${comment.user.id}`} className="font-bold text-slate-200 hover:underline">{comment.user.name}</Link>
                            {tier && (
                                <span className="text-xs font-semibold text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded-full ring-1 ring-inset ring-cyan-500/30">
                                    {tier.name}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-400 shrink-0 ml-2">{formatTimestamp(comment.timestamp)}</p>
                    </div>
                    <p className="mt-2 text-slate-300 whitespace-pre-wrap">{comment.text}</p>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-4 mt-2 pl-2">
                    <button 
                        onClick={handleLike} 
                        className={`flex items-center space-x-1.5 text-sm font-semibold transition-colors duration-200 ${isLiked ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}
                        aria-pressed={isLiked}
                    >
                        <ThumbUpIcon className="h-5 w-5" />
                        <span>{likes > 0 ? likes : ''}</span>
                    </button>
                    <button 
                        onClick={() => setShowReplyForm(!showReplyForm)} 
                        className="flex items-center space-x-1.5 text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors duration-200"
                    >
                        <ArrowUturnUpIcon className="h-5 w-5 transform -scale-y-100" />
                        <span>Reply</span>
                    </button>
                </div>

                {/* Reply Form */}
                {showReplyForm && (
                    <div className="flex items-start space-x-3 sm:space-x-4 mt-3">
                        <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-10 w-10 rounded-full shrink-0"/>
                        <form onSubmit={handlePostReply} className="flex-grow">
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder={`Replying to ${comment.user.name}...`}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                                rows={2}
                                autoFocus
                            />
                            <div className="text-right mt-2 space-x-2">
                                <button type="button" onClick={() => setShowReplyForm(false)} className="px-4 py-1.5 text-sm font-semibold text-slate-300 hover:bg-slate-700 rounded-md transition">Cancel</button>
                                <button type="submit" disabled={!replyText.trim()} className="px-4 py-1.5 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed transition">Reply</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Replies */}
                {replies.length > 0 && (
                    <div className="mt-4 space-y-6 border-l-2 border-slate-700/50 pl-4 sm:pl-6">
                        {replies.map(reply => (
                            <Comment key={reply.id} comment={reply} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;
