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
   git clone https://github.com/YOUR_USERNAME/codelensai.git
   cd codelensai
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/2024yuva/codelensai.git
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

## 🙏 Thank You!

Your contributions make Code-Sight better for everyone. We appreciate your time and effort!

---

**Questions?** Feel free to ask in [GitHub Discussions](https://github.com/2024yuva/codelensai/discussions) or open an issue.
