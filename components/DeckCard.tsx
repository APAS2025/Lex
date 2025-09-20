import React from 'react';
import { Link } from 'react-router-dom';
import type { FlashcardDeck } from '../types';
import { ClipboardListIcon } from './Icons';

const DeckCard: React.FC<{ deck: FlashcardDeck }> = ({ deck }) => {
    return (
        <Link 
            to={`/academy/deck/${deck.id}`} 
            className="block w-64 md:w-72 shrink-0 group relative overflow-hidden rounded-lg shadow-lg"
        >
            <div className="aspect-video bg-slate-800">
                <img 
                    src={deck.coverImageUrl} 
                    alt={deck.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
                 <h3 className="text-white font-bold truncate leading-tight">{deck.title}</h3>
                 <div className="flex items-center text-xs text-slate-300 mt-1">
                    <ClipboardListIcon className="h-4 w-4 mr-1.5" />
                    <span>{deck.cardIds.length} Cards</span>
                 </div>
            </div>
        </Link>
    );
};

export default DeckCard;
