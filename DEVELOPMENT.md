# Development Guide for SoulScript

Welcome to the SoulScript development environment setup guide! This document will help you get started with contributing to the project.

## Prerequisites

- **Node.js 18+** - [Download and install](https://nodejs.org/)
- **npm 9+** (comes with Node.js 18+)
- **MongoDB** - [Installation guide](https://docs.mongodb.com/manual/installation/)
- **Git** - [Installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Getting Started

1. **Fork and Clone the Repository**
   ```bash
   # Fork the repository on GitHub
   # Then clone your fork
   git clone https://github.com/YOUR_USERNAME/SoulScript.git
   cd SoulScript
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Required
   MONGODB_URI=mongodb://localhost:27017/soulscript-dev
   
   # Optional (with defaults)
   NODE_ENV=development
   PORT=3000
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## Development Workflow

### Code Style

We use:
- **ESLint** for code quality
- **Prettier** for code formatting
- **TypeScript** for type safety

Before committing, run:
```bash
npm run lint
npm run format
```

### Git Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number-description
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. Push your changes to your fork:
   ```bash
   git push origin your-branch-name
   ```

4. Open a Pull Request (PR) to the `main` branch of the main repository.

### Testing

To run tests:
```bash
npm test
```

### Building for Production

```bash
npm run build
npm start
```

## Code Organization

- `/components` - Reusable React components
- `/pages` - Next.js pages and API routes
- `/styles` - Global styles and themes
- `/utils` - Utility functions and helpers
- `/lib` - Shared libraries and configurations
- `/public` - Static assets

## Debugging

### VS Code

We provide a `.vscode/launch.json` configuration for debugging:
1. Open the project in VS Code
2. Go to the Run and Debug view (Ctrl+Shift+D or Cmd+Shift+D)
3. Select "Debug Next.js" and press F5

### Browser DevTools

- Use React DevTools for component inspection
- Use Redux DevTools for state management (if applicable)

## Common Issues

### Database Connection Issues
- Ensure MongoDB is running locally
- Verify your `MONGODB_URI` in `.env.local`
- Check for any error messages in the console

### Dependency Issues
If you encounter dependency issues:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Read our [Code of Conduct](CODE_OF_CONDUCT.md)
2. Check the [issues](https://github.com/MKWorldWide/SoulScript/issues) for open tasks
3. Fork the repository and create your feature branch
4. Commit your changes with a descriptive commit message
5. Push to the branch and open a Pull Request

## Need Help?

If you're stuck or have questions:
- Check the [GitHub Discussions](https://github.com/MKWorldWide/SoulScript/discussions)
- Open an [issue](https://github.com/MKWorldWide/SoulScript/issues)
- Join our [Discord/Slack community] (if applicable)
