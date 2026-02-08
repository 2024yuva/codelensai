# Contributing to Code-Sight

First off, thank you for considering contributing to Code-Sight! It's people like you that make Code-Sight such a great tool.

## 🌟 Ways to Contribute

- 🐛 **Report bugs** and issues
- 💡 **Suggest new features** or enhancements
- 📝 **Improve documentation**
- 🧪 **Write tests** to increase coverage
- 🎨 **Enhance UI/UX**
- 🔧 **Fix bugs** and implement features
- 📊 **Add new visualizations**

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- A Google Gemini API key

### Setup Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/code-sight.git
   cd code-sight
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/code-sight.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   # Add your Gemini API key to .env.local
   ```

6. **Run the development server**:
   ```bash
   npm run dev
   ```

7. **Run tests**:
   ```bash
   npm test
   ```

## 📋 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `test/` - Test additions or modifications
- `refactor/` - Code refactoring
- `perf/` - Performance improvements

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed
- Write tests for new functionality

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### 4. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add complexity breakdown chart"
git commit -m "fix: resolve memory leak in growth curve"
git commit -m "docs: update installation instructions"
git commit -m "test: add property tests for risk score"
```

**Commit message format**:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template
5. Submit the pull request

## 🧪 Testing Guidelines

### Unit Tests

Write unit tests for:
- Individual functions and components
- Edge cases and error conditions
- UI interactions
- Integration points

Example:
```typescript
import { describe, it, expect } from 'vitest';
import { normalizeContributions } from './mockData';

describe('normalizeContributions', () => {
  it('should normalize contributions to sum to 100', () => {
    const blocks = [
      { contributionPercentage: 30, /* ... */ },
      { contributionPercentage: 70, /* ... */ }
    ];
    
    const normalized = normalizeContributions(blocks);
    const sum = normalized.reduce((acc, b) => acc + b.contributionPercentage, 0);
    
    expect(Math.abs(sum - 100)).toBeLessThan(0.01);
  });
});
```

### Property-Based Tests

Write property tests for:
- Universal properties that should hold for all inputs
- Invariants that must be maintained
- Round-trip properties (serialize/deserialize, etc.)

Example:
```typescript
import fc from 'fast-check';

// Feature: visual-intelligence-graphs, Property 1: Contribution Percentages Sum to 100
test('complexity block contributions sum to 100%', () => {
  fc.assert(
    fc.property(
      fc.array(complexityBlockArbitrary, { minLength: 1 }),
      (blocks) => {
        const normalized = normalizeContributions(blocks);
        const sum = normalized.reduce((acc, b) => acc + b.contributionPercentage, 0);
        return Math.abs(sum - 100) < 0.01;
      }
    ),
    { numRuns: 100 }
  );
});
```

## 📝 Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use meaningful variable and function names

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types

Example:
```typescript
interface MyComponentProps {
  data: ComplexityBlock[];
  onSelect: (id: string) => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ data, onSelect }) => {
  // Component implementation
};
```

### Formatting

We use Prettier for code formatting. The configuration is in `.prettierrc`.

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

## 📚 Documentation

### Code Comments

- Add JSDoc comments for public functions
- Explain complex algorithms
- Document assumptions and constraints

Example:
```typescript
/**
 * Normalizes contribution percentages to sum to exactly 100%
 * @param blocks - Array of complexity blocks with contribution percentages
 * @returns Normalized array where percentages sum to 100
 */
export function normalizeContributions(blocks: ComplexityBlock[]): ComplexityBlock[] {
  // Implementation
}
```

### README Updates

If your changes affect:
- Installation process
- Usage examples
- Features
- Configuration

Please update the README.md accordingly.

## 🐛 Bug Reports

### Before Submitting

1. Check if the bug has already been reported
2. Verify it's reproducible in the latest version
3. Collect relevant information

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.17.0]
- Code-Sight version: [e.g., 1.0.0]

**Additional context**
Any other relevant information.
```

## 💡 Feature Requests

### Before Submitting

1. Check if the feature has already been requested
2. Consider if it aligns with the project goals
3. Think about implementation complexity

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions or features you've considered.

**Additional context**
Any other relevant information, mockups, or examples.
```

## 🔍 Code Review Process

1. **Automated Checks**: All PRs must pass:
   - TypeScript compilation
   - All tests
   - Linting
   - Formatting checks

2. **Manual Review**: A maintainer will review:
   - Code quality
   - Test coverage
   - Documentation
   - Design decisions

3. **Feedback**: Address any requested changes

4. **Approval**: Once approved, a maintainer will merge

## 📜 Spec-Driven Development

For major features, we follow a spec-driven approach:

1. **Requirements**: Write EARS-compliant requirements
2. **Design**: Create design document with correctness properties
3. **Tasks**: Break down into implementation tasks
4. **Implementation**: Execute tasks incrementally
5. **Testing**: Validate against correctness properties

See `.kiro/specs/visual-intelligence-graphs/` for an example.

## 🎯 Priority Areas

We're especially interested in contributions for:

- 📊 **New Visualizations**: Additional chart types and insights
- 🧪 **Test Coverage**: More property-based tests
- 🎨 **UI/UX**: Improved user experience and accessibility
- 📝 **Documentation**: Tutorials, examples, and guides
- 🌐 **Internationalization**: Multi-language support
- ⚡ **Performance**: Optimization and caching

## 💬 Communication

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Pull Requests**: Code contributions
- **Email**: For sensitive issues

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make Code-Sight better for everyone. We appreciate your time and effort!

---

**Questions?** Feel free to ask in [GitHub Discussions](https://github.com/yourusername/code-sight/discussions) or open an issue.
