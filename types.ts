
export interface VisualStep {
  step: number;
  description: string;
  state: string;
}

export interface InterviewLevel {
  problem: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  edgeCases: string[];
  interviewQuestions: string[];
}

export interface SeniorLevel {
  quality: string;
  designTradeoffs: string;
  scalability: string;
  maintenance: string;
}

export interface CodeAnalysis {
  language: string;
  beginnerExplanation: string;
  interviewLevel: InterviewLevel;
  seniorLevel: SeniorLevel;
  optimizations: string[];
  visualSteps: VisualStep[];
}

export enum AnalysisLevel {
  BEGINNER = 'Beginner',
  INTERVIEW = 'Interview',
  SENIOR = 'Senior Engineer',
  VISUAL = 'Visualizer'
}

// Extended types for visual intelligence graphs

export interface ComplexityBreakdown {
  blocks: ComplexityBlock[];
  dominantBottleneck: string;
}

export interface ComplexityBlock {
  id: string;
  codeSnippet: string;
  lineRange: { start: number; end: number };
  complexity: string; // e.g., "O(n²)"
  contributionPercentage: number;
  type: 'loop' | 'recursion' | 'nested-loop' | 'sort' | 'search';
}

export interface GrowthCurveData {
  current: DataPoint[];
  optimized?: DataPoint[];
  scalingType: 'linear' | 'logarithmic' | 'polynomial' | 'exponential';
}

export interface DataPoint {
  inputSize: number;
  estimatedTime: number; // milliseconds
}

export interface OptimizationComparison {
  original: ComplexityMetrics;
  optimized: ComplexityMetrics;
  improvement: ImprovementMetrics;
}

export interface ComplexityMetrics {
  timeComplexity: string;
  spaceComplexity: string;
  timeComplexityNumeric: number; // for comparison
  spaceComplexityNumeric: number;
}

export interface ImprovementMetrics {
  timeImprovement: number; // percentage
  spaceImprovement: number; // percentage
  magnitude: 'significant' | 'moderate' | 'minimal';
}

export interface DecisionTrace {
  nodes: DecisionNode[];
  edges: DecisionEdge[];
}

export interface DecisionNode {
  id: string;
  label: string;
  type: 'pattern' | 'analysis' | 'conclusion';
  pattern?: 'loop' | 'recursion' | 'nested-loop' | 'sort' | 'search' | 'data-structure';
  details: string;
}

export interface DecisionEdge {
  from: string;
  to: string;
  reasoning: string;
}

export interface PerformanceRisk {
  score: number; // 0-100
  components: RiskComponents;
  zone: 'green' | 'yellow' | 'red';
}

export interface RiskComponents {
  timeComplexity: number; // weighted score
  spaceComplexity: number;
  inputSensitivity: number;
  codeSmells: number;
}

export interface InputSensitivity {
  bestCase: DataPoint[];
  averageCase: DataPoint[];
  worstCase: DataPoint[];
  sensitivityGap: number; // percentage difference
}

export interface CodeSmellMap {
  smells: CodeSmell[];
  connections: SmellConnection[];
}

export interface CodeSmell {
  id: string;
  type: string;
  lineRange: { start: number; end: number };
  severity: 'low' | 'medium' | 'high';
}

export interface SmellConnection {
  smellId: string;
  consequence: string;
  impactArea: 'cpu' | 'memory' | 'battery' | 'network';
}

export interface OptimizationTree {
  root: OptimizationNode;
  branches: OptimizationNode[];
}

export interface OptimizationNode {
  id: string;
  label: string;
  type: 'current' | 'time-optimized' | 'memory-optimized' | 'readable' | 'do-nothing';
  code: string;
  metrics: ComplexityMetrics;
  tradeoffs: string[];
}

export interface MemoryFootprint {
  categories: MemoryCategory[];
  totalByInputSize: DataPoint[];
}

export interface MemoryCategory {
  name: 'variables' | 'data-structures' | 'temporary';
  allocations: MemoryAllocation[];
}

export interface MemoryAllocation {
  name: string;
  sizeByInput: DataPoint[];
  color: string;
}

export interface AlgorithmIdentity {
  algorithmName: string;
  confidence: number; // 0-100
  category: 'sorting' | 'searching' | 'dynamic-programming' | 'graph' | 'unknown';
}

export interface RefactorImpact {
  current: DataPoint[];
  projected: DataPoint[];
  improvementPercentage: number;
  worthwhile: boolean;
}

export interface ScalabilityThreshold {
  maxInputSize: number;
  failureReason: 'timeout' | 'memory' | 'none';
  timeoutLimit: number; // seconds
  memoryLimit: number; // MB
}

export interface StabilityAssessment {
  performanceGain: number;
  stabilityRisk: number; // 0-100
  riskLevel: 'low' | 'moderate' | 'high';
  warnings: string[];
}

export interface LearningProgress {
  analyses: HistoricalAnalysis[];
  statistics: ProgressStatistics;
}

export interface HistoricalAnalysis {
  timestamp: number;
  riskScore: number;
  complexity: string;
  smellCount: number;
}

export interface ProgressStatistics {
  totalAnalyses: number;
  averageRiskScore: number;
  improvementPercentage: number;
  trendDirection: 'improving' | 'stable' | 'declining';
}

// Main extended analysis interface
export interface ExtendedCodeAnalysis extends CodeAnalysis {
  complexityBreakdown: ComplexityBreakdown;
  growthCurve: GrowthCurveData;
  optimizationComparison?: OptimizationComparison;
  decisionTrace: DecisionTrace;
  performanceRisk: PerformanceRisk;
  inputSensitivity: InputSensitivity;
  codeSmellMap: CodeSmellMap;
  optimizationTree: OptimizationTree;
  memoryFootprint: MemoryFootprint;
  algorithmIdentity: AlgorithmIdentity;
  refactorImpact?: RefactorImpact;
  scalabilityThreshold: ScalabilityThreshold;
  stabilityAssessment?: StabilityAssessment;
}
