# SoulScript 🌟

> **AI-Driven Trauma-Informed Therapy Journal Platform**

SoulScript is a revolutionary digital journaling platform that combines AI-powered insights with trauma-informed therapeutic practices to support emotional healing, self-awareness, and personal transformation.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.2-green)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-purple)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 🎯 Mission

SoulScript empowers individuals on their healing journey by providing a safe, intelligent, and compassionate digital space for self-reflection. Our platform uses advanced AI to offer personalized therapeutic insights while maintaining the highest standards of privacy and emotional safety.

## ✨ Features

### 🧠 Core Journaling
- **AI-Generated Prompts**: Daily trauma-informed journaling prompts
- **Mood Tracking**: Visual mood slider with emotional mapping
- **Voice Input/Output**: Speech-to-text and text-to-speech capabilities
- **AI Reflections**: Compassionate summaries and follow-up questions
- **Free-Form Writing**: Unstructured journaling space

### 📊 Analytics & Insights
- **Mood Analytics**: Visual trend analysis and patterns
- **Theme Clustering**: AI-powered topic detection and analysis
- **Weekly Insights**: Comprehensive emotional health reports
- **PDF Export**: Downloadable insights and progress reports

### 🛡️ Safety & Accessibility
- **Panic Button**: Immediate grounding techniques and crisis resources
- **Crisis Detection**: Automatic flagging of concerning content
- **Voice Accessibility**: Full speech input/output support
- **Trauma-Informed Design**: Safe, non-triggering interface

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on all devices
- **Dark/Light Mode**: Comfortable viewing options
- **Smooth Animations**: Framer Motion powered interactions
- **Intuitive Interface**: Clean, calming design

## 🏗️ Architecture

```
SoulScript/
├── Frontend (Next.js 15.3.5)
│   ├── React 19.1.0 + TypeScript
│   ├── TailwindCSS + Framer Motion
│   └── Chart.js + jsPDF
├── Backend (Next.js API Routes)
│   ├── Node.js/Express style
│   ├── MongoDB with Mongoose
│   └── AI Integration (Mistral/OpenAI)
└── Infrastructure
    ├── MongoDB Atlas
    ├── Vercel/Netlify Deployment
    └── Notion Integration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Mistral API key (or OpenAI API key)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/M-K-World-Wide/SoulScript.git
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

## 📚 Documentation

- **[API Documentation](./docs/API.md)** - Complete API reference
- **[Architecture Guide](./docs/ARCHITECTURE.md)** - System design and patterns
- **[Development Guide](./docs/DEVELOPMENT.md)** - Setup and contribution guidelines
- **[Feature Documentation](./docs/FEATURES.md)** - Detailed feature specifications
- **[Notion Integration](./docs/NOTION_INTEGRATION.md)** - Project management setup

## 🔧 API Endpoints

### Core Endpoints
- `POST /api/journal` - Save journal entry with AI reflection
- `GET /api/prompt` - Get daily AI-generated prompt
- `GET /api/dashboard` - Get analytics data

### Notion Integration
- `POST /api/notion-setup` - Initialize Notion workspace
- `GET /notion-setup` - Setup interface

### Example Usage
```javascript
// Save a journal entry
const response = await fetch('/api/journal', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    entry: "Today I felt grateful for...",
    mood: 4
  })
});

const data = await response.json();
console.log(data.aiReflection);
```

## 🎨 UI Components

SoulScript includes a comprehensive component library:

- **Button** - Accessible, animated buttons
- **Card** - Content containers with shadows
- **Slider** - Mood tracking slider
- **Textarea** - Journal entry input
- **Label** - Form labels and accessibility

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Run linting
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Manual Deployment
```bash
npm run build
npm run start
```

### Environment Variables
- `MONGODB_URI` - Production database connection
- `MISTRAL_API_KEY` - Production AI API key
- `NODE_ENV` - Production environment

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- TypeScript for type safety
- ESLint + Prettier for code formatting
- Conventional commits for commit messages
- Comprehensive testing for all features

## 📊 Project Status

### ✅ Completed
- Core journaling functionality
- AI integration (Mistral/OpenAI)
- Voice input/output features
- Basic analytics dashboard
- Safety features (panic button, crisis detection)
- Notion integration for project management

### 🔄 In Progress
- Advanced analytics and theme clustering
- Mobile app development
- Enhanced AI personas
- Therapist integration features

### 📋 Planned
- Group therapy features
- Advanced export options
- Integration with therapy platforms
- Multi-language support

## 🛡️ Privacy & Security

- **Data Encryption**: All data encrypted in transit and at rest
- **Privacy-First**: No data sharing with third parties
- **GDPR Compliant**: Full user data control
- **Crisis Support**: Integrated safety features and resources

## 🆘 Crisis Resources

If you're experiencing a mental health crisis:
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: 911

SoulScript includes built-in crisis detection and immediate access to these resources.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Mistral AI** for providing advanced language models
- **MongoDB** for reliable data storage
- **Next.js** for the excellent framework
- **TailwindCSS** for beautiful styling
- **Therapy community** for guidance and feedback

## 📞 Support

- **Documentation**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/M-K-World-Wide/SoulScript/issues)
- **Discussions**: [GitHub Discussions](https://github.com/M-K-World-Wide/SoulScript/discussions)
- **Email**: support@soulscript.app

---

**Made with ❤️ for mental health and healing**

*SoulScript - Your AI companion on the journey to emotional wellness* 