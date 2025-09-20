import { GoogleGenAI, Type } from "@google/genai";
import type { LexiconTerm, DroobiVideo, Playlist, AIRecommendation, ConversationEntry } from '../types';

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
        description: "The specific infrastructure sector this term belongs to. MUST be one of: 'data', 'asset_mgmt', 'climate_impacts', 'resiliency', 'regulations', 'governance', 'modeling', 'operations', 'ai_blockchain'."
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
    - 'category' MUST be one of the following specific IDs:
      - 'data': Data architecture, pipelines, schemas, sensors, QA/QC
      - 'asset_mgmt': CMMS/EAM, lifecycle, condition assessment, risk & criticality
      - 'climate_impacts': SLR, drought, heat, extreme rain, algal blooms
      - 'resiliency': Redundancy, recovery time, mitigation, community readiness
      - 'regulations': Chapter 24, FBC, EPA/DEP rules, permitting, enforcement
      - 'governance': Policies, roles, accountability, audits, public transparency
      - 'modeling': Hydrologic/hydraulic, water quality, demand/forecast, twins
      - 'operations': Plant ops, collections/distribution, SOPs, O&M, SCADA
      - 'ai_blockchain': RAG/agents, model governance, provenance, ledgers, credits
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

export async function askManual(manualSummary: string, userQuestion: string): Promise<string> {
    const prompt = `
        You are a specialized AI assistant. Your ONLY function is to answer questions based on the provided document summary.

        **Strict Rules:**
        1. You MUST answer the user's question using **only** the information found in the "DOCUMENT SUMMARY" section below.
        2. Do NOT use any external knowledge, a-priori information, or make assumptions.
        3. If the answer to the question cannot be found in the document summary, you MUST respond with: "I'm sorry, but I could not find the answer to that question in the provided manual summary." Do not add any other information.
        4. When the answer involves lists, steps, or code-like text (e.g., part numbers, commands), format your response using simple Markdown. Use bullet points (-), numbered lists (1.), and backticks for code (\`code\`).

        DOCUMENT SUMMARY:
        ---
        ${manualSummary}
        ---

        USER QUESTION:
        "${userQuestion}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error asking manual:", error);
        if (error instanceof Error && error.message.includes('429')) {
            throw new Error("API rate limit exceeded. Please try again later.");
        }
        throw new Error("Failed to get an answer from the AI. Please try again.");
    }
}

const aiRecommendationSchema = {
  type: Type.OBJECT,
  properties: {
    title: { 
      type: Type.STRING,
      description: "A creative and engaging title for the recommendation list, such as 'For You', 'Picks for You', 'Because you like [Topic]', or 'Explore New Ideas'."
    },
    recommendedVideoIds: {
      type: Type.ARRAY,
      description: "An array of video IDs that the user would likely enjoy, based on their watch history. Should not include videos the user has already watched.",
      items: { type: Type.STRING }
    }
  },
  required: ['title', 'recommendedVideoIds']
};


export async function getAIRecommendations(
  watchHistory: DroobiVideo[],
  playlists: Playlist[],
  allVideos: DroobiVideo[]
): Promise<AIRecommendation> {
  const watchedVideoIds = new Set(watchHistory.map(v => v.id));
  playlists.forEach(p => p.videoIds.forEach(id => watchedVideoIds.add(id)));

  const unwatchedVideos = allVideos
    .filter(v => !watchedVideoIds.has(v.id))
    .map(({ id, title, description, category }) => ({ id, title, description, category }));

  const userHistorySummary = watchHistory.map(({ title, category }) => ({ title, category }));
  const userPlaylistsSummary = playlists.map(p => ({
    name: p.name,
    videos: p.videoIds.map(id => allVideos.find(v => v.id === id)?.title).filter(Boolean)
  }));

  const prompt = `
    You are a world-class recommendation engine for a video platform called Droobi TV, which focuses on public infrastructure, technology, and environmental topics. Your goal is to provide highly relevant video recommendations to users based on their viewing habits.

    Here is a list of all available videos the user has NOT watched yet:
    ${JSON.stringify(unwatchedVideos, null, 2)}

    Here is a summary of the user's watch history:
    ${JSON.stringify(userHistorySummary, null, 2)}

    Here are the user's playlists, which also indicate strong interest:
    ${JSON.stringify(userPlaylistsSummary, null, 2)}

    Based on this user's activity, please analyze their interests and recommend up to 5 videos from the unwatched list that they would most likely enjoy.
    Also, provide a creative and engaging title for this recommendation list.

    Return your response as a single JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: aiRecommendationSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as AIRecommendation;
    
    // Ensure the result is valid and contains an array
    if (!result.recommendedVideoIds || !Array.isArray(result.recommendedVideoIds)) {
      console.warn('AI recommendation did not return a valid video ID array.');
      return { title: 'Recommended For You', recommendedVideoIds: [] };
    }

    return result;
  } catch (error) {
    console.error("Error generating AI recommendations:", error);
    // Fallback to a generic recommendation
    const fallbackIds = unwatchedVideos.slice(0, 5).map(v => v.id);
    return { title: 'Discover Something New', recommendedVideoIds: fallbackIds };
  }
}

