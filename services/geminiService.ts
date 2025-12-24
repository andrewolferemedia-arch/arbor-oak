import { GoogleGenAI } from "@google/genai";
import { GeneratorTone, PlatformType, DealType, OutreachStyle } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- AGENT MEDIA SERVICE ---

const MEDIA_SYSTEM_INSTRUCTION = `You are the Lead Creative Strategist for 'Arbor & Oak Media'.
YOUR ROLE: You don't just write captions; you are a content director helping Real Estate Agents build a personal brand.
CONTEXT: Chicago South Suburbs, Luxury & Commercial Real Estate.
GOAL: Stop the scroll. Make the agent look like a local expert.

IF GENERATING SCRIPTS (TikTok/Reels):
- Format clearly: [SCENE START] -> [VISUAL CUE] -> [AUDIO/DIALOGUE].
- Include "B-Roll" suggestions (e.g., "Cut to drone shot of skyline").
- Keep it under 45 seconds reading time.

IF GENERATING HOOKS:
- Provide 5 distinct, punchy opening lines that make people stop scrolling.
- Use psychology (FOMO, Curiosity, Contrarian views).

IF GENERATING CAPTIONS:
- Use emojis but don't overdo it.
- Always include a Call to Action (CTA).`;

export const generateMarketingContent = async (
  topic: string,
  platform: PlatformType,
  tone: GeneratorTone
): Promise<string> => {
  let prompt = "";
  
  if (platform === PlatformType.TIKTOK) {
    prompt = `Write a viral 30-45 second vertical video script about: "${topic}". 
    Tone: ${tone}. 
    Include Visual Cues (Camera movements, text overlays) and Spoken Audio.`;
  } else if (platform === PlatformType.HOOKS) {
    prompt = `Write 10 viral video hooks/headlines about: "${topic}". 
    Tone: ${tone}. 
    Make them punchy and distinct.`;
  } else {
    prompt = `Write a ${platform} post about: "${topic}". Tone: ${tone}. Output ONLY text.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { systemInstruction: MEDIA_SYSTEM_INSTRUCTION, temperature: 0.8 }
    });
    return response.text || "Error.";
  } catch (error) { return "Error connecting to AI."; }
};

export const generateMarketingContentFromImage = async (
  base64Data: string,
  mimeType: string,
  platform: PlatformType,
  tone: GeneratorTone,
  context: string
): Promise<string> => {
  const prompt = `Analyze this image. It is a real estate asset.
  User Context: "${context}".
  Task: Write ${platform} content based on the visual details.
  Tone: ${tone}.
  If it's a script, suggest how to film this specific room/building.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [{ inlineData: { data: base64Data, mimeType } }, { text: prompt }] },
      config: { systemInstruction: MEDIA_SYSTEM_INSTRUCTION, temperature: 0.7 }
    });
    return response.text || "Error.";
  } catch (error) { return "Error."; }
};

// --- WHOLESALE ENGINE SERVICE ---

const INVESTOR_SYSTEM_INSTRUCTION = `You are a sophisticated Real Estate Acquisitions Manager & Developer.
YOUR GOAL: Analyze highest and best use for properties and write high-level outreach to sellers.
PHILOSOPHY: We do not "lowball." We make aggressive offers based on data. We solve problems (Title, Zoning, Probate).
SPECIALTIES: Land Entitlement, Truck Parking, Industrial Flex, Creative Finance.
TONE: Professional, concise, knowledgeable, empathetic but serious.`;

export const analyzeHighestAndBestUse = async (
  propertyType: DealType,
  notes: string,
  zoningCode: string
): Promise<string> => {
  const prompt = `Analyze this ${propertyType} deal.
  
  User Notes: "${notes}"
  Zoning/Context: "${zoningCode}"

  Provide a "Highest & Best Use" Report:
  1. What is the potential here? (e.g., Subdivide, Re-zone for Outdoor Storage, Build Flex Space).
  2. What are the likely "Gotchas"? (Wetlands, Access issues, Utility hookups).
  3. List 3 questions I must ask the owner immediately to validate this deal.
  4. Estimate a rough "Aggressive Offer" strategy (e.g., "Offer seller finance at 0% interest if price is high" or "Cash offer at land value minus entitlement costs").`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { systemInstruction: INVESTOR_SYSTEM_INSTRUCTION, temperature: 0.5 } // Lower temp for logic
    });
    return response.text || "Analysis failed.";
  } catch (error) { return "Error executing analysis."; }
};

export const generateSellerOutreach = async (
  propertyType: DealType,
  style: OutreachStyle,
  painPoint: string
): Promise<string> => {
  const prompt = `Write a cold outreach message (SMS or Letter text) to a property owner.
  
  Property Type: ${propertyType}
  Outreach Style: ${style}
  Suspected Pain Point/Situation: ${painPoint} (e.g., Tax Delinquent, Out of State, Probate, Vacant Lot).

  RULES:
  - DO NOT sound like a generic wholesaler ("I wanna buy ur house cash").
  - Sound like a principal buyer/developer or a problem-solving professional.
  - If "Land", mention specific value (e.g., "I see potential for development").
  - If "Truck Parking", mention the demand for outdoor storage.
  - Keep it conversational but authoritative.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { systemInstruction: INVESTOR_SYSTEM_INSTRUCTION, temperature: 0.8 }
    });
    return response.text || "Generation failed.";
  } catch (error) { return "Error generating outreach."; }
};