import {
  ComplexityBlock,
  ComplexityBreakdown,
  DataPoint,
  GrowthCurveData,
  PerformanceRisk,
  RiskComponents,
  DecisionTrace,
  DecisionNode,
  DecisionEdge,
  OptimizationComparison,
  ComplexityMetrics,
  ImprovementMetrics,
} from '../../types';

/**
 * Generate mock complexity blocks for testing
 */
export function generateMockComplexityBlocks(count: number = 3): ComplexityBlock[] {
  const types: Array<'loop' | 'recursion' | 'nested-loop' | 'sort' | 'search'> = [
    'loop',
    'recursion',
    'nested-loop',
    'sort',
    'search',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `block-${i}`,
    codeSnippet: `// Code block ${i}\nfor (let i = 0; i < n; i++) { }`,
    lineRange: { start: i * 10, end: i * 10 + 5 },
    complexity: i === 0 ? 'O(n²)' : 'O(n)',
    contributionPercentage: i === 0 ? 60 : 40 / (count - 1),
    type: types[i % types.length],
  }));
}

/**
 * Generate mock complexity breakdown
 */
export function generateMockComplexityBreakdown(): ComplexityBreakdown {
  const blocks = generateMockComplexityBlocks(3);
  return {
    blocks,
    dominantBottleneck: blocks[0].id,
  };
}

/**
 * Generate mock data points for growth curves
 */
export function generateMockDataPoints(
  start: number = 1,
  end: number = 10000,
  complexity: 'linear' | 'quadratic' | 'logarithmic' = 'linear'
): DataPoint[] {
  const points: DataPoint[] = [];
  const numPoints = 50; // Generate 50 points
  const step = Math.max(1, Math.floor((end - start) / numPoints));

  for (let n = start; n <= end; n += step) {
    let time: number;
    switch (complexity) {
      case 'linear':
        time = n * 0.01; // Increased coefficient
        break;
      case 'quadratic':
        time = n * n * 0.00001; // Increased coefficient
        break;
      case 'logarithmic':
        time = Math.log(n) * 0.1; // Increased coefficient
        break;
    }
    points.push({ inputSize: n, estimatedTime: time });
  }

  return points;
}

/**
 * Generate mock growth curve data
 */
export function generateMockGrowthCurve(includeOptimized: boolean = false): GrowthCurveData {
  return {
    current: generateMockDataPoints(1, 10000, 'quadratic'),
    optimized: includeOptimized ? generateMockDataPoints(1, 10000, 'linear') : undefined,
    scalingType: 'polynomial',
  };
}

/**
 * Generate mock performance risk
 */
export function generateMockPerformanceRisk(score: number = 50): PerformanceRisk {
  const components: RiskComponents = {
    timeComplexity: score * 0.4,
    spaceComplexity: score * 0.25,
    inputSensitivity: score * 0.2,
    codeSmells: score * 0.15,
  };

  let zone: 'green' | 'yellow' | 'red';
  if (score <= 40) zone = 'green';
  else if (score <= 70) zone = 'yellow';
  else zone = 'red';

  return { score, components, zone };
}

/**
 * Generate mock decision trace
 */
export function generateMockDecisionTrace(): DecisionTrace {
  const nodes: DecisionNode[] = [
    {
      id: 'node-1',
      label: 'Detect Loop',
      type: 'pattern',
      pattern: 'loop',
      details: 'Found for loop at line 5',
    },
    {
      id: 'node-2',
      label: 'Nested Loop Detected',
      type: 'pattern',
      pattern: 'nested-loop',
      details: 'Found nested loop at line 6',
    },
    {
      id: 'node-3',
      label: 'Complexity Analysis',
      type: 'analysis',
      details: 'Calculated O(n²) complexity',
    },
    {
      id: 'node-4',
      label: 'Final Conclusion',
      type: 'conclusion',
      details: 'Code has quadratic time complexity',
    },
  ];

  const edges: DecisionEdge[] = [
    { from: 'node-1', to: 'node-2', reasoning: 'Loop contains another loop' },
    { from: 'node-2', to: 'node-3', reasoning: 'Nested loops indicate quadratic growth' },
    { from: 'node-3', to: 'node-4', reasoning: 'Analysis complete' },
  ];

  return { nodes, edges };
}

/**
 * Generate mock complexity metrics
 */
export function generateMockComplexityMetrics(
  timeComplexity: string = 'O(n²)',
  spaceComplexity: string = 'O(n)'
): ComplexityMetrics {
  // Map complexity to numeric values
  const complexityMap: Record<string, number> = {
    'O(1)': 1,
    'O(log n)': 2,
    'O(n)': 3,
    'O(n log n)': 4,
    'O(n²)': 5,
    'O(n³)': 6,
    'O(2ⁿ)': 7,
    'O(n!)': 8,
  };

  return {
    timeComplexity,
    spaceComplexity,
    timeComplexityNumeric: complexityMap[timeComplexity] || 3,
    spaceComplexityNumeric: complexityMap[spaceComplexity] || 3,
  };
}

/**
 * Generate mock optimization comparison
 */
export function generateMockOptimizationComparison(): OptimizationComparison {
  const original = generateMockComplexityMetrics('O(n²)', 'O(n)');
  const optimized = generateMockComplexityMetrics('O(n log n)', 'O(n)');

  const timeImprovement = ((original.timeComplexityNumeric - optimized.timeComplexityNumeric) / original.timeComplexityNumeric) * 100;
  const spaceImprovement = 0; // No space improvement

  let magnitude: 'significant' | 'moderate' | 'minimal';
  if (timeImprovement >= 20) magnitude = 'significant';
  else if (timeImprovement >= 10) magnitude = 'moderate';
  else magnitude = 'minimal';

  const improvement: ImprovementMetrics = {
    timeImprovement,
    spaceImprovement,
    magnitude,
  };

  return { original, optimized, improvement };
}

/**
 * Normalize contribution percentages to sum to 100
 */
export function normalizeContributions(blocks: ComplexityBlock[]): ComplexityBlock[] {
  const total = blocks.reduce((sum, block) => sum + block.contributionPercentage, 0);
  if (total === 0) return blocks;

  return blocks.map(block => ({
    ...block,
    contributionPercentage: (block.contributionPercentage / total) * 100,
  }));
}
