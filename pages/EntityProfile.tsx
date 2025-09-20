import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ecosystemEntities as initialEntities } from '../data/ecosystemData';
import { users } from '../data/mockData';
import { ChevronLeftIcon, StarIcon, CheckIcon, PencilIcon, CheckBadgeIcon } from '../components/Icons';
import { useAuth } from '../context/AuthContext';
import ClaimProfileModal from '../components/ClaimProfileModal';
import type { EcosystemEntity } from '../types';

const EntityProfile: React.FC = () => {
    const { entityId } = useParams<{ entityId: string }>();
    const { currentUser } = useAuth();
    
    // Use state to manage entities so we can update the 'isClaimed' status
    const [entities, setEntities] = useState<EcosystemEntity[]>(initialEntities);
    const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

    const entity = useMemo(() => entities.find(e => e.id === entityId), [entities, entityId]);
    const claimedByUser = useMemo(() => {
        if (!entity || !entity.isClaimed || !entity.claimedByUserId) return null;
        return users.find(u => u.id === entity.claimedByUserId);
    }, [entity]);

    const handleClaimSuccess = () => {
        setEntities(prevEntities =>
            prevEntities.map(e =>
                e.id === entityId ? { ...e, isClaimed: true, claimedByUserId: currentUser.id } : e
            )
        );
        setIsClaimModalOpen(false);
    };

    if (!entity) {
        return (
            <div className="text-center container mx-auto">
                <h2 className="text-2xl font-bold text-slate-100">Entity not found</h2>
                <Link to="/ecosystem" className="mt-4 inline-block text-blue-400 hover:underline">
                    Back to Ecosystem
                </Link>
            </div>
        );
    }
    
    const isManagedByCurrentUser = entity.isClaimed && entity.claimedByUserId === currentUser.id;

    const ClaimedView: React.FC = () => (
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl ring-2 ring-green-500/50 p-8 text-center max-w-3xl mx-auto shadow-2xl shadow-green-500/10">
            <CheckBadgeIcon className="h-12 w-12 text-green-400 mx-auto mb-4"/>
            <h2 className="text-3xl font-extrabold text-white mb-3">Profile Claimed</h2>
            {claimedByUser ? (
                 <p className="text-slate-300 mb-6">
                    This profile is managed by <span className="font-bold text-white">{claimedByUser.name}</span>.
                </p>
            ) : (
                 <p className="text-slate-300 mb-6">This profile has been claimed and is pending content updates.</p>
            )}
           
            {isManagedByCurrentUser && (
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 text-lg transform-gpu transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 inline-flex items-center space-x-2">
                    <PencilIcon className="h-5 w-5"/>
                    <span>Edit Profile</span>
                </button>
            )}
        </div>
    );

    const UnclaimedView: React.FC = () => (
         <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl ring-2 ring-blue-500/50 p-8 text-center max-w-3xl mx-auto shadow-2xl shadow-blue-500/20">
            <StarIcon className="h-12 w-12 text-blue-400 mx-auto mb-4"/>
            <h2 className="text-3xl font-extrabold text-white mb-3">Is This Your Organization?</h2>
            <p className="text-slate-300 mb-6">
                Claim this profile for free to manage your information, connect with the community, and unlock powerful features.
            </p>
            <ul className="text-left text-slate-300 space-y-3 list-none max-w-md mx-auto mb-8">
                <li className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 shrink-0" />
                    <span>Showcase key contacts, technical documents, and performance metrics.</span>
                </li>
                <li className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 shrink-0" />
                    <span>Generate qualified leads from industry professionals actively seeking solutions.</span>
                </li>
                <li className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 shrink-0" />
                    <span>Host live expert sessions on Droobi TV to showcase your thought leadership.</span>
                </li>
            </ul>
            <button 
                onClick={() => setIsClaimModalOpen(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 text-lg transform-gpu transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
            >
                Claim This Profile
            </button>
            <p className="text-xs text-slate-500 mt-4">Claiming requires verification using an official company email address.</p>
        </div>
    );

    return (
        <div className="container mx-auto">
            <Link to="/ecosystem" className="inline-flex items-center mb-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Back to Ecosystem Directory
            </Link>

            {/* Entity Header */}
            <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-8 mb-8 flex flex-col md:flex-row items-center md:space-x-8 text-center md:text-left">
                <img src={entity.logoUrl} alt={`${entity.name} logo`} className="h-32 w-32 object-contain rounded-lg bg-white p-2 shrink-0 mb-6 md:mb-0" />
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">{entity.name}</h1>
                    <p className="mt-2 text-lg text-slate-400">{entity.tagline}</p>
                </div>
            </div>

            {entity.isClaimed ? <ClaimedView /> : <UnclaimedView />}
            
            <ClaimProfileModal
                isOpen={isClaimModalOpen}
                onClose={() => setIsClaimModalOpen(false)}
                entity={entity}
                onClaimSuccess={handleClaimSuccess}
            />
        </div>
    );
};

export default EntityProfile;