
// FIX: Added missing type import
import type { ContactPerson } from '../types';
// FIX: Added missing icon imports
import { MailIcon, UsersIcon } from './Icons';

interface KeyContactsProps {
    contacts: ContactPerson[];
}

const KeyContacts = ({ contacts }: KeyContactsProps) => {
    return (
        <section className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6">
            <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center">
                <UsersIcon className="h-7 w-7 mr-3 text-teal-400"/> Key Contacts
            </h2>
            <div className="space-y-4">
                {contacts.map(contact => (
                    <div key={contact.id} className="group relative bg-slate-900/50 p-4 rounded-lg transition-all duration-300 hover:ring-1 hover:ring-blue-500 hover:scale-105 transform-gpu">
                        <div className="flex items-center space-x-4">
                            <div className="relative shrink-0">
                                <img src={contact.avatarUrl} alt={contact.name} className="h-12 w-12 rounded-full object-cover"/>
                                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-slate-900" title="Online"></span>
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-bold text-slate-100">{contact.name}</h4>
                                <p className="text-sm text-slate-400">{contact.title}</p>
                            </div>
                        </div>
                        <a 
                            href={`mailto:${contact.email}`} 
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            aria-label={`Send email to ${contact.name}`}
                        >
                            <MailIcon className="h-5 w-5 mr-2"/>
                            Send Email
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default KeyContacts;