const aiSearchResultSchema = {
  type: Type.ARRAY,
  items: { type: Type.STRING }
};

export async function performAISearch(
  query: string,
  allVideos: DroobiVideo[]
): Promise<string[]> {
  // We only need to send essential info to the AI to save tokens.
  const searchableVideos = allVideos.map(({ id, title, description, category, series }) => ({
    id,
    title,
    description,
    category,
    series: series?.title,
  }));

  const prompt = `
    You are a powerful semantic search engine for a video platform called "Droobi TV", which focuses on public infrastructure, technology, and environmental topics. Your task is to find the most relevant videos based on the user's search query.

    Analyze the user's query for its meaning and intent, not just keywords. Match it against the video titles, descriptions, categories, and series titles to find the best results.

    User's Search Query: "${query}"

    Here is the list of available videos:
    ${JSON.stringify(searchableVideos, null, 2)}

    Return a JSON array of the video IDs ('id' field) that are the most semantically relevant to the user's query. Order them from most to least relevant. Return up to 10 results. If no videos are relevant, return an empty array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: aiSearchResultSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as string[];

    if (!Array.isArray(result)) {
      console.warn('AI search did not return a valid array of video IDs.');
      return [];
    }

    return result;
  } catch (error) {
    console.error("Error performing AI search:", error);
    throw new Error("Failed to perform AI search. Please try again.");
  }
}

export async function askAICoach(cardFront: string, cardBack: string, conversation: ConversationEntry[]): Promise<string> {
    // FIX: Replaced findLast with a compatible alternative for broader environment support.
    const userQuestion = [...conversation].reverse().find(e => e.role === 'user')?.content || '';

    const history = conversation
        .slice(0, -1) // Exclude the current question
        .filter(entry => entry.role === 'user' || entry.role === 'gemini')
        .map(entry => {
            if (entry.role === 'user') {
                return `**User:** ${entry.content}`;
            }
            // This case must be 'gemini' due to the filter
            let feedback_str = '';
            if (entry.feedback === 'up') feedback_str = " (Feedback: Good answer)";
            if (entry.feedback === 'down') feedback_str = " (Feedback: Bad answer)";
            return `**AI Buddy:** ${entry.content}${feedback_str}`;
        }).join('\n\n');

    const prompt = `
        You are an expert AI Study Buddy for "The Language of Water," a learning platform about public infrastructure. Your goal is to help users understand flashcard topics more deeply.
        You are an expert in water and public infrastructure. Your tone should be encouraging and clear.

        **Flashcard Context:**
        - Topic: "${cardFront}"
        - Key Information: "${cardBack}"
        
        **Conversation History (if any):**
        ${history || 'No previous conversation.'}

        **Your Task:**
        1. Answer the user's latest question conversationally and helpfully, based on the flashcard's context and the conversation history.
        2. Pay close attention to the feedback provided on your previous answers. If an answer was marked 'down', try to improve upon it (e.g., be simpler, more detailed, or provide a different kind of example). If an answer was marked 'up', maintain that style and quality.
        3. You can simplify complex concepts, provide examples, or elaborate on the topic.
        4. If the question asks for something outside the direct context (like a case study), you can generate a plausible, illustrative example relevant to the infrastructure sector. For example, if asked for a case study about a regulation, invent a city and a scenario where that regulation was applied.
        5. Format your response with simple Markdown (bolding using **text**, unordered lists using -). Do not use headings.
        
        **User's Latest Question:**
        "${userQuestion}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error asking AI Coach:", error);
        if (error instanceof Error && error.message.includes('429')) {
            throw new Error("API rate limit exceeded. Please try again later.");
        }
        throw new Error("Failed to get an answer from the AI. Please try again.");
    }
}
