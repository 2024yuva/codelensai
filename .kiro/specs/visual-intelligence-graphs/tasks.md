# Implementation Plan: Visual Intelligence Graphs

## Overview

This implementation plan breaks down the visual intelligence graphs feature into incremental, testable steps. Each task builds on previous work, starting with core data models and analysis extensions, then adding visualization components, and finally integrating everything into the existing Code Lens UI.

## Tasks

- [x] 1. Set up testing infrastructure and extend type definitions
  - Install fast-check and configure Vitest for property-based testing
  - Create extended TypeScript interfaces in types.ts for all visualization data models
  - Set up test utilities and mock data generators
  - _Requirements: All requirements (foundation)_

- [ ]* 1.1 Write property test for contribution percentages
  - **Property 1: Contribution Percentages Sum to 100**
  - **Validates: Requirements 1.2**

- [ ]* 1.2 Write property test for risk score calculation
  - **Property 10: Risk Score Bounds and Calculation**
  - **Validates: Requirements 5.1, 5.4**

- [ ] 2. Extend Gemini service for structured analysis data
  - [x] 2.1 Update geminiService.ts to request extended analysis data
    - Modify prompt to request complexity breakdown, growth curves, decision traces
    - Update response schema to match ExtendedCodeAnalysis interface
    - Add error handling for missing or invalid data fields
    - _Requirements: 1.1, 2.1, 4.1, 5.1, 6.1, 7.1, 9.1, 10.1, 12.1, 14.1_

  - [ ]* 2.2 Write unit tests for Gemini service extensions
    - Test prompt generation with various code inputs
    - Test response parsing and validation
    - Test error handling for API failures
    - _Requirements: 1.1, 2.1, 4.1_

- [ ] 3. Implement complexity analysis components
  - [ ] 3.1 Create ComplexityBreakdownChart component
    - Build horizontal bar chart using Recharts
    - Implement hover tooltips with code snippets
    - Add dominant bottleneck highlighting
    - _Requirements: 1.3, 1.4, 1.5_

  - [ ]* 3.2 Write property test for complexity breakdown rendering
    - **Property 2: Complexity Breakdown Rendering Completeness**
    - **Validates: Requirements 1.3, 1.4, 1.5**

  - [ ] 3.3 Create GrowthCurveChart component
    - Build line chart with dual curves (current/optimized)
    - Implement logarithmic scaling detection
    - Add hover crosshair with exact values
    - _Requirements: 2.2, 2.3, 2.4, 2.5_

  - [ ]* 3.4 Write property test for growth curve data range
    - **Property 3: Growth Curve Input Range**
    - **Validates: Requirements 2.1**

  - [ ]* 3.5 Write property test for growth curve rendering
    - **Property 4: Growth Curve Rendering Completeness**
    - **Validates: Requirements 2.2, 2.3, 2.4, 2.5**

- [ ] 4. Checkpoint - Ensure complexity visualization tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement optimization and comparison components
  - [ ] 5.1 Create OptimizationComparisonChart component
    - Build grouped bar chart for time/space comparison
    - Add percentage improvement labels
    - Implement color coding based on improvement magnitude
    - _Requirements: 3.3, 3.4, 3.5_

  - [ ]* 5.2 Write property test for optimization metrics completeness
    - **Property 5: Optimization Metrics Completeness**
    - **Validates: Requirements 3.1, 3.2**

  - [ ]* 5.3 Write property test for optimization comparison rendering
    - **Property 6: Optimization Comparison Rendering**
    - **Validates: Requirements 3.3, 3.4, 3.5**

  - [ ] 5.4 Create OptimizationTreeChart component
    - Build tree diagram with root and branches
    - Implement click handlers for branch details
    - Add metrics display on hover
    - _Requirements: 8.3, 8.4_

  - [ ]* 5.5 Write property test for optimization alternatives count
    - **Property 17: Optimization Alternatives Minimum Count**
    - **Validates: Requirements 8.1**

  - [ ]* 5.6 Write property test for do nothing option
    - **Property 19: Do Nothing Option for Optimal Code**
    - **Validates: Requirements 8.5, 15.1, 15.2, 15.5**

