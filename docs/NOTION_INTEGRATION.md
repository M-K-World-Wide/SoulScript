# SoulScript – Notion Integration Documentation

## 📋 Project Overview

### 🎯 Purpose
SoulScript is a trauma-informed AI-driven therapy journal platform designed for emotional healing, self-awareness, and transformation. The platform provides safe, guided journaling experiences with AI-powered reflections and therapeutic prompts.

### 🏗️ Architecture
- **Frontend**: Next.js 15.3.5 with TypeScript
- **Backend**: Next.js API routes (Node.js/Express style)
- **Database**: MongoDB with Mongoose ODM
- **AI**: Mistral API (configurable to OpenAI GPT-4 Turbo)
- **UI**: TailwindCSS + Custom Components
- **Animations**: Framer Motion
- **Charts**: Chart.js with react-chartjs-2
- **PDF Export**: jsPDF

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Mistral API key (or OpenAI API key)

### Installation
```bash
git clone https://github.com/M-K-World-Wide/SoulScript
cd SolScript
npm install
```

### Environment Setup
Create `.env.local`:
```env
MONGODB_URI=your-mongodb-connection-string
MISTRAL_API_KEY=your-mistral-api-key
OPENAI_API_KEY=your-openai-api-key (optional)
```

### Development
```bash
npm run dev
# Visit http://localhost:3000
```

---

## 📁 Project Structure

```
SolScript/
├── components/ui/          # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── label.tsx
│   ├── slider.tsx
│   └── textarea.tsx
├── lib/                    # Utility libraries
│   └── mongodb.ts         # Database connection
├── models/                 # MongoDB schemas
│   └── JournalEntry.ts
├── pages/                  # Next.js pages & API routes
│   ├── api/
│   │   ├── dashboard.ts
│   │   ├── journal.ts
│   │   └── prompt.ts
│   ├── dashboard.tsx
│   └── journal.tsx
├── utils/                  # Utility functions
│   └── ai.ts              # AI integration
└── docs/                   # Documentation
```

---

## 🔧 Core Features

### 1. Journal Interface
- **Daily AI Prompts**: Trauma-informed journaling prompts
- **Mood Tracking**: 1-5 scale slider with emoji mapping
- **Voice Input**: Speech-to-text for journal entries
- **Voice Output**: Text-to-speech for prompts and reflections
- **AI Reflection**: Trauma-informed summaries and follow-up questions
- **Safety Features**: Crisis keyword detection and panic button

### 2. Analytics Dashboard
- **Mood Analytics**: Line chart visualization
- **Theme Clustering**: AI-powered topic detection (planned)
- **PDF Export**: Downloadable insights report

### 3. Safety & Accessibility
- **Panic Button**: Grounding techniques and crisis resources
- **Keyword Flagging**: Automatic detection of crisis language
- **SSR/CSR Safe**: Hydration mismatch prevention
- **Voice Accessibility**: Full speech input/output support

---

## 🔌 API Documentation

### Authentication
Currently supports anonymous mode. OAuth2 integration planned.

### Endpoints

#### POST `/api/journal`
Save journal entry with AI reflection.

**Request:**
```json
{
  "entry": "string (required)",
  "mood": "number (1-5, required)"
}
```

**Response:**
```json
{
  "id": "string",
  "aiReflection": "string",
  "followUpQuestion": "string"
}
```

#### GET `/api/prompt`
Get daily AI-generated prompt.

**Response:**
```json
{
  "prompt": "string"
}
```

#### GET `/api/dashboard`
Get analytics data.

**Response:**
```json
{
  "moodData": [1, 3, 4, 2, 5],
  "themes": ["anxiety", "gratitude", "relationships"]
}
```

---

## 🗄️ Database Schema

### JournalEntry Collection
```typescript
{
  _id: ObjectId,
  userId: string | null,        // User or session ID
  date: Date,                   // Entry timestamp
  entry: string,                // Journal text
  mood: string,                 // Mood (emoji/label)
  aiReflection: string,         // AI-generated summary
  followUpQuestion: string,     // AI-generated question
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId` (for user-specific queries)
- `date` (for chronological sorting)

---

## 🤖 AI Integration

### Mistral API Configuration
```typescript
// utils/ai.ts
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_BASE_URL = 'https://api.mistral.ai/v1/chat/completions';

// Model: mistral-small (configurable to mistral-medium, mistral-large)
```

### Prompt Engineering
- **Daily Prompts**: Trauma-informed, gentle, healing-focused
- **Reflections**: Compassionate summaries with follow-up questions
- **Safety**: Crisis-aware responses with resource suggestions

### Fallback Strategy
- OpenAI GPT-4 Turbo as backup
- Graceful degradation for API failures
- Default prompts when AI unavailable

