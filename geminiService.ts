
import { GoogleGenAI, Type } from "@google/genai";
import { CodeAnalysis } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeCode = async (code: string): Promise<CodeAnalysis> => {
  const prompt = `Analyze the following source code and provide explanations at three distinct levels: Beginner, Interview-level, and Senior Engineer. Also provide optimization suggestions and visual execution steps.

Code:
\`\`\`
${code}
\`\`\`
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          language: { type: Type.STRING, description: "Detected programming language" },
          beginnerExplanation: { type: Type.STRING, description: "Simple, jargon-free explanation" },
          interviewLevel: {
            type: Type.OBJECT,
            properties: {
              problem: { type: Type.STRING },
              approach: { type: Type.STRING },
              timeComplexity: { type: Type.STRING },
              spaceComplexity: { type: Type.STRING },
              edgeCases: { type: Type.ARRAY, items: { type: Type.STRING } },
              interviewQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["problem", "approach", "timeComplexity", "spaceComplexity", "edgeCases", "interviewQuestions"]
          },
          seniorLevel: {
            type: Type.OBJECT,
            properties: {
              quality: { type: Type.STRING },
              designTradeoffs: { type: Type.STRING },
              scalability: { type: Type.STRING },
              maintenance: { type: Type.STRING },
            },
            required: ["quality", "designTradeoffs", "scalability", "maintenance"]
          },
          optimizations: { type: Type.ARRAY, items: { type: Type.STRING } },
          visualSteps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                step: { type: Type.NUMBER },
                description: { type: Type.STRING },
                state: { type: Type.STRING, description: "Mental model or variable state representation" },
              },
              required: ["step", "description", "state"]
            }
          }
        },
        required: ["language", "beginnerExplanation", "interviewLevel", "seniorLevel", "optimizations", "visualSteps"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI");
  return JSON.parse(text) as CodeAnalysis;
};
