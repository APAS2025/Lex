
import { GoogleGenAI, Type } from "@google/genai";
import type { LexiconTerm } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    term: { type: Type.STRING },
    category: { 
        type: Type.STRING,
        description: "The specific infrastructure sector this term belongs to, e.g., 'Wastewater Treatment', 'Stormwater Management', 'Utility Management', 'Water Distribution'."
    },
    plainLanguageDefinition: { type: Type.STRING },
    technicalDefinition: { type: Type.STRING },
    regulatoryReferences: { 
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    designAndOMNotes: { type: Type.STRING },
    risksAndFailureModes: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
    },
    useCases: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
    },
    impactMetrics: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                value: { type: Type.STRING },
                description: { type: Type.STRING }
            },
            required: ['name', 'value', 'description']
        }
    },
    resilienceMapping: {
        type: Type.OBJECT,
        properties: {
            data: { type: Type.STRING },
            systems: { type: Type.STRING },
            finance: { type: Type.STRING },
        },
        required: ['data', 'systems', 'finance']
    },
    isPremium: { type: Type.BOOLEAN },
    caseStudiesCount: { type: Type.INTEGER },
  },
  required: [
    'term', 'category', 'plainLanguageDefinition', 'technicalDefinition', 'regulatoryReferences', 
    'designAndOMNotes', 'risksAndFailureModes', 'useCases', 'impactMetrics', 
    'resilienceMapping', 'isPremium', 'caseStudiesCount'
  ]
};


export async function generateLexiconEntry(term: string): Promise<LexiconTerm> {
  const prompt = `
    You are an expert in water and public infrastructure. Your task is to create a detailed lexicon entry for the term: "${term}".
    Please provide the information in a structured JSON format. The entry should be comprehensive, accurate, and follow the persona of "The Language of Water": professional, direct, no fluff.
    - 'category' should be a specific infrastructure sector like 'Wastewater Treatment', 'Stormwater Management', 'Utility Management', or 'Water Distribution'.
    - Plain language definition should be easily understandable by the public.
    - Technical definition should be precise for industry professionals.
    - Risks should be practical and relevant.
    - Use cases should be clear and distinct.
    - Impact metrics should be realistic and quantifiable where possible.
    - Resilience mapping should connect the term to the concepts of Data, Systems, and Finance.
    - Randomly set 'isPremium' to true or false.
    - Generate a realistic 'caseStudiesCount' as an integer (e.g., between 5 and 50).
    - Do not include linked vendor IDs, demo URLs, or handbook URLs, as those will be handled separately.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const generatedData = JSON.parse(jsonText);

    // Create a complete LexiconTerm object, adding the missing fields.
    const newTerm: LexiconTerm = {
        ...generatedData,
        id: `t${Date.now()}`, // Generate a unique ID
        linkedVendorIds: [], // Start with no linked vendors
        // demoVideoUrl and handbookUrl will be undefined by default
    };

    return newTerm;
  } catch (error) {
    console.error("Error generating lexicon entry:", error);
    if (error instanceof Error && error.message.includes('429')) {
         throw new Error("API rate limit exceeded. Please try again later.");
    }
    throw new Error("Failed to generate lexicon entry from AI. Please check the term and try again.");
  }
}