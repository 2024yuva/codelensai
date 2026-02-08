import { describe, it, expect } from 'vitest';
import {
  generateMockComplexityBlocks,
  generateMockComplexityBreakdown,
  generateMockDataPoints,
  generateMockGrowthCurve,
  generateMockPerformanceRisk,
  generateMockDecisionTrace,
  generateMockComplexityMetrics,
  generateMockOptimizationComparison,
  normalizeContributions,
} from './mockData';

describe('Mock Data Generators', () => {
  describe('generateMockComplexityBlocks', () => {
    it('should generate the specified number of blocks', () => {
      const blocks = generateMockComplexityBlocks(5);
      expect(blocks).toHaveLength(5);
    });

    it('should generate blocks with required properties', () => {
      const blocks = generateMockComplexityBlocks(3);
      blocks.forEach(block => {
        expect(block).toHaveProperty('id');
        expect(block).toHaveProperty('codeSnippet');
        expect(block).toHaveProperty('lineRange');
        expect(block).toHaveProperty('complexity');
        expect(block).toHaveProperty('contributionPercentage');
        expect(block).toHaveProperty('type');
      });
    });
  });

  describe('generateMockDataPoints', () => {
    it('should generate data points in the specified range', () => {
      const points = generateMockDataPoints(1, 1000, 'linear');
      expect(points.length).toBeGreaterThan(0);
      expect(points[0].inputSize).toBeGreaterThanOrEqual(1);
      expect(points[points.length - 1].inputSize).toBeLessThanOrEqual(1000);
    });

    it('should generate different patterns for different complexities', () => {
      const linear = generateMockDataPoints(1, 5000, 'linear');
      const quadratic = generateMockDataPoints(1, 5000, 'quadratic');
      
      // Quadratic should grow much faster than linear at larger input sizes
      const lastLinear = linear[linear.length - 1].estimatedTime;
      const lastQuadratic = quadratic[quadratic.length - 1].estimatedTime;
      expect(lastQuadratic).toBeGreaterThan(lastLinear);
    });
  });

  describe('generateMockPerformanceRisk', () => {
    it('should assign correct zone based on score', () => {
      const green = generateMockPerformanceRisk(30);
      expect(green.zone).toBe('green');

      const yellow = generateMockPerformanceRisk(50);
      expect(yellow.zone).toBe('yellow');

      const red = generateMockPerformanceRisk(80);
      expect(red.zone).toBe('red');
    });

    it('should calculate components with correct weights', () => {
      const risk = generateMockPerformanceRisk(100);
      expect(risk.components.timeComplexity).toBe(40);
      expect(risk.components.spaceComplexity).toBe(25);
      expect(risk.components.inputSensitivity).toBe(20);
      expect(risk.components.codeSmells).toBe(15);
    });
  });

  describe('generateMockDecisionTrace', () => {
    it('should generate a valid decision trace', () => {
      const trace = generateMockDecisionTrace();
      expect(trace.nodes.length).toBeGreaterThan(0);
      expect(trace.edges.length).toBeGreaterThan(0);
    });

    it('should have edges connecting nodes', () => {
      const trace = generateMockDecisionTrace();
      const nodeIds = new Set(trace.nodes.map(n => n.id));
      
      trace.edges.forEach(edge => {
        expect(nodeIds.has(edge.from)).toBe(true);
        expect(nodeIds.has(edge.to)).toBe(true);
      });
    });
  });

  describe('normalizeContributions', () => {
    it('should normalize contributions to sum to 100', () => {
      const blocks = [
        { ...generateMockComplexityBlocks(1)[0], contributionPercentage: 30 },
        { ...generateMockComplexityBlocks(1)[0], contributionPercentage: 50 },
        { ...generateMockComplexityBlocks(1)[0], contributionPercentage: 20 },
      ];

      const normalized = normalizeContributions(blocks);
      const sum = normalized.reduce((acc, b) => acc + b.contributionPercentage, 0);
      
      expect(Math.abs(sum - 100)).toBeLessThan(0.01);
    });

    it('should handle blocks that dont sum to 100', () => {
      const blocks = [
        { ...generateMockComplexityBlocks(1)[0], contributionPercentage: 60 },
        { ...generateMockComplexityBlocks(1)[0], contributionPercentage: 80 },
      ];

      const normalized = normalizeContributions(blocks);
      const sum = normalized.reduce((acc, b) => acc + b.contributionPercentage, 0);
      
      expect(Math.abs(sum - 100)).toBeLessThan(0.01);
    });
  });

  describe('generateMockOptimizationComparison', () => {
    it('should generate valid optimization comparison', () => {
      const comparison = generateMockOptimizationComparison();
      
      expect(comparison.original).toBeDefined();
      expect(comparison.optimized).toBeDefined();
      expect(comparison.improvement).toBeDefined();
      expect(comparison.improvement.magnitude).toMatch(/significant|moderate|minimal/);
    });
  });
});
