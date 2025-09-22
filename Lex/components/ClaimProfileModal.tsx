
import { useState } from 'react';
import type { EcosystemEntity } from '../types';
import { useAuth } from '../context/AuthContext';
import { XIcon, CheckIcon, ShieldCheckIcon } from './Icons';

interface ClaimProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    entity: EcosystemEntity;
    onClaimSuccess: () => void;
}

const ClaimProfileModal = ({ isOpen, onClose, entity, onClaimSuccess }: ClaimProfileModalProps) => {
    const { currentUser } = useAuth();
    const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleClaim = () => {
        setStatus('verifying');
        setErrorMessage('');

        const userEmailDomain = currentUser.email.split('@')[1];

        // Simulate API call and verification
        setTimeout(() => {
            if (userEmailDomain === entity.domain) {
                setStatus('success');
                setTimeout(() => {
                    onClaimSuccess();
                }, 1500); // Wait a bit on success message before closing
            } else {
                setErrorMessage(`Your email domain (@${userEmailDomain}) does not match this organization's required domain (@${entity.domain}). Please log in with a valid company email.`);
                setStatus('error');
            }
        }, 1000);
    };
    
    const handleClose = () => {
        if (status === 'verifying') return;
        // Reset state on close
        setTimeout(() => {
           setStatus('idle');
           setErrorMessage('');
        }, 200);
        onClose();
    }

    if (!isOpen) return null;

    const renderContent = () => {
        switch (status) {
            case 'success':
                return (
                    <div className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 mb-4">
                           <CheckIcon className="h-6 w-6 text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Verification Successful!</h3>
                        <p className="text-slate-400">You have successfully claimed the profile for {entity.name}.</p>
                    </div>
                );
            default:
                return (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-2">Confirm Your Identity</h2>
                        <p className="text-slate-400 mb-6">You are claiming the profile for <span className="font-semibold text-blue-400">{entity.name}</span>.</p>
                        
                        <div className="space-y-4 bg-slate-900/50 p-4 rounded-lg ring-1 ring-slate-700/50">
                            <div>
                                <label className="block text-xs font-medium text-slate-400">Your Name</label>
                                <input type="text" value={currentUser.name} disabled className="mt-1 w-full bg-slate-800 text-slate-200 p-2 rounded-md border border-slate-600" />
                            </div>
                             <div>
                                <label className="block text-xs font-medium text-slate-400">Verification Email</label>
                                <input type="email" value={currentUser.email} disabled className="mt-1 w-full bg-slate-800 text-slate-200 p-2 rounded-md border border-slate-600" />
                            </div>
                        </div>

                        {errorMessage && (
                            <p className="mt-4 text-sm text-red-400 bg-red-900/50 p-3 rounded-md">{errorMessage}</p>
                        )}

                        <p className="mt-4 text-xs text-slate-500 flex items-start space-x-2">
                            <ShieldCheckIcon className="h-5 w-5 mt-0.5 shrink-0" />
                            <span>For security, we will verify that your email domain matches the one associated with this organization.</span>
                        </p>
                    </>
                );
        }
    }

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
                
                <div className="p-8">
                   {renderContent()}
                </div>

                {status !== 'success' && (
                     <div className="px-8 py-4 bg-slate-900/50 rounded-b-xl flex justify-end items-center space-x-3">
                         <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-2 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition"
                        >
                            Cancel
                        </button>
                         <button
                            type="button"
                            onClick={handleClaim}
                            disabled={status === 'verifying'}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 transition"
                        >
                            {status === 'verifying' ? 'Verifying...' : 'Confirm & Claim'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClaimProfileModal;