- [ ] 6. Implement decision trace and risk visualization
  - [ ] 6.1 Create DecisionTraceGraph component
    - Build DAG visualization using custom SVG and D3 force layout
    - Implement node click handlers for detail display
    - Add edge labels for reasoning steps
    - _Requirements: 4.3, 4.4, 4.5_

  - [ ]* 6.2 Write property test for decision trace acyclicity
    - **Property 7: Decision Trace Acyclicity**
    - **Validates: Requirements 4.3**

  - [ ]* 6.3 Write property test for decision trace connectivity
    - **Property 8: Decision Trace Connectivity**
    - **Validates: Requirements 4.4**

  - [ ] 6.4 Create PerformanceRiskGauge component
    - Build radial gauge using Recharts RadialBarChart
    - Implement color zones (green/yellow/red)
    - Add component breakdown tooltip on hover
    - Add gauge animation for score changes
    - _Requirements: 5.2, 5.3, 5.5_

  - [ ]* 6.5 Write property test for risk score zone mapping
    - **Property 11: Risk Score Zone Mapping**
    - **Validates: Requirements 5.2**

- [ ] 7. Checkpoint - Ensure decision trace and risk tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement input sensitivity and code smell visualization
  - [ ] 8.1 Create InputSensitivityChart component
    - Build multi-line chart with three distinct lines
    - Implement line styling (solid/dashed/dotted)
    - Add legend and hover tooltips
    - _Requirements: 6.3, 6.5_

  - [ ]* 8.2 Write property test for sensitivity case completeness
    - **Property 12: Input Sensitivity Case Completeness**
    - **Validates: Requirements 6.1, 6.2**

  - [ ]* 8.3 Write property test for sensitivity gap impact
    - **Property 13: Sensitivity Gap Impact on Risk Score**
    - **Validates: Requirements 6.4**

  - [ ] 8.4 Create CodeSmellMapGraph component
    - Build node-link diagram using custom SVG and D3
    - Implement click handlers for code highlighting
    - Add severity-based node sizing
    - _Requirements: 7.3, 7.4_

  - [ ]* 8.5 Write property test for smell consequence mapping
    - **Property 15: Code Smell Consequence Mapping**
    - **Validates: Requirements 7.2**

  - [ ]* 8.6 Write property test for impact area categorization
    - **Property 16: Impact Area Categorization**
    - **Validates: Requirements 7.5**

- [ ] 9. Implement memory and algorithm visualization
  - [ ] 9.1 Create MemoryFootprintChart component
    - Build stacked area chart using Recharts
    - Implement category colors (three distinct colors)
    - Add hover tooltips for allocation details
    - _Requirements: 9.3, 9.4, 9.5_

  - [ ]* 9.2 Write property test for memory category completeness
    - **Property 20: Memory Category Completeness**
    - **Validates: Requirements 9.1**

  - [ ]* 9.3 Write property test for memory chart rendering
    - **Property 21: Memory Footprint Chart Rendering**
    - **Validates: Requirements 9.3, 9.4, 9.5**

  - [ ] 9.4 Create AlgorithmIdentityBar component
    - Build horizontal progress bar with custom styling
    - Add confidence percentage display
    - Implement conditional "Unknown pattern" display
    - _Requirements: 10.3, 10.4_

  - [ ]* 9.5 Write property test for algorithm confidence bounds
    - **Property 22: Algorithm Confidence Bounds**
    - **Validates: Requirements 10.2**

  - [ ]* 9.6 Write property test for unknown pattern threshold
    - **Property 23: Unknown Pattern Display Threshold**
    - **Validates: Requirements 10.4**

- [ ] 10. Checkpoint - Ensure memory and algorithm tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement refactor impact and scalability visualization
  - [ ] 11.1 Create RefactorImpactChart component
    - Build comparison line chart with solid/dashed lines
    - Add improvement annotation
    - Implement worthwhile indicator
    - _Requirements: 11.2, 11.5_

  - [ ]* 11.2 Write property test for refactor impact warning
    - **Property 24: Refactor Impact Warning Threshold**
    - **Validates: Requirements 11.3**

  - [ ]* 11.3 Write property test for projected vs actual line styling
    - **Property 25: Projected vs Actual Line Styling**
    - **Validates: Requirements 11.5**

  - [ ] 11.4 Create ScalabilityThresholdChart component
    - Build line chart with vertical threshold marker
    - Add failure reason annotation
    - Implement danger zone shading
    - _Requirements: 12.2, 12.3, 12.5_

  - [ ]* 11.5 Write property test for scalability default constraints
    - **Property 26: Scalability Threshold Default Constraints**
    - **Validates: Requirements 12.4**

  - [ ] 11.6 Create StabilityMeterChart component
    - Build balance scale visualization using custom SVG
    - Add warning indicators for high risk
    - Implement risk level badge
    - _Requirements: 13.2, 13.5_

  - [ ]* 11.7 Write property test for stability risk categorization
    - **Property 27: Stability Risk Categorization**
    - **Validates: Requirements 13.4**

  - [ ]* 11.8 Write property test for high stability risk warning
    - **Property 28: High Stability Risk Warning**
    - **Validates: Requirements 13.5**

