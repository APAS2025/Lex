import React, { useState, useRef } from 'react';
import type { TermComment, TermDocument } from '../types';
import { currentUser } from '../data/mockData';
import { ChatBubbleLeftRightIcon, PaperClipIcon, ArrowUpTrayIcon, DocumentTextIcon, DocumentDownloadIcon, MegaphoneIcon } from './Icons';
import TermCommentComponent from './TermComment';

interface CommunityContributionsProps {
  initialComments: TermComment[];
  initialDocuments: TermDocument[];
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

const CommunityContributions: React.FC<CommunityContributionsProps> = ({ initialComments, initialDocuments }) => {
    const [activeTab, setActiveTab] = useState<'comments' | 'documents'>('comments');
    const [comments, setComments] = useState(initialComments);
    const [documents, setDocuments] = useState(initialDocuments);
    const [newCommentText, setNewCommentText] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;
        const comment: TermComment = {
            id: `tc-${Date.now()}`,
            user: currentUser,
            text: newCommentText,
            timestamp: new Date().toISOString(),
            replies: [],
        };
        setComments([comment, ...comments]);
        setNewCommentText('');
    };
    
    const handleAddReply = (parentId: string, text: string) => {
        const newReply: TermComment = {
            id: `tc-${Date.now()}`,
            user: currentUser,
            text,
            timestamp: new Date().toISOString(),
            replies: [],
        };

        const addReplyToComment = (commentsList: TermComment[]): TermComment[] => {
            return commentsList.map(comment => {
                if (comment.id === parentId) {
                    return { ...comment, replies: [newReply, ...(comment.replies || [])] };
                }
                if (comment.replies && comment.replies.length > 0) {
                    return { ...comment, replies: addReplyToComment(comment.replies) };
                }
                return comment;
            });
        };

        setComments(prevComments => addReplyToComment(prevComments));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const newDoc: TermDocument = {
            id: `td-${Date.now()}`,
            fileName: file.name,
            fileType: file.type.split('/')[1]?.toUpperCase() || 'File',
            fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            uploadedBy: currentUser,
            timestamp: new Date().toISOString(),
            url: '#', // Placeholder URL
        };
        setDocuments([newDoc, ...documents]);
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const TabButton: React.FC<{tab: 'comments' | 'documents', label: string, icon: React.ReactNode, count: number}> = ({ tab, label, icon, count }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700/50'
            }`}
        >
            {icon}
            <span>{label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab ? 'bg-white/20' : 'bg-slate-700'}`}>{count}</span>
        </button>
    );

    return (
        <div className="bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-900 rounded-2xl ring-1 ring-blue-500/30 shadow-2xl shadow-blue-500/20">
            <div className="p-6">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl mr-5 shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50">
                        <MegaphoneIcon className="h-10 w-10 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-extrabold text-white tracking-tight">Community Contributions</h3>
                        <p className="text-slate-300 mt-1">Share your expertise, ask questions, or contribute relevant documents.</p>
                    </div>
                </div>
                 <div className="border-b border-slate-700/50 mb-6">
                    <div className="flex space-x-2 -mb-px">
                        <TabButton tab="comments" label="Comments" icon={<ChatBubbleLeftRightIcon className="h-5 w-5" />} count={comments.length} />
                        <TabButton tab="documents" label="Documents" icon={<PaperClipIcon className="h-5 w-5" />} count={documents.length} />
                    </div>
                </div>

                {activeTab === 'comments' && (
                    <div>
                        <form onSubmit={handleAddComment} className="flex items-start space-x-3 mb-6">
                            <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-10 w-10 rounded-full shrink-0"/>
                            <div className="flex-grow">
                                <textarea
                                    value={newCommentText}
                                    onChange={(e) => setNewCommentText(e.target.value)}
                                    placeholder="Add a comment or share your experience..."
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 resize-none transition"
                                    rows={2}
                                />
                                <div className="text-right mt-2">
                                    <button type="submit" disabled={!newCommentText.trim()} className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition">Post</button>
                                </div>
                            </div>
                        </form>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                            {comments.map(comment => (
                                <TermCommentComponent key={comment.id} comment={comment} onAddReply={handleAddReply} />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div>
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                        <button onClick={triggerFileSelect} className="w-full flex items-center justify-center space-x-2 py-2.5 bg-slate-700/50 hover:bg-slate-700 font-semibold text-slate-200 rounded-lg transition mb-6">
                            <ArrowUpTrayIcon className="h-5 w-5" />
                            <span>Upload Document</span>
                        </button>
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                            {documents.map(doc => (
                                <div key={doc.id} className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-lg ring-1 ring-slate-700/50">
                                    <DocumentTextIcon className="h-8 w-8 text-sky-400 shrink-0"/>
                                    <div className="flex-grow overflow-hidden">
                                        <p className="font-semibold text-slate-200 truncate text-sm">{doc.fileName}</p>
                                        <p className="text-xs text-slate-400">by {doc.uploadedBy.name} • {doc.fileSize}</p>
                                    </div>
                                    <a href={doc.url} download={doc.fileName} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-md shrink-0 transition" aria-label={`Download ${doc.fileName}`}>
                                        <DocumentDownloadIcon className="h-5 w-5 text-slate-300" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommunityContributions;