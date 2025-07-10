# Contributing to SoulScript 🌟

Thank you for your interest in contributing to SoulScript! This guide will help you get started with development and understand our contribution process.

## 🎯 Our Mission

SoulScript is dedicated to creating a safe, trauma-informed digital space for emotional healing and self-reflection. We welcome contributions that align with our mission of supporting mental health and personal growth.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- MongoDB Atlas account (for development)
- Mistral API key (or OpenAI API key)

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/SoulScript.git
   cd SolScript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   Create `.env.local`:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   MISTRAL_API_KEY=your-mistral-api-key
   OPENAI_API_KEY=your-openai-api-key (optional)
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Visit: http://localhost:3000

5. **Run tests**
   ```bash
   npm test
   ```

## 📋 Development Workflow

### 1. Issue Creation
Before starting work, please:
- Check existing issues to avoid duplicates
- Create a detailed issue describing the problem or feature
- Use appropriate labels (bug, enhancement, documentation, etc.)
- Include steps to reproduce for bugs

### 2. Branch Strategy
```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Create a bug fix branch
git checkout -b fix/your-bug-description

# Create a documentation branch
git checkout -b docs/your-doc-update
```

### 3. Development Process
1. **Plan your changes** - Document your approach
2. **Write tests first** - Follow TDD when possible
3. **Implement features** - Follow coding standards
4. **Test thoroughly** - Ensure all tests pass
5. **Update documentation** - Keep docs in sync

### 4. Commit Guidelines
We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Feature
git commit -m "feat: add voice input functionality"

# Bug fix
git commit -m "fix: resolve hydration mismatch in dashboard"

# Documentation
git commit -m "docs: update API documentation"

# Breaking change
git commit -m "feat!: change mood scale from 1-10 to 1-5

BREAKING CHANGE: Mood ratings now use 1-5 scale instead of 1-10"
```

### 5. Pull Request Process
1. **Push your branch** to your fork
2. **Create a PR** with detailed description
3. **Link related issues** using keywords
4. **Request reviews** from maintainers
5. **Address feedback** and make changes
6. **Merge when approved**

## 🎨 Coding Standards

### TypeScript
- **Strict mode**: Always use strict TypeScript
- **Type definitions**: Define interfaces for all data structures
- **No any types**: Use proper typing or `unknown`
- **Generic types**: Use generics for reusable components

```typescript
// Good
interface JournalEntry {
  id: string;
  entry: string;
  mood: number;
  createdAt: Date;
}

// Bad
const entry: any = { /* ... */ };
```

### React Components
- **Functional components**: Use hooks and functional components
- **Props interface**: Define props interface for each component
- **Default props**: Use default parameters instead of defaultProps
- **Component naming**: PascalCase for components

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false
}) => {
  // Component implementation
};
```

### File Organization
```
components/
├── ui/                    # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── index.ts          # Export all components
├── features/             # Feature-specific components
│   ├── Journal/
│   └── Dashboard/
└── layout/               # Layout components
    ├── Header.tsx
    └── Footer.tsx
```

### Naming Conventions
- **Files**: kebab-case for files, PascalCase for components
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Functions**: camelCase, descriptive names
- **CSS classes**: kebab-case

### Code Comments
- **JSDoc**: Use JSDoc for functions and components
- **Inline comments**: Explain complex logic
- **TODO comments**: Mark future improvements

```typescript
/**
 * Saves a journal entry with AI-generated reflection
 * @param entry - The journal entry text
 * @param mood - Mood rating from 1-5
 * @returns Promise resolving to the saved entry with AI reflection
 */
export const saveJournalEntry = async (
  entry: string,
  mood: number
): Promise<JournalEntry> => {
  // Implementation
};
```

## 🧪 Testing Guidelines

### Test Structure
```typescript
// Component test
describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// API test
describe('Journal API', () => {
  it('saves journal entry successfully', async () => {
    const entry = { text: 'Test entry', mood: 4 };
    const response = await saveJournalEntry(entry);
    
    expect(response.id).toBeDefined();
    expect(response.aiReflection).toBeDefined();
  });
});
```

### Testing Requirements
- **Unit tests**: 80%+ coverage for new features
- **Integration tests**: Test API endpoints and data flow
- **E2E tests**: Critical user journeys
- **Accessibility tests**: Ensure WCAG compliance

### Running Tests
```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 🔒 Security Guidelines

### Data Protection
- **Never log sensitive data**: User entries, API keys, etc.
- **Validate all inputs**: Sanitize user input
- **Use environment variables**: Never commit secrets
- **Encrypt sensitive data**: Use proper encryption

### Privacy Considerations
- **Data minimization**: Only collect necessary data
- **User consent**: Respect user privacy preferences
- **Right to deletion**: Support data removal requests
- **Crisis safety**: Handle sensitive content appropriately

## 📚 Documentation Standards

### Code Documentation
- **README updates**: Update README for new features
- **API documentation**: Document new endpoints
- **Component documentation**: Document props and usage
- **Architecture updates**: Update architecture docs

### Documentation Structure
```
docs/
├── API.md              # API documentation
├── ARCHITECTURE.md     # System architecture
├── DEVELOPMENT.md      # Development guide
├── FEATURES.md         # Feature documentation
└── NOTION_INTEGRATION.md # Notion setup guide
```

## 🎯 Feature Development

### New Feature Process
1. **Proposal**: Create detailed feature proposal
2. **Design**: Create UI/UX mockups
3. **Implementation**: Follow development workflow
4. **Testing**: Comprehensive testing
5. **Documentation**: Update all relevant docs
6. **Review**: Code and design review
7. **Deployment**: Staged rollout

### Feature Requirements
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile responsive**: Works on all devices
- **Performance**: Meets Core Web Vitals
- **Security**: Follows security guidelines
- **Testing**: Comprehensive test coverage

## 🐛 Bug Reports

### Bug Report Template
```markdown
**Bug Description**
Clear description of the issue

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., macOS 14]
- Browser: [e.g., Chrome 120]
- Device: [e.g., Desktop, Mobile]

**Additional Context**
Screenshots, logs, etc.
```

## 🚀 Performance Guidelines

### Frontend Performance
- **Bundle size**: Keep bundles under 250KB
- **Loading time**: < 3 seconds initial load
- **Core Web Vitals**: Meet Google's standards
- **Lazy loading**: Load components on demand

### Backend Performance
- **Response time**: < 200ms for API calls
- **Database queries**: Optimized and indexed
- **Caching**: Implement appropriate caching
- **Rate limiting**: Prevent abuse

## 🎨 Design Guidelines

### UI/UX Principles
- **Trauma-informed**: Safe, non-triggering design
- **Accessible**: WCAG 2.1 AA compliant
- **Consistent**: Follow design system
- **Intuitive**: Easy to use and understand

### Design System
- **Colors**: Purple/pink gradient theme
- **Typography**: Accessible, readable fonts
- **Spacing**: Consistent spacing system
- **Components**: Reusable component library

## 📊 Code Review Process

### Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met

### Review Guidelines
- **Be constructive**: Provide helpful feedback
- **Be specific**: Point to exact issues
- **Be respectful**: Maintain positive tone
- **Be thorough**: Check all aspects

## 🏆 Recognition

### Contributor Levels
- **First-time contributor**: Special recognition
- **Regular contributor**: Maintainer consideration
- **Core contributor**: Project leadership role

### Recognition Methods
- **Contributor hall of fame**: Listed in README
- **Special mentions**: In release notes
- **Community spotlight**: Featured in updates

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Email**: support@soulscript.app
- **Discord**: Community server (coming soon)

### Resources
- **Documentation**: [docs/](./docs/)
- **API Reference**: [docs/API.md](./docs/API.md)
- **Architecture**: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- **Development Guide**: [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)

## 🎉 Thank You!

Your contributions help make SoulScript a better platform for mental health and healing. Every contribution, no matter how small, makes a difference in someone's journey to emotional wellness.

---

**Together, we're building a safer, more compassionate digital space for healing and growth.** 💜 