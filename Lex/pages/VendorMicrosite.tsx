
import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronLeftIcon } from '../components/Icons';

const VendorMicrosite = () => {
    const { vendorId } = useParams<{ vendorId: string }>();
    const { vendors, terms } = useAuth();
    const vendor = useMemo(() => vendors.find(v => v.id === vendorId), [vendorId, vendors]);

    const linkedTerms = useMemo(() => {
        if (!vendor) return [];
        return terms.filter(term => term.linkedVendorIds?.includes(vendor.id));
    }, [vendor, terms]);

    if (!vendor) {
        return (
            <div className="text-center container mx-auto">
                <h2 className="text-2xl font-bold text-slate-100">Vendor not found</h2>
                <Link to="/" className="mt-4 inline-block text-blue-400 hover:underline">
                    Back to Lexicon
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <Link to="/" className="inline-flex items-center mb-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Back to Lexicon
            </Link>

            <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-8 mb-8 flex flex-col md:flex-row items-center md:space-x-8 text-center md:text-left">
                <img src={vendor.logoUrl} alt={`${vendor.name} logo`} className="h-32 w-32 object-contain rounded-lg bg-white p-2 shrink-0 mb-6 md:mb-0" />
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">{vendor.name}</h1>
                    <p className="mt-2 text-lg text-slate-400">{vendor.description}</p>
                </div>
            </div>

            <section>
                <h2 className="text-3xl font-bold text-slate-100 tracking-tight mb-6">Associated Lexicon Terms</h2>
                {linkedTerms.length > 0 ? (
                    <div className="space-y-4">
                        {linkedTerms.map(term => (
                            <Link key={term.id} to={`/term/${term.id}`} className="block p-4 bg-slate-800/50 rounded-lg ring-1 ring-white/10 hover:ring-blue-500 hover:bg-slate-800 transition">
                                <h3 className="font-bold text-lg text-blue-400">{term.term}</h3>
                                <p className="text-slate-400 line-clamp-2">{term.plainLanguageDefinition}</p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-400 italic">This vendor is not yet linked to any lexicon terms.</p>
                )}
            </section>
        </div>
    );
};

export default VendorMicrosite;