- [ ] 12. Implement learning progress tracking
  - [ ] 12.1 Create local storage service for analysis history
    - Implement save/load/clear functions
    - Add retention limit enforcement (100 analyses, 90 days)
    - Handle storage errors gracefully
    - _Requirements: 14.1, 14.4, 14.5_

  - [ ]* 12.2 Write property test for history persistence round trip
    - **Property 29: Analysis History Persistence Round Trip**
    - **Validates: Requirements 14.1**

  - [ ]* 12.3 Write property test for history retention limits
    - **Property 30: Analysis History Retention Limits**
    - **Validates: Requirements 14.4**

  - [ ]* 12.4 Write property test for history clear completeness
    - **Property 31: History Clear Completeness**
    - **Validates: Requirements 14.5**

  - [ ] 12.5 Create LearningProgressChart component
    - Build trend line chart with historical data
    - Add statistics panel (total analyses, avg risk, improvement)
    - Implement time-series visualization
    - _Requirements: 14.2, 14.3_

  - [ ]* 12.6 Write property test for progress statistics completeness
    - **Property 32: Progress Statistics Completeness**
    - **Validates: Requirements 14.3**

- [ ] 13. Checkpoint - Ensure progress tracking tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 14. Create graph factory and main visualization container
  - [ ] 14.1 Create GraphFactory component
    - Implement component selection logic based on visualization type
    - Add loading states and error boundaries
    - Handle missing data gracefully
    - _Requirements: All visualization requirements_

  - [ ] 14.2 Create VisualizationContainer component
    - Build tabbed interface for different visualization categories
    - Implement responsive layout (mobile/tablet/desktop)
    - Add export functionality (optional)
    - _Requirements: All visualization requirements_

  - [ ]* 14.3 Write integration tests for visualization container
    - Test tab switching and component rendering
    - Test responsive behavior
    - Test error handling
    - _Requirements: All visualization requirements_

- [ ] 15. Integrate visualizations into main App
  - [ ] 15.1 Update App.tsx to use ExtendedCodeAnalysis
    - Add new visualization tabs to existing interface
    - Integrate local storage service for history tracking
    - Update UI to accommodate new visualizations
    - _Requirements: All requirements_

  - [ ] 15.2 Add visualization selection UI
    - Create dropdown or tab interface for selecting visualizations
    - Implement "MVP Graph Set" as default view (Growth Curve, Comparison, Risk Gauge, Decision Trace)
    - Add "Show All" option for advanced users
    - _Requirements: All requirements_

  - [ ]* 15.3 Write end-to-end integration tests
    - Test full flow from code input to visualization display
    - Test error handling and edge cases
    - Test history tracking and progress display
    - _Requirements: All requirements_

- [ ] 16. Polish and accessibility improvements
  - [ ] 16.1 Add keyboard navigation support
    - Implement keyboard shortcuts for tab switching
    - Add focus indicators for all interactive elements
    - Ensure all charts are keyboard-accessible
    - _Requirements: All requirements (accessibility)_

  - [ ] 16.2 Add screen reader support
    - Add ARIA labels to all charts and interactive elements
    - Provide text alternatives for visualizations
    - Test with screen readers (NVDA, JAWS, VoiceOver)
    - _Requirements: All requirements (accessibility)_

  - [ ] 16.3 Optimize performance
    - Implement memoization for expensive chart renders
    - Add data sampling for large datasets
    - Debounce hover events
    - _Requirements: All requirements (performance)_

  - [ ]* 16.4 Write performance tests
    - Test rendering performance with large datasets
    - Test memory usage
    - Test animation smoothness
    - _Requirements: All requirements (performance)_

- [ ] 17. Final checkpoint - Complete testing and validation
  - Ensure all tests pass, ask the user if questions arise.
  - Verify all 33 correctness properties are tested
  - Confirm 80%+ code coverage
  - Validate accessibility compliance

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The "MVP Graph Set" includes: Growth Curve, Comparison Bars, Risk Gauge, and Decision Trace
- All other visualizations can be added incrementally after MVP