---

## 🎨 UI/UX Design

### Design System
- **Colors**: Purple/pink gradient theme
- **Typography**: Accessible, readable fonts
- **Animations**: Smooth transitions with Framer Motion
- **Responsive**: Mobile-first design

### Accessibility Features
- **Voice Input/Output**: Full speech support
- **Keyboard Navigation**: Complete keyboard accessibility
- **Screen Reader**: ARIA labels and semantic HTML
- **High Contrast**: Readable color combinations

---

## 🔒 Security & Privacy

### Data Protection
- **Encryption**: MongoDB connection encryption
- **Input Validation**: Server-side validation
- **XSS Prevention**: Sanitized user input
- **No Sensitive Logs**: API keys and user data protected

### Privacy Features
- **Anonymous Mode**: No registration required
- **Local Storage**: Minimal client-side data
- **Data Retention**: Configurable retention policies
- **GDPR Compliance**: User data control

---

## 🚀 Deployment

### Web Deployment (Vercel/Netlify)
```bash
npm run build
npm run start
```

### Environment Variables
- `MONGODB_URI`: Production database
- `MISTRAL_API_KEY`: Production AI key
- `NODE_ENV`: Production environment

### Performance Optimization
- **SSR/CSR**: Optimized for both
- **Code Splitting**: Dynamic imports for heavy libraries
- **Caching**: API response caching
- **CDN**: Static asset optimization

---

## 📱 Cross-Platform Deployment

### Progressive Web App (PWA)
- **Service Worker**: Offline functionality
- **Manifest**: App-like experience
- **Push Notifications**: Daily prompts (planned)

### Desktop Apps
- **Electron**: Windows, macOS, Linux
- **Tauri**: Lightweight alternative
- **Auto-updates**: Seamless updates

### Mobile Apps
- **React Native**: Native mobile experience
- **Capacitor**: Web-to-mobile conversion
- **App Store**: iOS/Android distribution

---

## 🧪 Testing Strategy

### Unit Tests
- **Jest**: Component testing
- **React Testing Library**: User interaction testing
- **API Testing**: Endpoint validation

### Integration Tests
- **Cypress**: E2E testing
- **API Integration**: Database and AI testing
- **Cross-browser**: Browser compatibility

### Accessibility Testing
- **axe-core**: Automated accessibility checks
- **Manual Testing**: Screen reader testing
- **WCAG Compliance**: Standards adherence

---

## 📈 Analytics & Monitoring

### User Analytics
- **Mood Trends**: Emotional pattern analysis
- **Usage Patterns**: Feature adoption tracking
- **Performance Metrics**: Load times and errors

### Technical Monitoring
- **Error Tracking**: Sentry integration
- **Performance**: Core Web Vitals
- **Uptime**: Service availability

---

## 🔄 Development Workflow

### Git Workflow
1. **Feature Branches**: `feature/voice-input`
2. **Pull Requests**: Code review required
3. **Merge Strategy**: Squash and merge
4. **Release Tags**: Semantic versioning

### Code Quality
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Husky**: Pre-commit hooks

### CI/CD Pipeline
1. **Build**: TypeScript compilation
2. **Test**: Unit and integration tests
3. **Deploy**: Automatic deployment
4. **Monitor**: Post-deployment checks

---

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core journaling functionality
- ✅ AI integration
- ✅ Basic analytics
- ✅ Voice features

### Phase 2 (Next)
- 🔄 Advanced analytics dashboard
- 🔄 Theme clustering
- 🔄 Export features
- 🔄 User authentication

### Phase 3 (Future)
- 📋 Mobile apps
- 📋 Therapist integration
- 📋 Group features
- 📋 Advanced AI personas

---

## 📞 Support & Resources

### Documentation
- **API Docs**: `/docs/API.md`
- **Features**: `/docs/FEATURES.md`
- **Architecture**: `/docs/ARCHITECTURE.md`

### Community
- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Community support
- **Contributing**: Development guidelines

### Emergency Resources
- **Crisis Hotlines**: Integrated into panic button
- **Mental Health Resources**: Curated resource list
- **Professional Help**: Therapist directory (planned)

---

## 🔗 Integration Examples

### Embedding in Other Apps
```javascript
// Widget integration
const soulscriptWidget = {
  apiKey: 'your-api-key',
  userId: 'user-123',
  onEntrySaved: (entry) => console.log('Entry saved:', entry)
};
```

### API Integration
```javascript
// External app integration
const response = await fetch('/api/journal', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ entry: 'Today I felt...', mood: 4 })
});
```

---

*This documentation is maintained in sync with the codebase. Last updated: 2024-06-09* 