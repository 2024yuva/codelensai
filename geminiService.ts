
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

import { ExtendedCodeAnalysis } from "./types";

/**
 * Extended code analysis with visualization data
 * Includes complexity breakdown, growth curves, decision traces, and more
 */
export const analyzeCodeExtended = async (code: string): Promise<ExtendedCodeAnalysis> => {
  const prompt = `Analyze the following source code and provide comprehensive analysis including:

1. **Basic Analysis**: Language detection, beginner/interview/senior explanations
2. **Complexity Breakdown**: Identify all code blocks contributing to time complexity with line ranges and contribution percentages
3. **Growth Curve Data**: Simulate execution time for input sizes from n=1 to n=10000 (generate ~50 data points)
4. **Decision Trace**: Show your reasoning process as a directed graph (nodes: patterns detected, edges: reasoning steps)
5. **Performance Risk Score**: Calculate risk score (0-100) based on complexity, memory, input sensitivity, and code smells
6. **Input Sensitivity**: Analyze best-case, average-case, and worst-case performance patterns
7. **Code Smells**: Detect nested loops, redundant operations, inefficient data structures and map to consequences
8. **Optimization Options**: Generate at least 3 alternatives (time-optimized, memory-optimized, readability-focused)
9. **Memory Footprint**: Identify memory allocations by category (variables, data structures, temporary)
10. **Algorithm Identity**: Identify the algorithm pattern with confidence percentage
11. **Scalability Threshold**: Estimate max input size before timeout (30s) or memory exhaustion (1GB)

Code:
\`\`\`
${code}
\`\`\`

Return comprehensive JSON matching the ExtendedCodeAnalysis schema.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          // Basic analysis (existing fields)
          language: { type: Type.STRING },
          beginnerExplanation: { type: Type.STRING },
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
                state: { type: Type.STRING },
              },
              required: ["step", "description", "state"]
            }
          },
          
          // Extended visualization data
          complexityBreakdown: {
            type: Type.OBJECT,
            properties: {
              blocks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    codeSnippet: { type: Type.STRING },
                    lineRange: {
                      type: Type.OBJECT,
                      properties: {
                        start: { type: Type.NUMBER },
                        end: { type: Type.NUMBER }
                      },
                      required: ["start", "end"]
                    },
                    complexity: { type: Type.STRING },
                    contributionPercentage: { type: Type.NUMBER },
                    type: { type: Type.STRING }
                  },
                  required: ["id", "codeSnippet", "lineRange", "complexity", "contributionPercentage", "type"]
                }
              },
              dominantBottleneck: { type: Type.STRING }
            },
            required: ["blocks", "dominantBottleneck"]
          },
          
          growthCurve: {
            type: Type.OBJECT,
            properties: {
              current: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    inputSize: { type: Type.NUMBER },
                    estimatedTime: { type: Type.NUMBER }
                  },
                  required: ["inputSize", "estimatedTime"]
                }
              },
              optimized: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    inputSize: { type: Type.NUMBER },
                    estimatedTime: { type: Type.NUMBER }
                  },
                  required: ["inputSize", "estimatedTime"]
                },
                nullable: true
              },
              scalingType: { type: Type.STRING }
            },
            required: ["current", "scalingType"]
          },
          
          decisionTrace: {
            type: Type.OBJECT,
            properties: {
              nodes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    label: { type: Type.STRING },
                    type: { type: Type.STRING },
                    pattern: { type: Type.STRING, nullable: true },
                    details: { type: Type.STRING }
                  },
                  required: ["id", "label", "type", "details"]
                }
              },
              edges: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    from: { type: Type.STRING },
                    to: { type: Type.STRING },
                    reasoning: { type: Type.STRING }
                  },
                  required: ["from", "to", "reasoning"]
                }
              }
            },
            required: ["nodes", "edges"]
          },
          
          performanceRisk: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              components: {
                type: Type.OBJECT,
                properties: {
                  timeComplexity: { type: Type.NUMBER },
                  spaceComplexity: { type: Type.NUMBER },
                  inputSensitivity: { type: Type.NUMBER },
                  codeSmells: { type: Type.NUMBER }
                },
                required: ["timeComplexity", "spaceComplexity", "inputSensitivity", "codeSmells"]
              },
              zone: { type: Type.STRING }
            },
            required: ["score", "components", "zone"]
          },
          
          inputSensitivity: {
            type: Type.OBJECT,
            properties: {
              bestCase: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    inputSize: { type: Type.NUMBER },
                    estimatedTime: { type: Type.NUMBER }
                  },
                  required: ["inputSize", "estimatedTime"]
                }
              },
              averageCase: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    inputSize: { type: Type.NUMBER },
                    estimatedTime: { type: Type.NUMBER }
                  },
                  required: ["inputSize", "estimatedTime"]
                }
              },
              worstCase: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    inputSize: { type: Type.NUMBER },
                    estimatedTime: { type: Type.NUMBER }
                  },
                  required: ["inputSize", "estimatedTime"]
                }
              },
              sensitivityGap: { type: Type.NUMBER }
            },
            required: ["bestCase", "averageCase", "worstCase", "sensitivityGap"]
          },
          
          codeSmellMap: {
            type: Type.OBJECT,
            properties: {
              smells: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    type: { type: Type.STRING },
                    lineRange: {
                      type: Type.OBJECT,
                      properties: {
                        start: { type: Type.NUMBER },
                        end: { type: Type.NUMBER }
                      },
                      required: ["start", "end"]
                    },
                    severity: { type: Type.STRING }
                  },
                  required: ["id", "type", "lineRange", "severity"]
                }
              },
              connections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    smellId: { type: Type.STRING },
                    consequence: { type: Type.STRING },
                    impactArea: { type: Type.STRING }
                  },
                  required: ["smellId", "consequence", "impactArea"]
                }
              }
            },
            required: ["smells", "connections"]
          },
          
          optimizationTree: {
            type: Type.OBJECT,
            properties: {
              root: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  label: { type: Type.STRING },
                  type: { type: Type.STRING },
                  code: { type: Type.STRING },
                  metrics: {
                    type: Type.OBJECT,
                    properties: {
                      timeComplexity: { type: Type.STRING },
                      spaceComplexity: { type: Type.STRING },
                      timeComplexityNumeric: { type: Type.NUMBER },
                      spaceComplexityNumeric: { type: Type.NUMBER }
                    },
                    required: ["timeComplexity", "spaceComplexity", "timeComplexityNumeric", "spaceComplexityNumeric"]
                  },
                  tradeoffs: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["id", "label", "type", "code", "metrics", "tradeoffs"]
              },
              branches: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    label: { type: Type.STRING },
                    type: { type: Type.STRING },
                    code: { type: Type.STRING },
                    metrics: {
                      type: Type.OBJECT,
                      properties: {
                        timeComplexity: { type: Type.STRING },
                        spaceComplexity: { type: Type.STRING },
                        timeComplexityNumeric: { type: Type.NUMBER },
                        spaceComplexityNumeric: { type: Type.NUMBER }
                      },
                      required: ["timeComplexity", "spaceComplexity", "timeComplexityNumeric", "spaceComplexityNumeric"]
                    },
                    tradeoffs: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["id", "label", "type", "code", "metrics", "tradeoffs"]
                }
              }
            },
            required: ["root", "branches"]
          },
          
          memoryFootprint: {
            type: Type.OBJECT,
            properties: {
              categories: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    allocations: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: { type: Type.STRING },
                          sizeByInput: {
                            type: Type.ARRAY,
                            items: {
                              type: Type.OBJECT,
                              properties: {
                                inputSize: { type: Type.NUMBER },
                                estimatedTime: { type: Type.NUMBER }
                              },
                              required: ["inputSize", "estimatedTime"]
                            }
                          },
                          color: { type: Type.STRING }
                        },
                        required: ["name", "sizeByInput", "color"]
                      }
                    }
                  },
                  required: ["name", "allocations"]
                }
              },
              totalByInputSize: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    inputSize: { type: Type.NUMBER },
                    estimatedTime: { type: Type.NUMBER }
                  },
                  required: ["inputSize", "estimatedTime"]
                }
              }
            },
            required: ["categories", "totalByInputSize"]
          },
          
          algorithmIdentity: {
            type: Type.OBJECT,
            properties: {
              algorithmName: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              category: { type: Type.STRING }
            },
            required: ["algorithmName", "confidence", "category"]
          },
          
          scalabilityThreshold: {
            type: Type.OBJECT,
            properties: {
              maxInputSize: { type: Type.NUMBER },
              failureReason: { type: Type.STRING },
              timeoutLimit: { type: Type.NUMBER },
              memoryLimit: { type: Type.NUMBER }
            },
            required: ["maxInputSize", "failureReason", "timeoutLimit", "memoryLimit"]
          }
        },
        required: [
          "language", "beginnerExplanation", "interviewLevel", "seniorLevel", 
          "optimizations", "visualSteps", "complexityBreakdown", "growthCurve",
          "decisionTrace", "performanceRisk", "inputSensitivity", "codeSmellMap",
          "optimizationTree", "memoryFootprint", "algorithmIdentity", "scalabilityThreshold"
        ]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI");
  
  try {
    const parsed = JSON.parse(text) as ExtendedCodeAnalysis;
    
    // Validate and provide defaults for optional fields
    if (!parsed.optimizationComparison && parsed.optimizationTree.branches.length > 0) {
      // Generate comparison if optimizations exist
      const original = parsed.optimizationTree.root.metrics;
      const optimized = parsed.optimizationTree.branches[0].metrics;
      
      const timeImprovement = ((original.timeComplexityNumeric - optimized.timeComplexityNumeric) / original.timeComplexityNumeric) * 100;
      const spaceImprovement = ((original.spaceComplexityNumeric - optimized.spaceComplexityNumeric) / original.spaceComplexityNumeric) * 100;
      
      let magnitude: 'significant' | 'moderate' | 'minimal';
      if (timeImprovement >= 20 || spaceImprovement >= 20) magnitude = 'significant';
      else if (timeImprovement >= 10 || spaceImprovement >= 10) magnitude = 'moderate';
      else magnitude = 'minimal';
      
      parsed.optimizationComparison = {
        original,
        optimized,
        improvement: { timeImprovement, spaceImprovement, magnitude }
      };
    }
    
    return parsed;
  } catch (error) {
    console.error("Failed to parse extended analysis:", error);
    throw new Error("Invalid response format from AI");
  }
};
